import { useProgressColor } from "../hooks/useProgressColor";

const Battery = ({ percentage, state }) => {
    return (
        <div className="flex items-center">
            <div className="battery_head"
                style={{ background: (percentage === 100 ? useProgressColor(percentage) : "#292524") }}></div>
            <div className="battery_body">
                <div className="h-full absolute right-0"
                    style={{ width: percentage + "%", background: useProgressColor(percentage) }}>
                </div>
                <div className="font-semibold text-slate-100 flex items-center z-10">
                    { state === "charging" && <img src="/assets/charge.png" className="h-6 w-6" alt=" "/> }
                    <span>{percentage}</span>
                </div>
            </div>
        </div>
    )
}

export default Battery;