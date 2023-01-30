
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import API from "./api";
import axios from "axios"

const CreatePost = ({open, setOpen}) => {

  const closeModal = (e) => {
    e.preventDefault()
    setOpen(false)
  };

  return (
    <Popup open={open}  modal nested>
      <form className=" text-lg container p-8 space-y-6 rounded-md shadow  bg-[#AFD344]">
          <button className="btn btn-circle absolute  top-0 right-0 mt-2 mr-2"  onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <h2 className="w-full text-3xl font-bold leading-tight">New Post</h2>
          <div>
              <label className="block mb-1 ml-1">Post</label>
              <input  type="text" placeholder="Title"  className="block w-full p-2 rounded border-2 bg-[#F3FBCE]" />
          </div>
          <div className="text-right">
              <button  className=" px-4 py-2 font-bold rounded shadow text-white bg-blue-500 focus:outline-none hover:bg-blue-600 ">Post</button>
          </div>
      </form>
    </Popup>
  )
}

export default CreatePost