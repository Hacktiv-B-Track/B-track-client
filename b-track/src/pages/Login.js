export default function Login() {
    return(
        <>
            <div className="min-h-screen min-w-screen bg-green-600 items-center flex justify-center">
                <div className="bg-gray-50 w-6/12 h-60v rounded-lg">
                    <div class="h-full flex flex-col 
                                items-center justify-center">
                        <p class="text-green-700 text-xl mb-3">
                        Welcome to B-Track
                        </p>
            
                        <form>
                            <input aria-label="Enter your email address" 
                                type="text" placeholder="Email address" 
                                class="text-sm text-gray-base w-full 
                                        mr-3 py-5 px-4 h-2 border 
                                        border-gray-200 rounded mb-2" />
                            <input aria-label="Enter your password" 
                                type="password" placeholder="Password"
                                class="text-sm text-gray-base w-full mr-3 
                                        py-5 px-4 h-2 border border-gray-200 
                                        rounded mb-2" />
            
                            <button type="submit"
                                    class="bg-green-400 w-full mt-4">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}