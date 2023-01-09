import { useProgressColor } from "../hooks/useProgressColor";

const Battery = ({ percentage, state }) => {
    return (
        <div className="flex items-center">
            <div className="battery_head"
                style={{ background: (percentage === 100 ? useProgressColor(percentage) : "#292524") }}></div>
            <div className="battery_body">
                <div className="h-full flex justify-center items-center"
                    style={{ width: percentage + "%", background: useProgressColor(percentage) }}>
                        <span className="font-semibold text-slate-100">{percentage}</span>
                </div>
            </div>
        </div>
    )
}

export default Battery;