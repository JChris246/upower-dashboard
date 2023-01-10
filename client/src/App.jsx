import { useState, useEffect } from "react"
import "./App.css"

import { request } from "./hooks/Fetch";

import DeviceList from "./components/DeviceList";
import DeviceDetails from "./components/DeviceDetails";

function App() {
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);

    useEffect(() => {
        request({ url: "/api/device/", callback: ({ msg, success, json }) => {
            if (success) {
                setDevices(json);
            } else {
                alert("An error occurred fetching devices: " + msg);
            }
        }});
    }, []);

    useEffect(() => {
        if (selectedDeviceId) {
            request({ url: "/api/device/" + selectedDeviceId, callback: ({ msg, success, json }) => {
                if (success) {
                    setSelectedDevice(json);
                } else {
                    alert("An error occurred fetching device details: " + msg);
                }
            }});
        }
    }, [selectedDeviceId]);

    const hideDetails = () => setSelectedDevice(null);

    return (
        <div className="lg:p-4 bg-slate-200 h-screen flex">
            <DeviceList devices={devices} selectDevice={setSelectedDeviceId}/>
            { selectedDevice && <DeviceDetails device={selectedDevice} goBack={hideDetails} /> }
        </div>
    )
}

export default App

// TODO: integrate these subtly into the page
// <a target="_blank" href="https://icons8.com/icon/7314/game-controller">Game Controller</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
// <a target="_blank" href="https://icons8.com/icon/519/keyboard">Keyboard</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
// <a target="_blank" href="https://icons8.com/icon/1740/car-battery">Car Battery</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
// <a target="_blank" href="https://icons8.com/icon/F6dRlNXul9Gt/mouse">Mouse</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
// <a target="_blank" href="https://icons8.com/icon/98973/question-mark">Question Mark</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>7
// <a target="_blank" href="https://icons8.com/icon/101764/quick-mode-on">Quick Mode On</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>