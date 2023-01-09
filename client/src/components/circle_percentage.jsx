import { useProgressColor } from "../hooks/useProgressColor";

const CirclePercentage = ({ percentage }) => {
    const radius = 30;
    const circumference = 2 * 22 / 7 * radius;

    const color = useProgressColor(percentage);
    const offset = percentage === 100 ? "right-[52px]" : percentage > 9 ? "right-[48px]" : "right-[44px]";

    return (
        <div className="flex items-center justify-center -mr-10">
            <svg className="transform -rotate-90 w-[70px] h-[70px]">
                <circle cx="35" cy="35" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent"
                    className="text-gray-300" />

                <circle cx="35" cy="35" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference -  percentage / 100 * circumference}
                    style={{ color }}/>
            </svg>
            <span className={"relative text-sm font-bold " + offset} style={{ color }}>{percentage + "%"}</span>
        </div>
    )
}

export default CirclePercentage;