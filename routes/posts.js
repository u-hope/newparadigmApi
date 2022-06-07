const router = require("express").Router();
const Post = require("../models/Post");


//Create Post
router.post("/", async (req, res)=>{
    const newPost =new Post(req.body);
    try{
        const savedPost = await newPost.save();
      res.status(200).json(savedPost);  
    } catch (err){
        res.status(500).json(err);
    }
});

//Update Post

router.put("/:id", async (req,res)=>{
      
        try{
            const post = await Post.findById(req.params.id);
            if(post.username === req.body.username){
                try{
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                        $set:req.body,    
                    }, { new: true});
                    res.status(200).json(updatedPost);
                } catch(err){
                    res.status(500).json(err);
                }
            } else{
                res.status(401).json("You can only update your post!");
            }
        } catch(err){
            res.status(500).json(err);
        }  
       
});

//Get All Posts

router.get("/",async (req,res)=>{
    const username = req.query.user;
    try{
        let posts;
        if(username){
            posts = await Post.find({username});
        } else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err){
        res.status(500).json(err);
    }
})

//Get Specific Post
router.get("/:id",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post); 
    }catch (err){
        res.status(404).json("Post Not Found!");
    }
});

//Delete Post
router.delete("/:id", async (req,res)=>{
    
        try{   
            await Post.findByIdAndDelete(req.params.id); 
            res.status(200).json("Post has been deleted");
        } catch(err){
            res.status(500).json(err);
        }
});





module.exports = router;