import axios from "axios"
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
      <header className="text-gray-600 body-font bg-[#ffffff] shadow-lg shadow-bg-slate-400 rounded-lg">
        <div className="container mx-auto flex flex-wrap p-5  md:flex-row items-center justify-between">
          <div className="md:text-xl text-lg text-center">
          <div class="relative md:w-24 md:h-24 w-12 h-12 bg-gradient-to-r from-[#833ab4] to-[#1dc0fd] rounded-full flex justify-center items-center text-center p-5 shadow-xl mr-4 md:text-4xl  text-xl text-white">
            {userName[0]}
          </div> 
            {userName} 
          </div>
          <div className="md:text-3xl text-xl md:w-[50%] w-[30%] text-center text-white bg-gradient-to-r from-pink-500 to-yellow-500 p-5 rounded-lg"> Posts</div>
          <div className="md:text-xl text-lg text-center">
            <button className="md:px-4 px-2 md:py-2 py-1 font-bold rounded bg-red-500 hover:bg-red-600 md:my-2 my-1 text-white" onClick={logOut}>Logout</button>
          </div>
        </div>
      </header>
    )
  }


export default Header