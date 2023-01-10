import CirclePercentage from "./circle_percentage";

const DeviceList = ({ devices, selectDevice }) => {
    if (devices?.length < 1)
        return (
            <div className="text-lg text-stone-800">
                No Upower Devices
            </div>
        )

    return (
        <div className="h-full overflow-y-scroll overflow-x-hidden flex flex-col w-full lg:w-1/3
            px-2 lg:px-4 py-3 lg:py-1">{
            devices?.map(({ serial, name, model, deviceIcon, percentage }) => (
                <div key={serial} onClick={() => selectDevice(serial)}
                    className="rounded-lg flex justify-between w-fit items-center hover:cursor-pointer
                    shadow-md shadow-slate-400 px-4 py-2 bg-slate-50 mb-4">
                    <img src={"/assets/" + deviceIcon} className="mr-6 w-[50px] h-[50px]"/>
                    <div className="flex flex-col mr-12">
                        <span className="text-lg text-stone-900">{model}</span>
                        <span className="font-thin text-base text-stone-700">{name}</span>
                    </div>
                    <CirclePercentage percentage={percentage}/>
                </div>
            ))
        }</div>
    )
};

export default DeviceList;