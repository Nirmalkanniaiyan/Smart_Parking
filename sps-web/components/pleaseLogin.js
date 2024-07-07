import Link from "next/link";

export default function PleaseLogin({show,close_func}){
    // alert("MessageModal");
    if (show === false) return null;

    return (
        <div className=" fixed inset-0 bg-white flex overflow-y-auto backdrop-blur-sm bg-opacity-50 justify-center items-center ">  
            <div className=" bg-gray-300 border shadow-lg  rounded-lg p-4 w-1/3">

                <h3 className=" text-center font-bold text-3xl "> You have Not logged in.</h3>
                <h3 className=" text-center font-bold text-3xl "> Please Login to Continue</h3>

                <div className="flex gap-6 flex-wrap justify-center">
                <Link href='/login' className=" bg-red-600 border-black w-fit p-3 rounded-md  mt-5 " onClick={close_func}>Login</Link>
                </div>

            </div>
        </div>
    )
}