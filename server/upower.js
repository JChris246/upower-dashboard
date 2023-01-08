import { execaCommandSync } from "execa";
import setup from "./logger/index.js";

const UPOWER_PATH = "/org/freedesktop/UPower/devices/";

/**
 * Based on the device's model and name estimate what category this device falls into and return an icon
 * @param {string} model
 * @param {string} name
 * @returns {string} the name of the icon that will be used to display on the frontend
 */
const determineIcon = (model, name) => {
    // TODO: expand these matches
    name = name.toLowerCase();
    if (name === "ups") {
        return "ups_battery";
    }
    if (name === "gaming-input") {
        return "game_controller";
    }
    if (model.match(/keyboard/i)) {
        return "keyboard";
    }
    if (model.match(/mouse/i)) {
        return "mouse";
    }
};

/**
 * Get a list of the devices detected by upower (upower -e)
 * @returns {string} the full upower device path
 */
const getDevices = () => {
    const { logger } = setup();
    try {
        const result = execaCommandSync("upower -e");
        return String(result.stdout)
            .split("\n")
            .map(line => line.replace(UPOWER_PATH, ""));
    } catch (e) {
        if (e.code === "ERR_INVALID_ARG_TYPE") {
            logger.error("Is upower available?");
        } else
            logger.error(e);
    }
};

/**
 * Get info upower info on a device by its upower device path
 * @param {string} deviceName
 * @returns {object} a map of the details found by parsing upower's output "upower -i device"
 */
const getDeviceInfo = (deviceName) => {
    const { logger } = setup();
    try {
        const result = execaCommandSync("upower -i " + UPOWER_PATH + deviceName);
        return String(result.stdout)
            .split("\n")
            .filter(line => line.match(/^\s*[^:]+:\s*.+\s*|^\s*[^\s]+?\s*$/))
            .map(line => {
                line = line.trim();
                if (line.match(/^[^\s]+$/))
                    return { key: "name", val: line };

                let [, key, val] = line.match(/^([^:]+):\s*(.+)$/);

                key = key.replace(/[\s-]/g, "_");
                if (key === "icon_name") // remove the surrounding quotes from icon name
                    val = val.replace(/'([^']+)'/, "$1");
                if (key === "percentage")
                    val = parseInt(val.match(/(\d+)/)[1], 10);
                if (val === "no")
                    val = false;
                if (val === "yes")
                    val = true;

                return { key, val };
            })
            .reduce((a, b) => {
                a[b.key] = b.val;
                return a;
            }, {});
    } catch (e) {
        if (e.code === "ERR_INVALID_ARG_TYPE") {
            logger.error("Is upower available?");
        } else
            logger.error(e);
    }
};

export { getDevices, getDeviceInfo, determineIcon };