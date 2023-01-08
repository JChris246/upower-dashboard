import { determineIcon, getDeviceInfo, getDevices } from "../upower.js";

const DeviceController = {
    getDevices: (_, res) => {
        const list = getDevices()
            .map(device => {
                const info = getDeviceInfo(device);
                return {
                    id: info.serial,
                    name: info.name, // TODO: maybe allow user to alias this in the future
                    deviceIcon: determineIcon(info.model, info.name)
                };
            })
            .filter(device => device.id); // filter out devices that don't have a serial id
        return res.status(200).send(list);
    }
};

export default DeviceController;
