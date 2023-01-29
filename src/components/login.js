import { useState } from "react"
import axios from "axios"
import PostPage from "./PostPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from "./api";

const Login = ({setToSingup}) => {

  const [islogin, SetLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [posts, setPosts] = useState([])

  const submit = async(e) => {
    e.preventDefault()
    if (!(email && password)) {
      return toast.warn('Email/Password is missining', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    const data = {
      email : email, 
      password : password
    }
    await axios.post(`${API}/login`,data)
    .then(async(res) => {
      localStorage.setItem("jwt", JSON.stringify(res.data))
      await axios.get(`${API}/get-post`, {
        headers: {
          authorization: res.data.token
        }
      })
      .then( (res) => {
        setPosts( res.data.posts)
        SetLogin(true)
      })
      .catch( e => toast.error(e.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
      )
      SetLogin(true)
    }).catch( e => 
      toast.error(e.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
      )
  }

  const logout = () => {
    SetLogin(false)
    setEmail('')
    setPassword('')
  }

  return(
    <div>
      { !islogin ? (
        <div className="flex items-center justify-center h-screen bg-[#CFFCE8]">
          <div className="w-full max-w-md p-8 space-y-3 rounded-xl ">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <form action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
              <div className="space-y-1 text-sm">
                  <label className="block ">Email</label>
                  <input value={email} onChange={ e =>setEmail(e.target.value)} type="text" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md  border-2 " />
              </div>
              <div className="space-y-1 text-sm">
                  <label className="block ">Password</label>
                  <input value={password} onChange={ e =>setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-2 " />
              </div>
              <button onClick={submit} className="block w-full p-3 text-center rounded-sm text-white bg-[#10ABAC] focus:outline-none hover:bg-[#0B8390] rounded ">Login</button>
            </form>
            <p className="text-xs text-center sm:px-6 ">Don't have an account?
                <span className="underline " onClick={() => {setToSingup(true)}}> Sign up</span>
            </p>
          </div>
          <ToastContainer/>
        </div>
      ) : (
        <PostPage logout={logout} posts={posts} setPosts={setPosts} />
      )}
    </div>
    
    
  )
}

export default Login