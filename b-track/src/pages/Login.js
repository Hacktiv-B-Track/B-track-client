import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../apis/axios";
import { toast } from "react-toastify";
import logo from "../assets/images/logo.png";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data, "response");
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("DepartmentId", res.data.DepartmentId);
        localStorage.setItem("DepartmentName", res.data.departmentName);
      })
      .then(() => {
        toast("Login Succesful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          toast.error(`${error.response.data.message}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }

  function handleOnClick(e) {
    e.preventDefault();
    history.push("/register");
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-blue-500 min-w-screen">
        {/* Logo */}
        <div className="flex items-center justify-center w-full space-x-16">
          <img className="w-1/4 " src={logo} alt="" />

          {/* card */}
          <div className="w-6/12 rounded-lg bg-gray-50 h-60v">
            <div className="flex flex-col items-center justify-center h-full ">
              <h2 className="mb-20 text-5xl text-center text-blue-500 ">
                Welcome to B-Track
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  aria-label="Enter your email address"
                  type="text"
                  placeholder="Email address"
                  className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border border-gray-200 rounded text-gray-base"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  aria-label="Enter your password"
                  type="password"
                  placeholder="Password"
                  className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border border-gray-200 rounded text-gray-base"
                />
                <button
                  type="submit"
                  className="w-full p-3 mt-4 mb-4 text-xl font-medium text-gray-200 bg-blue-500 rounded-md"
                >
                  Login
                </button>
                <div>
                  <span className="text-base">
                    Don't have an account? Register{" "}
                  </span>
                  <a
                    className="text-base text-blue-500"
                    href=""
                    onClick={(e) => handleOnClick(e)}
                  >
                    here
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
