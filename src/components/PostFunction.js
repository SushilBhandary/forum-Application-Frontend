// import CreatePost from "./CreatePost"
import { useState } from "react"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from "./api"
import axios from "axios"

const PostFunction = ({posts, setPosts, setIsMyPost} ) => {
  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState('')
  
  const closeModal = (e) => {
    e.preventDefault()
    setOpen(false)
  };

  const submitPost = async(e) => {
    e.preventDefault()
    if (!article) {
      return toast.warn('Enter some Post', {
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
    const data = JSON.parse(localStorage.getItem("jwt"))
    await axios.post(`${API}/create-post/${data.user._id}`, {
      article : article
    }, {
      headers: {
        authorization: data.token
      }
    })
    .then(res => {
      toast.success('Posted Sucessfuly', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      setArticle('')
      setOpen(false)
      setIsMyPost(false)
      refresh(e)
    })
    .catch( e => toast.warn('Some thing went wrong', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }))

  }

  const refresh = async(e) => {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem("jwt"))
    await axios.get(`${API}/get-post`, {
      headers: {
        authorization: data.token
      }
    })
    .then( (res) => {
      setPosts( res.data.posts)
      setIsMyPost(false)
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
  }

  const myPosts = async(e) => {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem("jwt"))
    await axios.get(`${API}/get-my-post/${data.user._id}`, {
      headers: {
        authorization: data.token
      }
    })
    .then( (res) => {
      setPosts( res.data.posts)
      setIsMyPost(true)
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
  }

  return (
    <div className="md:w-[20%] w-[90%] m-auto md:m-1 rounded-lg p-8 flex  bg-amber-100 md:flex-col md:justify-around flex-row">
        <button onClick={() => setOpen(true)} className="px-5 py-3 my-5 rounded-lg bg-amber-100 bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 ">Create Post</button>
        <Popup open={open}  modal nested>
          <form className=" text-lg container p-8 space-y-6 rounded-md shadow  bg-gradient-to-r from-[#833ab4] to-[#1dc0fd] ">
              <button className="btn btn-circle absolute  top-0 right-0 mt-2 mr-2"  onClick={closeModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h2 className="w-full text-3xl font-bold leading-tight">New Post</h2>
              <div>
                  <label className="block mb-1 ml-1">Post</label>
                  <textarea value={article} onChange={e => setArticle(e.target.value)} rows={5} placeholder="Post / Article" className="block w-full p-2 rounded border-2 bg-[#8de0ff]" />
              </div>
              <div className="text-right">
                  <button onClick={e => submitPost(e)}  className=" px-4 py-2 font-bold rounded shadow text-white bg-blue-500 focus:outline-none hover:bg-blue-600 ">Post</button>
              </div>
          </form>
          <ToastContainer/>
        </Popup>
        <button onClick={myPosts} className="px-5 py-3 my-5 rounded-lg bg-amber-100 bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500">My Post</button>
        <button onClick={refresh} className="px-5 py-3 my-5 rounded-lg bg-amber-100 bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500">Refresh Posts</button>
        
    </div>
  )
}

export default PostFunction