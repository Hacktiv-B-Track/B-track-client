import React from "react";
import logo from "../assets/images/logo.png";

export default function Navbar() {
  return (
    <nav className="flex flex-col content-center w-full px-6 py-2 font-sans text-center bg-white shadow sm:flex-row sm:text-left sm:justify-between sm:items-baseline">
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
