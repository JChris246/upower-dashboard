import { useState, useEffect } from "react"
import "./App.css"

import { request } from "./hooks/Fetch";

import Header from "./components/Header";
import DeviceList from "./components/DeviceList";
import DeviceDetails from "./components/DeviceDetails";
import Footer from "./components/Footer";
import StatsOverview from "./components/StatsOverview";
import { LoadingSpinner, ErrorMessage } from "./components/UIStates";

function App() {
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDevices = async () => {
        setLoading(true);
        setError(null);

        request({ url: "/api/device/", callback: ({ msg, success, json }) => {
            if (success) {
                setDevices(json);
                setError(null);
            } else {
                setError("Failed to fetch devices: " + msg);
                setDevices([]);
            }
            setLoading(false);
            }
        });
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    useEffect(() => {
        if (selectedDeviceId) {
            request({ url: "/api/device/" + selectedDeviceId, callback: ({ msg, success, json }) => {
                if (success) {
                    setSelectedDevice(json);
                } else {
                    setError("Failed to fetch device details: " + msg);
                }
            }});
        }
    }, [selectedDeviceId]);

    const hideDetails = () => {
        setSelectedDevice(null);
        setSelectedDeviceId(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col">
                <Header deviceCount={0} onRefresh={fetchDevices} />
                <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <LoadingSpinner text="Loading devices..." />
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col">
                <Header deviceCount={0} onRefresh={fetchDevices} />
                <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <ErrorMessage message={error} onRetry={fetchDevices} />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 transition-colors duration-200 flex flex-col">
            <Header deviceCount={devices.length} onRefresh={fetchDevices} />
            <div className="flex-1 w-full lg:w-3/4 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <StatsOverview devices={devices} />

                <div className="flex flex-col gap-8 h-full">
                    <DeviceList devices={devices} selectDevice={setSelectedDeviceId} selectedDeviceId={selectedDeviceId}/>
                    {selectedDevice ? (
                        <DeviceDetails device={selectedDevice} goBack={hideDetails}/>
                    ) : (
                        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 h-full flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Select a Device</h3>
                                <p className="text-gray-400 mb-4">Choose a device from the list to view its details and battery status.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
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