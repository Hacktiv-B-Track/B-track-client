import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../apis/server";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { fetchDepartments } from "../store/action";
import Logo from "../assets/images/logo_putih.png";

export default function Register() {
  const departments = useSelector((state) => state.departments);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    dispatch(fetchDepartments());
  }, []);

  useEffect(() => {
    let filter = departments.filter((dept) => dept.name === "Finance");
    if (filter[0]?.id === +department) {
      if (role === "manager_department") {
        setRole("manager_finance");
      } else if (role === "staff_department") {
        setRole("staff_finance");
      }
    }
  }, [department, role]);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/register", {
        email,
        username,
        password,
        DepartmentId: department,
        role,
      })
      .then((res) => {
        toast("Register Succesful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/login");
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          error.response.data.message.map((err) =>
            toast.error(err, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          );
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

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/register", {
        email,
        username,
        password,
        DepartmentId: department,
        role,
      })
      .then((res) => {
        toast("Register Succesful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/login");
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          error.response.data.message.map((err) =>
            toast.error(err, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          );
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

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/register", {
        email,
        username,
        password,
        DepartmentId: department,
        role,
      })
      .then((res) => {
        toast("Register Succesful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/login");
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
    history.push("/login");
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-blue-500 min-w-screen">
        <div className="w-6/12 bg-white rounded-lg h-70v">
          <div className="flex flex-col items-center justify-center h-full px-3 ">
            {/* Logo */}
            <div className="flex flex-col items-center w-full space-x-16">
              <img className="w-1/4 ml-12" src={Logo} alt="" />
              <p className="mb-8 text-5xl text-blue-500 ">Register</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                aria-label="Enter your email address"
                type="text"
                placeholder="Email address"
                className="w-full h-2 px-4 py-5 mb-5 text-sm border border-gray-200 rounded text-gray-base"
              />
              <input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                aria-label="Enter your username"
                type="text"
                placeholder="Username"
                className="w-full h-2 px-4 py-5 mb-5 text-sm border border-gray-200 rounded text-gray-base"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="w-full h-2 px-4 py-5 mb-5 text-sm border border-gray-200 rounded text-gray-base"
              />
              <select
                value={department}
                className="mb-5"
                defaultValue=""
                onChange={(e) => setDepartment(e.target.value)}
                id="department"
              >
                <option value="" disabled hidden>
                  Select Department
                </option>
                {departments.map((department) => {
                  return (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  );
                })}
              </select>
              <select
                value={role}
                defaultValue=""
                onChange={(e) => setRole(e.target.value)}
                id="role"
              >
                <option value="" disabled hidden>
                  Select Role
                </option>
                <option value="staff_department">Staff</option>
                <option value="manager_department">Manager</option>
              </select>

              <button
                type="submit"
                className="w-full p-3 mt-4 mb-4 text-xl font-medium text-gray-200 bg-blue-500 rounded-md"
              >
                Register
              </button>
              <div>
                <span className="text-base">Back to Login </span>
                <a
                  className="text-base text-blue-500"
                  href=""
                  onClick={(e) => handleOnClick(e)}
                >
                  page
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
