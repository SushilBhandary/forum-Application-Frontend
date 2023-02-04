import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import API from "./api";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const  PostsList = ({posts, setPosts, isMyPost}) => {
    // const name = JSON.parse(localStorage.getItem("jwt")).user.name
    // const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState({})
    const [open, setOpen] = useState(false);
    const [article, setArticle] = useState('')
    const [id, setId] = useState('')

    const closeModal = (e) => {
        e.preventDefault()
        setOpen(false)
        setId('')
        setArticle('')
    };

    const add = (e,id) => {
        commentList[id] = e.target.value
        setCommentList(commentList)
    }

    const addComment = async(e, id) => {
        e.preventDefault()
        if (!commentList[id]) {
            return toast.warn('comment is missining', {
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
        await axios.post(`${API}/add-comments/${id}`, {
        name : data.name,
        value : commentList[id]
        }, {
        headers: {
            authorization: data.token
        }
        })
        .then( async( res) => {
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
            const data = JSON.parse(localStorage.getItem("jwt"))
            await axios.get(`${API}/get-post`, {
                headers: {
                  authorization: data.token
                }
              })
              .then( (res) => {
                setPosts( res.data.posts)
                setCommentList({})
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
        })
        .catch(e => console.log(e))
    }

    const editPost = async (e) => {
        e.preventDefault()
        const data = JSON.parse(localStorage.getItem("jwt"))
        await axios.put(`${API}/edit-post/${id}`, {
            article : article
        }, {
            headers: {
                authorization: data.token
            }
        })
        .then( res => {
            toast.success( res.data.message , {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            setPosts( posts.map( post => {
                if (post._id !== id) {
                   return post 
                }
                post.article = article;
                return post
            }))
        })
        .catch( e => console.log(e))
    }

    const deletPost = async(e, id) => {
        e.preventDefault()
        const data = JSON.parse(localStorage.getItem("jwt"))
        await axios.delete(`${API}/delete-post/${id}/${data.user._id}`, {
        headers: {
            authorization: data.token
        }
        })
        .then( res => {
            toast.success( res.data.message , {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            setPosts( posts.filter( post => post._id !== id))
        })
        .catch( e => console.log("error----> ", e))
    }

    const onEdit = (e, id, article) => {
        setOpen(true);
        setId(id)
        setArticle(article)
    }

    return (
        <div className="w-[75%] rounded-lg p-5 bg-[#D9D55B]">
            <Popup open={open}  modal nested>
                <form className=" text-lg container p-8 space-y-6 rounded-md shadow  bg-[#AFD344]">
                    <button className="btn btn-circle absolute  top-0 right-0 mt-2 mr-2"  onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <h2 className="w-full text-3xl font-bold leading-tight">Edit Post</h2>
                    <div>
                        <label className="block mb-1 ml-1">Post</label>
                        <textarea value={article} onChange={e => setArticle(e.target.value)} rows={5} placeholder="Post / Article" className="block w-full p-2 rounded border-2 bg-[#F3FBCE]" />
                    </div>
                    <div className="text-right">
                        <button onClick={e => editPost(e)}  className=" px-4 py-2 font-bold rounded shadow text-white bg-blue-500 focus:outline-none hover:bg-blue-600 ">Update Post</button>
                    </div>
                </form>
            </Popup>
            { posts && posts.map( post => (
                <div  key={post._id} className="my-2 bg-[#EDBF69]">
                    { isMyPost && (
                        <div className="flex justify-around">
                            <button onClick={e => onEdit(e, post._id, post.article)} className="rounded-lg bg-[#EDC126] px-5 py-3 my-5">Edit</button>
                            <button onClick={e => deletPost(e, post._id)}  className="rounded-lg bg-[#B4161B] px-5 py-3 my-5">delete</button>
                        </div>
                    ) }
                    <div className="rounded-lg py-5 px-8 ">
                        <div className="my-5 text-2xl" > <span className="rounded-full bg-[#1B98F5] ">Avathar</span>  {post.createdByName} 
                        </div>
                        <div className="my-5 text-xl bg-[#fff] p-2 rounded-md">
                            {post.article}
                        </div>
                        <div className="my-5 flex flex-col ">
                            <h1 className="text-2xl ">Comments</h1>
                            <div className=" flex px-5 items-baseline rounded-lg bg-[#F4BE2C]">
                                <input value={commentList[post._id]} onChange={e => add(e,post._id)} type="text" name="comment" placeholder="Add comment" className="w-full px-4 py-2 rounded-md  border-2 mr-2" />
                                <button className="rounded-lg bg-[#BF3312] px-5 py-3 my-5" onClick={e => addComment(e, post._id)}>Add</button>
                            </div>
                            { post.comment && 
                                post.comment.map(com => (
                                    <div className=" flex p-5 items-baseline rounded-lg bg-[#F4BE2C]">
                                        <div className="rounded-full bg-[#1B98F5] mx-2" >Avatar</div>
                                        <div className="mx-2 text-lg">{com.userName}</div>
                                        <div className="mx-2 text-base">{com.comment}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            ))}
            <ToastContainer/>
        </div>
        
    )
}

export default PostsList