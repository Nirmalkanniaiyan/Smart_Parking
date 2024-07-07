export default function MessageModal({showMessageModal,close_func,message}){
    // alert("MessageModal");
    if (showMessageModal === false) return null;

    return (
        <div className=" fixed inset-0 bg-white flex overflow-y-auto backdrop-blur-sm bg-opacity-50 justify-center items-center ">  
            <div className=" bg-gray-300 border shadow-lg  rounded-lg p-4 w-1/3">

                <h1 className=" text-center font-bold text-3xl ">{message}</h1>

                <div className="flex gap-6 flex-wrap justify-center">
                <button className=" bg-red-600 border-black w-fit p-3 rounded-md  mt-5 " onClick={close_func}>Close</button>
                </div>

            </div>
        </div>
    )
}