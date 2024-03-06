import axios from "axios";
import OpenAI from "openai";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./singlePost.css"
import { Context } from "../../context/Context";
import { useLocation } from "react-router";


export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [summary, setSummary] = useState("");
  

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);
  console.log(path)

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  const handleSummarize = async () => {
    const response = await axios.post('/posts/summarize', { text: post.desc });
    setSummary(response.data.summary.content);
  };



  return (
    <div className="singlePost">
    <div className="singlePostWrapper">
    {post.photo && (
    <img
          className="singlePostImg"
          
          src={PF + post.photo}
          alt=""
        />)}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
        <h1 className="singlePostTitle">
        {title}
        {post.username === user.username &&(
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"  onClick={() => setUpdateMode(true)}></i>
            <i className="singlePostIcon far fa-trash-alt"
             onClick={handleDelete}></i>
          </div>
        )}
        </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
            <b> {post.username}</b>
            </Link>
             
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
          </div>
          {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc" dangerouslySetInnerHTML={{ __html: post.desc }}></p>


        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
        <button className="singlePostButton" onClick={handleSummarize}>Summary</button>
        <p dangerouslySetInnerHTML={{__html: summary}}></p>
       
    </div>  
    </div>
  );
}          