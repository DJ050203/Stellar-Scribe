const express = require("express");
const app = express();
const mongoose = require("mongoose")
const authRoute = require("./routes/auth");
const UserRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require('cors');

app.use(cors({ origin: '*' }));

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect('mongodb://localhost:27017')
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
      },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
    
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", UserRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => console.log("Running"));