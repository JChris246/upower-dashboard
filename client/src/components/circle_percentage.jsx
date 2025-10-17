import { useProgressColor } from "../hooks/useProgressColor";

const CirclePercentage = ({ percentage, size = "default" }) => {
    const sizes = {
        small: { radius: 20, width: 50, height: 50, strokeWidth: 4, fontSize: "text-xs" },
        default: { radius: 30, width: 70, height: 70, strokeWidth: 6, fontSize: "text-sm" },
        large: { radius: 40, width: 90, height: 90, strokeWidth: 8, fontSize: "text-base" }
    };

    const config = sizes[size];
    const circumference = 2 * Math.PI * config.radius;
    const color = useProgressColor(percentage);

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg className="transform -rotate-90" width={config.width} height={config.height}>
                {/* Background circle */}
                <circle cx={config.width / 2} cy={config.height / 2} r={config.radius}
                    stroke="currentColor" strokeWidth={config.strokeWidth} fill="transparent" className="text-gray-700"/>

                {/* Progress circle */}
                <circle cx={config.width / 2} cy={config.height / 2} r={config.radius} stroke={color} strokeWidth={config.strokeWidth}
                    fill="transparent" strokeDasharray={circumference} strokeDashoffset={circumference - (percentage / 100) * circumference}
                    className="transition-all duration-300 ease-in-out" strokeLinecap="round"/>
            </svg>
              {/* Percentage text */}
            <div className={`absolute inset-0 flex items-center justify-center ${config.fontSize} font-bold`} style={{ color }}>
                {percentage}%
            </div>
        </div>
    );
};

export default CirclePercentage;