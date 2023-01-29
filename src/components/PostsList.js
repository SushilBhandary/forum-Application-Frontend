

const  PostsList = ({posts, setPosts}) => {
    const name = JSON.parse(localStorage.getItem("jwt")).user.name
    return (
        <div className="w-[75%] rounded-lg p-5 bg-[#D9D55B]">
            { posts && posts.map( post => (
                <div  key={post._id}>
                    <div className="rounded-lg py-5 px-8 bg-[#EDBF69]">
                        <div className="my-5 text-2xl" > <span className="rounded-full bg-[#1B98F5] ">Avartar</span>  {name} 
                        </div>
                        <div className="my-5 text-xl bg-[#fff] p-2 rounded-md">
                            {post.article}
                        </div>
                        <div className="my-5 flex flex-col ">
                            <h1 className="text-2xl ">Comments</h1>
                            <div className=" flex px-5 items-baseline rounded-lg bg-[#F4BE2C]">
                                <input type="text" name="comment" placeholder="Add comment" className="w-full px-4 py-2 rounded-md  border-2 mr-2" />
                                <button className="rounded-lg bg-[#BF3312] px-5 py-3 my-5">Add</button>
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
        </div>
        
    )
}

export default PostsList