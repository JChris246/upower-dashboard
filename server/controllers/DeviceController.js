import { determineIcon, getDeviceInfo, getDevices } from "../upower.js";
import setup from "../logger/index.js";

let logger = null;

const init = () => {
    const { logger: l } = setup();
    logger = l;
};

const DeviceController = {
    getDevices: (_, res) => {
        const list = getDevices()
            .map(device => {
                const info = getDeviceInfo(device);
                if (info.model && info.name)
                    return {
                        serial: info.serial,
                        name: info.name, // TODO: maybe allow user to alias this in the future
                        deviceIcon: determineIcon(info.model, info.name),
                        percentage: info.percentage,
                        model: info.model,
                    };
            })
            .filter(device => device && device.serial); // filter out devices that don't have a serial id
        return res.status(200).send(list);
    },
    getDeviceInfo: (req, res) => {
        init();
        const { id } = req.params;

        if (!id || id.length < 1) { // do I have to handle this ?
            logger.warn("Request was made to get device info without the id");
            return res.status(400).send({ msg: "Invalid device id" });
        }

        const devices = getDevices()
            .map(device => {
                const info = getDeviceInfo(device);
                return { ...info, deviceIcon: determineIcon(info.model, info.name) };
            })
            .filter(device => device.serial === id);

        if (devices.length > 0)
            return res.status(200).send(devices[0]);
        else {
            // TODO: when sockets are introduced rmr to handle if a device is removed from the system
            logger.warn("Could not find device with serial: " + id);
            return res.status(404).send({ msg: "Could not find device with serial: " + id });
        }
    }
};

export default DeviceController;
