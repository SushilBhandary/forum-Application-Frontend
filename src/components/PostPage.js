import Header from "./Header"
import PostFunction from "./PostFunction"
import PostsList from "./PostsList"
import { useState } from "react"

const  PostPage = ({logout, posts, setPosts}) => {
  const [isMyPost, setIsMyPost] = useState(false)
  return (
    <div className="bg-amber-50  " >
      <Header logout={logout}/>
      <div className="flex mx-auto w-[95%] mt-8 md:p-5 justify-between items-start flex-col md:flex-row">
        <PostFunction posts={posts} setPosts={setPosts} setIsMyPost={setIsMyPost}/>
        <PostsList  posts={posts} setPosts={setPosts} isMyPost={isMyPost}/>
      </div> 
    </div>
  )
}

export default PostPage