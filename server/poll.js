import setup from "./logger/index.js";
import { getDeviceInfo, getDevices } from "./upower.js";
import fs from "fs";

const MONITOR_INTERVAL = 1000 * 60;
const DB_FILE = "power_log.json";


const loadPowerLogFile = () => {
    const { logger } = setup();
    try {
        if (!fs.existsSync(global.LOG_DB + "/" + DB_FILE)) {
            return {};
        }
        const data = fs.readFileSync(global.LOG_DB + "/" + DB_FILE, "utf8");
        return JSON.parse(data);
    } catch (e) {
        logger.error("There was a problem loading the power log file: " + e);
        throw e;
    }
};

const savePowerLog = (powerLog) => {
    const { logger } = setup();
    try {
        fs.writeFileSync(global.LOG_DB + "/" + DB_FILE, JSON.stringify(powerLog));
    } catch (e) {
        logger.error("There was a problem saving the power log file: " + e);
        throw e;
    }
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


// TODO: archive the database after a certain time period (and create new file), maybe a week
const poll = async () => {
    if (!fs.existsSync(global.LOG_DB)) {
        fs.mkdirSync(global.LOG_DB);
    }

    const { logger } = setup();
    const powerLog = loadPowerLogFile();

    // eslint-disable-next-line no-constant-condition
    while (true) {
        logger.info("Polling devices");
        getDevices().forEach(device => {
            const info = getDeviceInfo(device);
            if (info.model && info.name) {
                // load the device from the db and determine if we need to log an update
                if (powerLog[info.serial]) {
                    const lastEntry = powerLog[info.serial][powerLog[info.serial].length - 1];
                    // if the current state and percentage is the same as was last logged, no need to log again
                    if (lastEntry.percentage === info.percentage && lastEntry.state === info.state) {
                        return;
                    }

                    powerLog[info.serial].push({
                        percentage: info.percentage,
                        state: info.state,
                        timestamp: new Date().getTime()
                    });
                } else {
                    logger.debug("Creating an entry in the database for " + info.serial);
                    powerLog[info.serial] = [];
                    powerLog[info.serial].push({
                        percentage: info.percentage,
                        state: info.state,
                        timestamp: new Date().getTime()
                    });
                }
            }
        });

        logger.debug("Saving power log");
        savePowerLog(powerLog);
        await sleep(MONITOR_INTERVAL);
    }
};

export { poll, loadPowerLogFile };