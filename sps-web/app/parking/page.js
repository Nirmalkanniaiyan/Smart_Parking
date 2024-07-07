"use client";

import Lane from "@/components/lane";
import NavBar from "@/components/navBar";
import { get_all_closed_slots, get_all_free_slots, get_all_slots } from "@/constants/constants";
import { useEffect,useState } from "react";

export default function Parking() {

    if (localStorage.getItem('accessToken') === null ) {
        alert("Please login first");
        window.location.href = "/login";
        return
    }
    
    // const adminID = useState(localStorage.getItem("adminID"));

    const accessToken = useState(localStorage.getItem('accessToken'));
    const token = JSON.parse(accessToken[0])["accessToken"];

    console.log("token",token)
    
    const [slotsLength, setSlotsLength] = useState(0);
    const [freeSlots, setFreeSlots] = useState(0);
    const [occupied, setOccupied] = useState(0);
    const [list, setList] = useState([[]]);

    const getAllSlots = async () => {
        
        const slots_data = await fetch(get_all_slots,{
            method : 'GET',
            headers : { "Authorization" : `Bearer ${token}` }
        })
        if(slots_data.ok){         
             const data = await slots_data.json();
            //  console.log("from get all slots",data);

             let list1 = [];
            for(let i = 0;i<data.length;i+=20){
                let temp = []
                    for (let k = i; k < i+20 && k<data.length; k++) {
                        temp.push(data[k]);
                    }
                list1.push(temp)
            }   
            // console.log("list1",list1)
            setSlotsLength(data.length);
            setList([...list1]);
        }

    }

    const getFreeSlots = async() => {
        const free_slots_data = await fetch(get_all_free_slots,{
            method : 'GET',
            headers : { "Authorization" : `Bearer ${token}` }
        })
        const data = await free_slots_data.json();
        setFreeSlots(data.length);

    }

    const getOccupiedSlots = async() => {
        const free_occupied_data = await fetch(get_all_closed_slots,{
            method : 'GET',
            headers : { "Authorization" : `Bearer ${token}` }
        })
        const data = await free_occupied_data.json();
        setOccupied(data.length);
    }

    useEffect(() => {
        getAllSlots();
        getFreeSlots();
        getOccupiedSlots();
    },[])
    
    const freezedSlots = slotsLength - freeSlots - occupied;
    // console.log("after ",list)

    return (
        <div >
            
            <NavBar />

            <h1 className="text-4xl text-center text-white font-bold my-4">Parking</h1>

            <div className="flex justify-center flex-wrap gap-4">
                <h2 className="text-2xl text-center text-red-500 font-bold my-4">Occupied Slots = {occupied}</h2>
                <h2 className="text-2xl text-center text-green-500 font-bold my-4">Not Occupied Slots = {freeSlots}</h2>
                <h2 className="text-2xl text-center text-white font-bold my-4">Freezed Slots = {freezedSlots}</h2>
            </div>

            <div className="flex flex-wrap my-4">
                {list.map((data_json,i) => (
                    <Lane key={i} data={data_json} />
                ))}
            </div>

        </div>
    )
}