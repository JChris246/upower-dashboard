import CirclePercentage from "./circle_percentage";
import { EmptyState } from "./UIStates";

const DeviceList = ({ devices, selectDevice, selectedDeviceId }) => {
    if (devices?.length < 1) {
        return (
            <EmptyState title="No Devices Found" description="No UPower devices are currently available."
                icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                }
            />
        );
    }

    const getStatusBadge = (percentage, state) => {
        if (state === "charging") {
            return (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-200">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Charging
                </span>
            );
        }

        if (percentage <= 20) {
            return (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-900 text-red-200">
                    Low Battery
                </span>
            );
        }

        return (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-200">
                {state || 'Active'}
            </span>
        );
    };

    return (
        <div className="space-y-4">
            {devices?.map(({ serial, name, model, deviceIcon, percentage, state }) => (
                <div key={serial} onClick={() => selectDevice(serial)} className={`bg-gray-800 rounded-xl shadow-md hover:shadow-lg
                    border-2 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]
                    ${selectedDeviceId === serial ? "border-blue-500 ring-2 ring-blue-800" : "border-gray-700 hover:border-blue-600"}`}>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img src={"/assets/" + deviceIcon} className="w-12 h-12 rounded-lg bg-gray-700 p-2" alt={model}/>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-white truncate">{model}</h3>
                                    <p className="text-sm text-gray-400 truncate">{name}</p>
                                    <div className="mt-2">{getStatusBadge(percentage, state)}</div>
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                <CirclePercentage percentage={percentage} />
                            </div>
                        </div>
                    </div>

                    {/* Subtle indicator for selected item */}
                    {selectedDeviceId === serial && (
                        <div className="absolute top-3 right-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DeviceList;