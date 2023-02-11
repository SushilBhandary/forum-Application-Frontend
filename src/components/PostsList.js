import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import API from "./api";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FaRegCommentAlt, FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";


const  PostsList = ({posts, setPosts, isMyPost}) => {
    // const name = JSON.parse(localStorage.getItem("jwt")).user.name
    // const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState({})
    const [open, setOpen] = useState(false);
    const [article, setArticle] = useState('')
    const [id, setId] = useState('')
    const [showComment, setShowComment] = useState({})
    const [showLike, setShowLike] = useState({})

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

    const toShowComment = (id) => {
        showComment[id] = !showComment[id]
        setShowComment({...showComment})
    }

    const toShowLike = (id) => {
        showLike[id] = !showLike[id]
        setShowLike({...showLike})
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
        console.log(data.user.name);
        await axios.post(`${API}/add-comments/${id}`, {
        name : data.user.name,
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
                console.log("commentList befour--->",commentList);
                let a = {}
                setCommentList({...a})
                console.log("commentList after--->",commentList);
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
        .catch(e => toast.warn('Some thing went wrong', {
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

    const editPost = async (e) => {
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
            setOpen(false)
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

    const onEdit = (e, id, article) => {
        setOpen(true);
        setId(id)
        setArticle(article)
    }

    return (
        <div className="md:w-[75%] md-[90%] m-auto md:m-1 rounded-lg md:p-5 p-1 bg-amber-100">
            <Popup open={open}  modal nested>
                <form className=" text-lg container p-8 space-y-6 rounded-md shadow bg-gradient-to-r from-[#833ab4] to-[#1dc0fd]">
                    <button className="btn btn-circle absolute  top-0 right-0 mt-2 mr-2"  onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <h2 className="w-full text-3xl font-bold leading-tight">Edit Post</h2>
                    <div>
                        <label className="block mb-1 ml-1">Post</label>
                        <textarea value={article} onChange={e => setArticle(e.target.value)} rows={5} placeholder="Post / Article" className="block w-full p-2 rounded border-2 bg-[#8de0ff]" />
                    </div>
                    <div className="text-right">
                        <button onClick={e => editPost(e)}  className=" px-4 py-2 font-bold rounded shadow text-white bg-blue-500 focus:outline-none hover:bg-blue-600 ">Update Post</button>
                    </div>
                </form>
            </Popup> 
            { posts && posts.map( post => (
                <div  key={post._id} className="my-2 bg-amber-200 rounded-lg ">
                    { isMyPost && (
                        <div className="flex justify-around">
                            <button onClick={e => onEdit(e, post._id, post.article)} className="rounded-lg bg-[#EB7B54] px-5 py-3 mt-2">Edit</button>
                            <button onClick={e => deletPost(e, post._id)}  className="rounded-lg bg-[#fe2054] px-5 py-3 mt-2">delete</button>
                        </div>
                    ) }
                    <div className="rounded-lg py-5 md:px-8 px-2 ">
                        <div className="my-5 text-2xl flex items-center" > 
                            <span class="relative w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex justify-center items-center text-center p-5 shadow-xl mr-4">
                                {post.createdByName[0]}
                            </span>
                            {post.createdByName} 
                        </div>
                        <div className="my-5 text-xl bg-[#fff] p-2 rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
                            {post.article}
                        </div>
                        <div className="flex justify-around">
                            <FaRegCommentAlt onClick={e => toShowComment( post._id)} size={42}/>
                            {  showLike[post._id] ? (
                                
                                <FaThumbsUp size={42}  onClick={e => toShowLike( post._id)}/>
                            ) : (
                                <FaRegThumbsUp size={42} onClick={e => toShowLike( post._id)}/>
                            )}
                            {/* <div>hi :{showComment[post._id]}</div>  */}
                        </div>
                        { showComment[post._id] ? (
                            <div className="bg-yellow-300 px-2 rounded-lg">
                                <div className="my-5 flex flex-col ">
                                    <h1 className="text-2xl ">Comments</h1>
                                    <div className=" flex px-5 items-baseline bg-yellow-300">
                                        <input value={commentList[post._id]} onChange={e => add(e,post._id)} type="text" name="comment" placeholder="Add comment" className="w-full px-4 py-2 rounded-md  border-2 mr-2 bg-amber-100" />
                                        <button className="rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 px-5 py-3 my-5" onClick={e => addComment(e, post._id)}>Add</button>
                                    </div>
                                    { post.comment && 
                                        post.comment.map(com => (
                                            <div className=" flex p-5 items-baseline rounded-lg bg-yellow-300 ">
                                                <div class="relative w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex justify-center items-center text-center p-5 shadow-xl mr-4">
                                                    {com.userName[0]}
                                                </div> 
                                                <div className="mx-2 text-lg">{com.userName}</div>
                                                <div className="mx-2 text-base bg-amber-100 px-2 py-1 rounded-lg ">{com.comment}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                        
                        
                    </div>
                </div>
            ))}
            <ToastContainer/>
        </div>
        
    )
}

export default PostsList
