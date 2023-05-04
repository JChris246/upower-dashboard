import express from "express";
const router = express.Router();
import DeviceController from "../controllers/DeviceController.js";

router
    .get("/", DeviceController.getDevices)
    .get("/:id", DeviceController.getDeviceInfo)
    .get("/:id/stats", DeviceController.getDeviceHistory);

export default router;