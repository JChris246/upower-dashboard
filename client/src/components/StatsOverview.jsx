import CirclePercentage from "./circle_percentage";

const StatsOverview = ({ devices }) => {
    const getDeviceStats = () => {
        if (!devices || devices.length === 0) {
            return {
                totalDevices: 0,
                chargingDevices: 0,
                lowBatteryDevices: 0,
                healthyDevices: 0
            };
        }

        const totalDevices = devices.length;
        const chargingDevices = devices.filter(d => d.state === 'charging').length;
        const lowBatteryDevices = devices.filter(d => d.percentage <= 20).length;
        const healthyDevices = devices.filter(d => d.percentage > 20 && d.state !== 'charging').length;

        return {
            totalDevices,
            chargingDevices,
            lowBatteryDevices,
            healthyDevices
        };
    };

    const stats = getDeviceStats();

    const statCards = [
        {
            title: 'Total Devices',
            value: stats.totalDevices,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            color: 'bg-blue-500',
            textColor: 'text-blue-400'
        },
        {
            title: 'Charging',
            value: stats.chargingDevices,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            color: 'bg-green-500',
            textColor: 'text-green-400'
        },
        {
            title: 'Low Battery',
            value: stats.lowBatteryDevices,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667
                        1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            ),
            color: 'bg-red-500',
            textColor: 'text-red-400'
        },
        {
            title: 'Healthy',
            value: stats.healthyDevices,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            ),
            color: 'bg-emerald-500',
            textColor: 'text-emerald-400'
        }
    ];

    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Device Overview</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                            </div>
                            <div className={`p-2 rounded-lg ${stat.color} text-white`}>{stat.icon}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsOverview;
