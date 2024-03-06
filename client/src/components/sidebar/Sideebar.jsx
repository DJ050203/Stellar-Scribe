import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./sidebar.css"

export default function Sideebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sideTitle">ABOUT ME</span>
        <img src="https://imgs.search.brave.com/HTUyKk8Vb_9hSWmylY1BXPS4eO5MdJpnjz-4Mx69OFY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMzEzNS8zMTM1/NzE1LnBuZw" alt=""/>
        <p>Lorem ipsum dolor, 
          sit amet consectetur adipisicing 
          elit.</p>
      </div>
      <div className="sidebarItem">
      <span className="sideTitle">CATEGORIES</span>
      <ul className="sidebarList">
      {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
          
      </ul>
      </div>
      <div className="sidebarItem">
      <span className="sideTitle">FOLLOW US</span>
      <div className="sidebarSocial">
            <i className="sidebarIcon fa-brands fa-facebook-f"></i>
            <i className="sidebarIcon fa-brands fa-x-twitter"></i>
            <i className="sidebarIcon fa-brands fa-instagram"></i>
            <i className="sidebarIcon fa-regular fa-envelope"></i>
      </div>
      </div>
    </div>
  )
}
