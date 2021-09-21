import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import axios from '../apis/server'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { fetchDepartments } from '../store/action';

export default function Register() {
    const departments = useSelector(state => state.departments)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [department, setDepartment] = useState('')
    const [role, setRole] = useState('')
    const dispatch = useDispatch()
    let history = useHistory();
    
    useEffect(() => {
        dispatch(fetchDepartments())
    }, [])

    useEffect(() => {
        let filter = departments.filter(dept => dept.name === 'Finance')
        if (filter[0]?.id === +department) {
            if (role === 'manager_department') {
                setRole('manager_finance')
            } else if(role === 'staff_department') {
                setRole('staff_finance')
            }
        }
    }, [department,role])

    function handleSubmit(e) {
        e.preventDefault()
        axios.post('/register', {
            email, username, password, DepartmentId:department, role
        })
        .then(res => {
            toast('Register Succesful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            history.push('/login')
        })
        .catch(error=>{
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
                console.log('Error', error.message);
            }   
        })
    }

    function handleOnClick(e) {
        e.preventDefault()
        history.push('/login')
    }

    return(
        <>
            <div className="min-h-screen min-w-screen bg-green-600 items-center flex justify-center">
                <div className="bg-gray-50 w-6/12 h-70v rounded-lg">
                    <div className="h-full flex flex-col 
                                items-center justify-center px-3">
                        <p className="text-green-700 text-2xl mb-3">
                        Register
                        </p>
            
                        <form onSubmit={handleSubmit} className='flex flex-col w-full'>
                            <label htmlFor='email'>Email</label>
                            <input
                                onChange={e=>setEmail(e.target.value)} 
                                id='email'
                                aria-label="Enter your email address" 
                                type="text" placeholder="Email address" 
                                className="text-sm text-gray-base w-full 
                                        py-5 px-4 h-2 border 
                                        border-gray-200 rounded mb-2" />
                            <label htmlFor='username'>Username</label>
                            <input
                                onChange={e=>setUsername(e.target.value)} 
                                id='username'
                                aria-label="Enter your username" 
                                type="text" placeholder="Username" 
                                className="text-sm text-gray-base w-full 
                                        py-5 px-4 h-2 border 
                                        border-gray-200 rounded mb-2" />
                            <label htmlFor='password'>Password</label>
                            <input 
                                onChange={e=>setPassword(e.target.value)} 
                                id='password'
                                aria-label="Enter your password" 
                                type="password" placeholder="Password"
                                className="text-sm text-gray-base w-full
                                        py-5 px-4 h-2 border border-gray-200 
                                        rounded mb-2" />
                            <label htmlFor='department'>Department</label>
                            <select 
                            value={department}
                            defaultValue='' 
                            onChange={e=>setDepartment(e.target.value)} 
                            id="department"
                            >
                                <option value="" disabled hidden>
                                    --SELECT DEPARTMENT--
                                </option>
                                {departments.map(department => {
                                    return <option key={department.id} value={department.id}>{department.name}</option>
                                })}
                            </select>
                            <label htmlFor='role'>Role</label>
                            <select 
                            value={role} 
                            defaultValue=''
                            onChange={e=>setRole(e.target.value)} 
                            id="role"
                            >
                                <option value="" disabled hidden>
                                    --SELECT ROLE--
                                </option>
                                <option value="staff_department">Staff</option>
                                <option value="manager_department">Manager</option>
                            </select>
            
                            <button type="submit"
                                    className="bg-green-400 w-full mt-4 mb-4 p-3">
                                Register
                            </button>
                            <a href='' onClick={(e)=>handleOnClick(e)} >Back to Login</a>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}