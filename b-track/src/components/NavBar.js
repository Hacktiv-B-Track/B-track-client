import { useState } from "react"
import { useHistory } from "react-router"

export default function NavBar() {
  const [username] = useState(localStorage.getItem('username'))
  let history = useHistory()

  function handleLogout() {
      localStorage.clear()
      history.push('/login')
  }

  function goHome() {
      history.push('/')
  }

    return (
        <>
            <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
                <div onClick={e=>goHome()} className="flex-none hidden lg:flex">
                    <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">           
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>               
                    </svg>
                    </button>
                </div> 
                <div className="flex-1 hidden px-2 mx-2 lg:flex">
                    <span className="text-lg font-bold">
                            B-TRACK
                        </span>
                </div> 
                <div className="flex-none">
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" class="m-1 btn">
                            <p className="text-lg font-bold mx-2">{username}</p>
                            <div className="avatar">
                                <div className="rounded-full w-10 h-10 m-1">
                                    <img src="https://i.pravatar.cc/500?img=32" alt=''/>
                                </div>
                            </div>
                        </div> 
                        <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                            <li className="text-black">
                                <a onClick={e=>handleLogout()}>Logout</a>
                            </li> 
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}