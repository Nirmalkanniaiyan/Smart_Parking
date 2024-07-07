"use client";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import Modal from "@/components/modal";

export default function Slot({ car ,status ,slotid,bookedUser,startTime,slotDetails }) {

    const [showModal, setShowModal] = useState(false);
    const freezed = status === "2";
    const occupied = status === "1";

    return (

        <>

            <div onClick={() => setShowModal(true)}  className={` " rounded-xl border text-black pt-2 hover:rounded-3xl hover:cursor-pointer" 
             ${freezed ? "bg-gray-200" : !occupied ? " bg-[#5cd65c] " : "bg-[#ff5050]"} ` }>
                <Image src={car} alt="" height={100} width={100} />
                <h3 className=" text-center mt-2 font-bold pb-2"> {slotid}</h3>
            </div>

            <Modal  showModal={showModal} 
                    close_func={() => setShowModal(false)} 
                    slotid={slotid}
                    status={status}
                    bookedUser={bookedUser}
                    startTime={startTime}
                    slotDetails={slotDetails}
            ></Modal>

        </>

    )
}