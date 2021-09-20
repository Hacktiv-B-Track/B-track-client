import React from "react";
import { useState } from "react";
import logo from "../assets/images/logo.png";

export default function Navbar() {
  const [username, setUsername] = useState(localStorage.getItem('username'))

  return (
    <nav className="flex flex-col content-center w-full px-6 py-2 font-sans text-center bg-white shadow sm:flex-row sm:text-left sm:justify-between sm:items-baseline">
      <div className="flex-none self-center hidden lg:flex">
          <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">           
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>               
          </svg>
          </button>
      </div> 
      <div className="self-center w-20 h-20 ">
        <img className="self-center" src={logo} alt="logo" />
      </div>

      <div className="self-center sm:mb-0">
        <div className="flex justify-center">
          <p className="items-center justify-center mt-2 mr-2 text-gray-900">
            Kattie Yeremia
          </p>
          <div className="items-center justify-center w-10 h-10 border-r-2 border-white rounded-full ">
            <img
              className="rounded-full"
              alt="avatar"
              src="https://randomuser.me/api/portraits/women/68.jpg"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
