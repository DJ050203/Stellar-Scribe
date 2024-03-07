const router = require("express").Router();
const User = require("../models/Users");
const Post = require("../models/Post");
const OpenAI = require('openai');
const openai = new OpenAI({apiKey:'yourKey'});



router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });



  // router.delete("/:id", async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  //     if (post.username === req.body.username) {
  //       try {
  //         await post.delete();
  //         res.status(200).json("Post has been deleted...");
  //       } catch (err) {
  //         res.status(500).json(err);
  //       }
  //     } else {
  //       res.status(401).json("You can delete only your post!");
  //     }
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });

  router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      
      if (!post) {
        return res.status(404).json("Post not found");
      }
  
      if (post.username === req.body.username) {
        try {
          await Post.findByIdAndDelete(req.params.id);
          return res.status(200).json("Post has been deleted...");
        } catch (err) {
          console.error(err); // Log the error
          return res.status(500).json("Error deleting post");
        }
      } else {
        return res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      console.error(err); // Log the error
      return res.status(500).json("Error finding post");
    }
  });

//get

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
router.post('/summarize', async (req, res) => {
  try {
    const { text } = req.body;
    const messages = [{ role: 'system', content: text }];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages, 
      temperature: 0,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    
    if (response &&  response.choices) {
      res.json({ summary: response.choices[0].message });
      
    } else {
      res.status(500).json({ error: 'Invalid response from OpenAI API' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
  
  module.exports = router;
