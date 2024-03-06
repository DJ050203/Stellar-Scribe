import "./posts.css"
import Post from "../post/Post";


export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts && posts.length > 0 ? (
        posts.map((p) => <Post post={p} />)
      ) : (
        <p>No posts available</p>
      )}
      </div>
     
    
  )
}
