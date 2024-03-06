import React, { useContext,useState } from 'react';
import "./write.css";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { Context } from "../../context/Context";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';






export default function Write() {
  
//
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const { user } = useContext(Context);
  // const [value, setValue] = useState(state?.content || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

//
  const [content, setContent] = useState('');
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ header: 1 }, { header: 2 }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }],
      [{ font: ["Times-New-Ro"] }],
      [{ align: [] }],
      ["clean"],
    ],
  };
  

  return (
    <>


    <div className="write">

    {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }}  onChange={(e) => setFile(e.target.files[0])} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          {/* <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea> */}

            <ReactQuill
              className="editor"
              theme="snow"
              placeholder="Tell your story..."
              value={desc}
              onChange={setDesc}
              modules={modules}
            />
        </div>
        <div className="item">
        <label className="label">Categories:</label>
            <div className="cat">
              <input type="radio" name="category" value="Science" onChange={() => setCategories(["Science"])} />
              <label>Sceince</label>
            </div >
            <div className="cat">
            <input type="radio" name="category" value="Tech" onChange={() => setCategories(["Tech"])} />
              <label>Tech</label>
            </div>
            <div className="cat">
            <input type="radio" name="category" value="Travel" onChange={() => setCategories(["Travel"])} />
              <label>Travel</label>
            </div>
            <div className="cat">
            <input type="radio" name="category" value="Life Style" onChange={() => setCategories(["Life Style"])} />
              <label>Life Style</label>
            </div>
            <div className="cat">
            <input type="radio" name="category" value="Art" onChange={() => setCategories(["Art"])} />
              <label>Art</label>
            </div>
            <div className="cat">
            <input type="radio" name="category" value="Music" onChange={() => setCategories(["Music"])} />
              <label>Music</label>
            </div>
            </div>
            
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
    
      
        
    </>
  );
}