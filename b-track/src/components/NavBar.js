export default function NavBar() {
    return (
        <>
            <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
                <div class="flex-none hidden lg:flex">
                    <button class="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">           
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>               
                    </svg>
                    </button>
                </div> 
                <div class="flex-1 hidden px-2 mx-2 lg:flex">
                    <span class="text-lg font-bold">
                            B-TRACK
                        </span>
                </div> 
                <div class="flex-none">
                    <div class="avatar">
                    <div class="rounded-full w-10 h-10 m-1">
                        <img src="https://i.pravatar.cc/500?img=32"/>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}