import Slot from "./slot";
export default function Lane({ data }) {

    var count = data.length;

    return (
        <div className="text-black bg-[#d6d4dc37] w-fit h-fit mx-auto flex-wrap flex-col shadow-2xl rounded-2xl p-6 my-2">

            <div className="grid grid-cols-10 gap-4 rounded-lg  ">
                {/* {list.map(tuple => (
                    <Slot key={tuple[0]} car="/images/car.png" status={tuple[1]} />
                ))} */}

                {data.map((slot, index) =>
                    index < Math.ceil(count / 2) ? <Slot key={index} car="/images/car2.png" status={slot["status"]} slotid={slot["slotId"]} bookedUser={slot["bookedUser"]} startTime={slot["startTime"]} slotDetails={slot["slotDetails"]} /> : null
                )}
            </div>

            <div className="grid grid-cols-10 gap-4 mt-4 mx-0 rounded-lg  ">
                {/* {list1.map(tuple => (
                    // const [index, value] = tuple;

                    <Slot key={tuple[0]} car="/images/carR.png" status={tuple[1]} />
                ))} */}

                {data.map((slot, index) =>
                    index >= Math.ceil(count / 2) ? <Slot 
                    key={index} 
                    car="/images/car2R.png" 
                    status={slot["status"]} 
                    slotid={slot["slotId"]} 
                    bookedUser={slot["bookedUser"]} 
                    startTime={slot["startTime"]}
                    slotDetails={slot["slotDetails"]} /> : null
                )}
            </div>

        </div>
    )
}