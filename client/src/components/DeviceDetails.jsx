import Battery from "./battery";

const DeviceDetails = ({ device }) => {
    return (
        <div className="rounded-lg shadow-md shadow-slate-400 px-4 py-2 mt-1 bg-slate-50
            h-full w-full lg:w-2/3">
            <div className="flex mt-4 mb-6 items-start justify-between">
                <div>
                    <img src={"/assets/" + device.deviceIcon} className="mr-6 w-[50px] h-[50px]"/>
                    <div className="flex flex-col mr-12">
                        <span className="text-lg text-stone-900">{device.model}</span>
                        <span className="font-thin text-base text-stone-700">{device.name}</span>
                    </div>
                </div>
                <Battery percentage={device.percentage}/>
            </div>
            <div>{
                Object
                    .keys(device)
                    .filter(key => !(key === "name" || key === "model" ||
                        key === "deviceIcon" || key === "icon_name"))
                    .map(key =>
                        <div key={key} className="flex my-2 text-stone-900 text-base">
                            <span className="font-bold mr-2">{key.replaceAll("_", " ") +":"}</span>
                            <span className="font-normal">{device[key]}</span>
                        </div>
                    )
            }</div>
        </div>
    )
}

export default DeviceDetails;