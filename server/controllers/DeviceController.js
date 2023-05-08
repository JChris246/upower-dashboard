import { determineIcon, getDeviceInfo, getDevices } from "../upower.js";
import setup from "../logger/index.js";
import { loadPowerLogFile } from "../poll.js";

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
    },
    getDeviceHistory: (req, res) => {
        init();
        const { id } = req.params;

        if (!id || id.length < 1) { // do I have to handle this ?
            logger.warn("Request was made to get device history without the id");
            return res.status(400).send({ msg: "Invalid device id" });
        }

        const devicePowerLog = loadPowerLogFile()[id];
        if (!devicePowerLog) {
            logger.warn("There are no records in the database for a device with id: " + id);
            return res.status(404).send({ msg: "No database entries for device with id: " + id });
        }

        // group the entries from the last 12 hours for use in a graph on FE
        const now = new Date();
        const dataSpan = 1000 * 60 * 60 * 12; // the amount of hours of history to show on graph, current 12 hours
        const fifteenMinutes = 1000 * 60 * 15;
        const maxMinuteRange = 12 * 60; // the amount of mins in 12 hrs
        const startTime = (now.getTime()) - dataSpan;
        const startIndex = getFirstEntryIndexInRange(devicePowerLog, startTime);

        let expandedData = [];
        if (devicePowerLog[startIndex]) {
            expandedData.push(devicePowerLog[startIndex].percentage);
        }

        for (let i = startIndex + 1; i < devicePowerLog.length; i++) {
            // fill in the data between the recorded entries
            const diffMinutes = Math.floor((devicePowerLog[i].timestamp - devicePowerLog[i-1].timestamp) / 1000 / 60);
            for (let j = 0; j < diffMinutes; j++) {
                expandedData.push(devicePowerLog[i-1].percentage);
            }
        }

        // fill in data up to current time
        const diffMinutes = Math.floor((now.getTime() - devicePowerLog[devicePowerLog.length - 1].timestamp) / 1000 / 60);
        for (let j = 0; j < diffMinutes; j++) {
            expandedData.push(devicePowerLog[devicePowerLog.length - 1].percentage);
        }
        expandedData = expandedData.slice(expandedData.length - maxMinuteRange, expandedData.length);

        // group minutes into 15 min intervals
        let grouped = [];
        for (let i = 0; i < expandedData.length; i += 15) {
            let sum = 0;
            let count = 0;
            for (let j = i; j < i + 15 && j < expandedData.length; j++, count++) {
                sum += expandedData[j];
            }
            if (count === 0) {
                logger.error("Count was unexpectedly 0");
            } else {
                grouped.push(Math.floor(sum / count));
            }
        }

        // generate labels
        let labels = [];
        if (devicePowerLog?.length > 0) {
            let currentTimestamp = new Date(devicePowerLog[startIndex].timestamp);
            while (currentTimestamp.getTime() < now.getTime()) {
                labels.push(pad(currentTimestamp.getHours(), 2) + ":" + pad(currentTimestamp.getMinutes(), 2));
                currentTimestamp = new Date(currentTimestamp.getTime() + fifteenMinutes);
            }
            // ensure the number of labels are equal to the grouped data
            labels = labels.slice(-grouped.length);
        }

        return res.status(200).send({ data: { percentage: grouped, label: labels } });
    }
};

const getFirstEntryIndexInRange = (devicePowerLog, startTime) => {
    for (let i = devicePowerLog.length - 1; i > -1; i--) {
        if (devicePowerLog[i].timestamp < startTime) {
            return i;
            // return i + 1 === devicePowerLog.length ? i : i + 1;
        }
    }
    return 0;
};

const pad = (v, min) => {
    v = v + ""; // convert to string
    while (v.length < min) {
        v = "0" + v;
    }
    return v;
};

export default DeviceController;
