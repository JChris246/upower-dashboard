import Battery from "./battery";

const DeviceDetails = ({ device, goBack }) => {
    const formatFieldName = (key) => {
        return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const getDetailFields = () => {
        const excludeFields = ["name", "model", "deviceIcon", "icon_name", "percentage", "state"];
        return Object.keys(device).filter(key => !excludeFields.includes(key));
    };

    const getStatusColor = (state) => {
        switch (state?.toLowerCase()) {
            case 'charging':
                return 'text-green-400';
            case 'discharging':
                return 'text-orange-400';
            case 'fully_charged':
                return 'text-blue-400';
            default:
                return 'text-gray-400';
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img src={"/assets/" + device.deviceIcon} className="w-12 h-12 bg-white/20 rounded-lg p-2" alt={device.model} />
                        <div>
                            <h2 className="text-xl font-bold text-white">{device.model}</h2>
                            <p className="text-blue-100">{device.name}</p>
                        </div>
                    </div>
                    <button onClick={goBack} className="lg:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Battery Status */}
            <div className="px-6 py-4 bg-gray-700/50 border-b border-gray-600">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Battery Status</h3>
                        <p className={`text-sm font-medium ${getStatusColor(device.state)}`}>{device.state}</p>
                    </div>
                    <Battery percentage={device.percentage} state={device.state} />
                </div>
            </div>

            {/* Device Details */}
            <div className="px-6 py-4">
                <h3 className="text-lg font-semibold text-white mb-4">Device Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getDetailFields().map(key => (
                        <div key={key} className="bg-gray-700/50 rounded-lg p-3">
                            <dt className="text-sm font-medium text-gray-400 mb-1">
                                {formatFieldName(key)}
                            </dt>
                            <dd className="text-sm text-white font-mono">{device[key]}</dd>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-700/50 border-t border-gray-600">
                <div className="flex flex-col sm:flex-row gap-3">
                    <a href={"/stats/" + device.serial} className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent
                        text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                        focus:ring-blue-500 transition-colors duration-200">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2
                                2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2
                                2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        View History
                    </a>
                    <button onClick={goBack} className="hidden lg:inline-flex justify-center items-center px-4 py-2 border border-gray-600 text-sm
                        font-medium rounded-lg text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2
                        focus:ring-blue-500 transition-colors duration-200">Close Details</button>
                </div>
            </div>
        </div>
    );
}

export default DeviceDetails;