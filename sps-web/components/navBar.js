"use client"

import Image from "next/image"
import Link from "next/link"

export default function NavBar() {

    return(
        <nav className="top-0 my-5 text-xl text-black font-bold">
            <div className="mx-8 gap-8 flex items-center justify-center ">
                <Image src ="/images/logo1.png" alt="" height={80} width={80} className="" />
                <h1 className=" -m-12 italic text-white font text-xl font-bold">SMPS</h1>
                
                <div className="flex gap-12 mx-auto flex-wrap bg-gray-200 shadow-lg p-4 rounded-2xl ">
                    <Link href="/parking" className="hover:dark:text-[#5abaff]">Parking</Link>
                    <Link href="/editLot" className="hover:dark:text-[#5abaff]">Edit Lot</Link>
                    <Link href="/editSlot" className="hover:dark:text-[#5abaff]">Edit Slot</Link>
                </div>



                <Link href="/login" className="  flex justify-end sticky bg-blue-700 rounded-xl px-2 py-4 hover:text-white " onClick={() => localStorage.removeItem('accessToken')} >Log out</Link>
                <h1></h1>
            </div>
        </nav>
    )
}
