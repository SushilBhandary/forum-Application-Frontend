import axios from "axios"
import Avatar from "../Image/avatar.jpg"
import API from "./api"

const Header = ({logout}) => {

  const logOut = async(e) => {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem("jwt"))
    await axios.post(`${API}/logout`, {}, {
      headers: {
        authorization: data.token
      }
    })
    .then( res => {
      logout()
    })
    .catch( e => console.log("error --->", e))
  }
  const userName = JSON.parse(localStorage.getItem("jwt")).user.name
    return(
      <header className="text-gray-600 body-font bg-[#19E8D6]">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
          <div className="text-xl text-center">
            <img className="rounded-full h-24" src={Avatar} alt ="Avatar"></img> 
            {userName} 
          </div>
          <div className="text-3xl"> Posts</div>
          <div className="text-xl text-center">
            <button className="px-4 py-2 font-bold rounded bg-red-500 hover:bg-red-600 my-2 text-white" onClick={logOut}>Logout</button>
          </div>
        </div>
      </header>
    )
  }


export default Header