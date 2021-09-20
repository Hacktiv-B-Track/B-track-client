import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from '../apis/server'
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory();
    

    function handleSubmit(e) {
        e.preventDefault()
        axios.post('/login', {
            email, password
        })
        .then(res => {
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('role', res.data.role);
        })
        .then(() => {
            toast('Login Succesful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                history.push('/dashboard/:departmentId')

            // Swal.fire({
            //     position: 'center',
            //     icon: 'success',
            //     title: 'Added to watchlist',
            // })
        })
        .catch(err=>console.log(err))
    }

    function handleOnClick(e) {
        e.preventDefault()
        history.push('/register')
    }

    return(
        <>
            <div className="min-h-screen min-w-screen bg-green-600 items-center flex justify-center">
                <div className="bg-gray-50 w-6/12 h-60v rounded-lg">
                    <div className="h-full flex flex-col 
                                items-center justify-center">
                        <h2 className="text-green-700 text-3xl mb-3">
                        Welcome to B-Track
                        </h2>
            
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='email'>Email</label>
                            <input
                                onChange={e=>setEmail(e.target.value)} 
                                id='email'
                                aria-label="Enter your email address" 
                                type="text" placeholder="Email address" 
                                className="text-sm text-gray-base w-full 
                                        mr-3 py-5 px-4 h-2 border 
                                        border-gray-200 rounded mb-2" />
                            <label htmlFor='password'>Password</label>
                            <input 
                                onChange={e=>setPassword(e.target.value)} 
                                id='password'
                                aria-label="Enter your password" 
                                type="password" placeholder="Password"
                                className="text-sm text-gray-base w-full mr-3 
                                        py-5 px-4 h-2 border border-gray-200 
                                        rounded mb-2" />
            
                            <button type="submit"
                                    className="bg-green-400 w-full mt-4 mb-4 p-3">
                                Login
                            </button>
                            <a href='' onClick={(e)=>handleOnClick(e)} >Not Registered?</a>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}