import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Posts from "../../components/posts/Posts";
import Sideebar from "../../components/sidebar/Sideebar";
import "./home.css"
import { Context } from "../../context/Context";
import axios from "axios";
import { useLocation } from "react-router";

  
export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      // const res = await axios.get("http://localhost:5000/api/posts");

      const res = await axios.get("/posts"+search);
      //setPosts(res.data);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
  
      <Posts posts={ posts } />
        {/* <Sideebar /> */}
      </div>
    </>
  )
}
