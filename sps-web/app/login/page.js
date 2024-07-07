"use client"
import { login_url, current_admin_url } from "@/constants/constants";
import Link from "next/link";
import React, { useState } from "react";
import { FaLock, FaEnvelope } from "react-icons/fa";

export default function Login() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(email, password);


    try {
      const response = await fetch(login_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      });



      if (response.status === 200) {
        const data = await response.json();

        localStorage.setItem('accessToken', JSON.stringify(data));

        // accessToken = localStorage.getItem('accessToken');
        // console.log(accessToken);

        const getUserData = await fetch(current_admin_url, {
          method: "GET",
          headers: { "Authorization": `Bearer ${data.accessToken}` }
        })

        const userData = await getUserData.json();
        localStorage.setItem('adminID', userData.id);

        window.location.href = "/parking";
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex text-xl my-40 felx-wrap p-4 m-auto flex-col bg-white  w-2/4 justify-center gap-y-2 rounded-2xl">

      <h1 className="font-bold ml-4 mt-4 text-2xl">Smart Parking System</h1>

      <label className="mt-4 ml-4" for="email">Email</label>
      <div className="flex mr-5 ml-9 items-center gap-4" >
        <input className="w-full p-3 border-l border-b shadow-md " type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <FaEnvelope className="" />
      </div>

      <label className="mt-4 ml-4" for="password">Password</label>
      <div className="flex mr-5 ml-9 items-center gap-4" >
        <input className="w-full p-3 border-l border-b shadow-md" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <FaLock />
      </div>

      <button type="submit" className="w-fit my-4  bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 rounded-xl shadow-sm mx-auto " onClick={handleSubmit}>Login</button>

      <div className="ml-4">
        <p>Don't have an account? <Link className=" text-sky-500 italic" href="/register">Register</Link></p>
      </div>

    </div>
  );
}