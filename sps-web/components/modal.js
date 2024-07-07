"use client"

import { freeze_slot, unFreeze_slot } from "@/constants/constants";
import { useEffect, useState } from "react";
import MessageModal from "@/components/messageModal";

export default function Modal({ showModal, close_func, slotid, status, bookedUser, startTime, slotDetails }) {
    if (showModal === false) return null;

    const accessToken = useState(localStorage.getItem('accessToken'));
    const token = JSON.parse(accessToken[0])["accessToken"];
    const disableFreezed = (status === "1" || status === "2")
    const disableUnFreezed = (status === "1" || status === "0");

    const [showMessageModal, setMessageShowModal] = useState(false);
    const [message, setMessage] = useState("");


    const freezeSlot = async () => {
        const response = await fetch(freeze_slot + slotid, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.ok) {
            setMessageShowModal(true)
            setMessage("Slot freezed")

        }
    }

    const unFreezeSlot = async () => {
        const response = await fetch(unFreeze_slot + slotid, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.ok) {
            setMessageShowModal(true)
            setMessage("Slot unfreezed")
        }
    }


    return (
        <div className=" fixed inset-0 bg-white flex overflow-y-auto backdrop-blur-sm bg-opacity-50 justify-center items-center ">
            <div className=" bg-white border shadow-lg  rounded-lg p-4 w-1/3">

                <h1 className=" text-center font-bold text-3xl ">Slot Details</h1>

                <div className="mx-10 p-6 text-xl font-bold">
                    <h2 className="">Slot ID = {slotid}</h2>
                    <h2 className="">Status = {status}</h2>
                    <h2 className="">Booked User = {null == bookedUser ? "None" : bookedUser}</h2>
                    <h2 className="">Start Time = {null == startTime ? "Not started" : startTime}</h2>
                    <h2 className="">Slot Details = {slotDetails}</h2>
                </div>

                <div className="flex gap-6 flex-wrap justify-center">
                    <button className={`" border-black w-fit p-3 rounded-md  " ${disableFreezed ? "bg-slate-300" : "bg-blue-600"}`} disabled={disableFreezed} onClick={freezeSlot}>Freeze</button>
                    <button className={`" border-black w-fit p-3 rounded-md  " ${disableUnFreezed ? "bg-slate-300" : "bg-blue-600"}`} disabled={disableUnFreezed} onClick={unFreezeSlot}>UnFreeze</button>
                    <button className=" bg-red-600 border-black w-fit p-3 rounded-md  " onClick={close_func}>Close</button>
                </div>

                <MessageModal
                    showMessageModal={showMessageModal}
                    close_func={() => setMessageShowModal(false)}
                    message={message} >
                </MessageModal>

            </div>


        </div>
    )
}