import Header from "./Header"
import PostFunction from "./PostFunction"
import PostsList from "./PostsList"

const  PostPage = ({logout, posts, setPosts}) => {
  return (
    <div className="bg-[#CFFCE8] h-full" style={{ height: '100vh'}}>
      <Header logout={logout}/>
      <div className="flex mx-auto w-[95%] mt-8 p-5 justify-between">
        <PostFunction posts={posts} setPosts={setPosts}/>
        <PostsList  posts={posts} setPosts={setPosts}/>
      </div>
    </div>
  )
}

export default PostPage