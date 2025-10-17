import { useProgressColor } from "../hooks/useProgressColor";

const Battery = ({ percentage, state }) => {
    const batteryColor = useProgressColor(percentage);
    const isCharging = state === "charging";
    const isDischarging = state === "discharging";

    return (
        <div className="flex items-center space-x-2">
            <div className="flex items-center relative">
                {/* Battery head */}
                <div className="w-[6px] h-[16px] mx-auto rounded-t-[4px] border border-gray-500"
                    style={{ backgroundColor: percentage === 100 ? batteryColor : "#6b7280" }}/>

                {/* Battery body */}
                <div className="w-[140px] h-[55px] relative border-2 border-gray-500 rounded-md bg-gray-700 overflow-hidden">
                    {/* Battery fill */}
                    <div className="h-full absolute right-0 transition-all duration-500 ease-out rounded-sm"
                        style={{ width: `${percentage}%`, backgroundColor: batteryColor }}/>

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center space-x-1 text-white font-semibold text-sm drop-shadow-sm">
                            {isCharging && (
                                <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            )}
                            <span>{percentage}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status indicator */}
            <div className="flex flex-col items-start mt-2">
                { isDischarging &&  <div className="text-xs font-medium text-gray-400">
                    Discharging
                </div>}
                {percentage <= 20 && !isCharging && (
                    <div className="text-xs text-red-400 font-medium">Low Battery</div>
                )}
            </div>
        </div>
    );
};

export default Battery;