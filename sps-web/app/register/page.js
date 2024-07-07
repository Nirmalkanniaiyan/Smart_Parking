"use client"
import { register_url } from "@/constants/constants";
import Link from "next/link";
import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";


export default function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lotName, setLotName] = useState('');
    const [description, setDescription] = useState('');
    const [coordinates, setCoordinates] = useState('');
    const [lotImageURL, setLotImageURL] = useState('');

    const handleSubmit = async (e) => {

        console.log(username, email, password, lotName, description, coordinates);
        e.preventDefault();

        try {
            const response = await fetch(register_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": username,
                    "email": email,
                    "password": password,
                    "lotName": lotName,
                    "description": description,
                    "coordinates": coordinates,
                    "lotImageURL": lotImageURL,
                })
            });

            if (response.status === 201) {
                const data = await response.json()
                console.log(data)
                console.log(data["accessToken"])
                window.location.href = "/login";
            }
        } catch (error) {
            console.log("error");
            console.log(error);
        }


    }



    return (
        <div className="flex text-xl my-40 felx-wrap p-4 m-auto flex-col bg-white  w-2/4 justify-center gap-y-2 rounded-2xl">

            <h1 className="font-bold ml-4 mt-4 text-2xl">Registration</h1>

            <div className="flex flex-wrap gap-6">

                <div className="flex flex-col">

                    <label className="mt-4 ml-4" for="email">Email</label>
                    <div className="flex mr-5 ml-5 items-center gap-4" >
                        <input className="w-full p-3 border-l border-b mt-2 shadow-md " type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                        <FaEnvelope className="" />
                    </div>

                    <label className="mt-4 ml-4" for="password">Password</label>
                    <div className="flex mr-5 ml-5 items-center gap-4" >
                        <input className="w-full p-3 border-l border-b mt-2 shadow-md" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        <FaLock />
                    </div>

                    <label className="mt-4 ml-4" for="description">Description</label>
                    <div className="flex mr-5 ml-5 items-center gap-4" >
                        <input className="w-full p-3 border-l border-b mt-2 shadow-md " type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
                        <FaUser className="" />
                    </div>

                    <label className="mt-4 ml-4" for="coordinates">Coordinates</label>
                    <div className="flex mr-5 ml-5 items-center gap-4" >
                        <input className="w-full p-3 border-l border-b mt-2 shadow-md " type="text" placeholder="Coordinates" onChange={(e) => setCoordinates(e.target.value)} required />
                        <FaUser className="" />
                    </div>

                </div>

                <div className="flex flex-col">
                    <label className="mt-4 ml-4" for="username">Username</label>
                    <div className="flex mr-5 ml-5 items-center gap-4" >
                        <input className="w-full p-3 border-l border-b mt-2 shadow-md " type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                        <FaUser className="" />
                    </div>

                    <label className="mt-4 ml-4" for="lotName">Lot Name</label>
                    <div className="flex mr-5 ml-5 items-center gap-4" >
                        <input className="w-full p-3 border-l border-b mt-2 shadow-md " type="text" placeholder="Lot Name" onChange={(e) => setLotName(e.target.value)} required />
                        <FaUser className="" />
                    </div>

                    <label className="mt-4 ml-4" for="lotImageURL">Lot Image URL</label>
                    <div className="flex mr-5 ml-5 items-center gap-4" >
                        <input className="w-full p-3 border-l border-b mt-2 shadow-md " type="text" placeholder="Lot Image URL" onChange={(e) => setLotImageURL(e.target.value)} required />
                        <FaUser className="" />
                    </div>

                </div>

            </div>

            <button type="submit" className="w-fit my-4  bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 rounded-xl shadow-sm mx-auto " onClick={handleSubmit}>Register</button>

            <div className="ml-4">
                <p>Alreadu have an account? <Link className=" text-sky-500 italic" href="/login">Login</Link></p>
            </div>

        </div>
    )
}