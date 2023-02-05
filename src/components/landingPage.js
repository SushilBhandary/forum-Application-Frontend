
import { useState } from "react";
import Login from "./login";
import Signup from "./signup";

const LandingPage = () => {

    const [toSingup, setToSingup] = useState(false)
    const [homePage, setHosePage] = useState(true)

    return (
        <div>
            { homePage ? (
                <div className="flex items-center justify-center h-screen   bg-gradient-to-r from-pink-500 to-yellow-500">
                    <div className="w-[full] h-[50%] max-w-md p-8 space-y-3 rounded-xl  bg-gradient-to-r from-amber-200 to-yellow-500 flex flex-col justify-around">
                        <h1 className="text-center p-4 text-4xl text-white"> Wellcome to FORUM Application</h1>
                        <div className="flex justify-around">
                            <button onClick={e => { e.preventDefault(); setHosePage(false); setToSingup(false)}} className="block  bg-blue-500  hover:bg-blue-600 p-3  text-white  focus:outline-none rounded-lg ">Login</button> 
                            <button onClick={e => { e.preventDefault(); setHosePage(false); setToSingup(true)}}  className="block  bg-blue-500  hover:bg-blue-600 p-3 text-white  focus:outline-none  rounded-lg ">Sign up</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div >
                    {toSingup ? <Signup setToSingup={setToSingup}/> : <Login setToSingup={setToSingup} />}
                </div>
            )}
        </div>
        
    )
}

export default LandingPage

