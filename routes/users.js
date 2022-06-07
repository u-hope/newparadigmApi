const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//Register

router.put("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,    
            });
            res.status(200).json(updatedUser);
        } catch(err){
            res.status(500).json(err);
        }
    } else{
        res.status(401).json("You can only update your account!");
    }
   
});

//Delete
router.delete("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id){
       
        try{   
            await User.findByIdAndDelete(req.params.id); 
            res.status(200).json("user had been deleted");
        } catch(err){
            res.status(500).json(err);
        }
    } else{
        res.status(401).json("You can only delete your account!");
    }
   
});

//Get User
router.get("/:id",async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others); 
    }catch (err){
        res.status(404).json("User Not Found!");
    }
})




module.exports = router;