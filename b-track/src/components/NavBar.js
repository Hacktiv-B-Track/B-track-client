import { useState } from "react";
import { useHistory } from "react-router";
import Logo from "../assets/images/logo_navbar.png";

export default function NavBar() {
  const [username] = useState(localStorage.getItem("username"));
  let history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push("/login");
  }

  function goHome() {
    history.push("/");
  }

  return (
    <>
      <div className="mb-2 bg-blue-500 shadow-lg navbar text-neutral-content">
        <div className="flex-none hidden lg:flex"></div>
        <div className="flex-1 hidden px-2 mx-2 lg:flex">
          <img
            src={Logo}
            className="w-20 h-20 cursor-pointer"
            alt="logo"
            onClick={goHome}
          />
          <span
            className="ml-3 text-3xl font-bold cursor-pointer"
            onClick={goHome}
          >
            B-TRACK
          </span>
        </div>
        <div className="flex-none bg-blue-500 border-none hover:bg-blue-500">
          <div className="bg-blue-500 border-none dropdown dropdown-end hover:bg-blue-500">
            <div
              tabIndex="0"
              className="m-1 bg-blue-500 border-none btn hover:bg-blue-500"
            >
              <p className="mx-2 text-lg font-bold bg-blue-500 hover:bg-blue-500">
                {username}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <ul
              tabIndex="0"
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="text-black">
                <a onClick={(e) => handleLogout()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
