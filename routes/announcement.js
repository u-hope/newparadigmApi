const router = require("express").Router();
const Announcement = require("../models/Announcement");


//Create Announcement
router.post("/", async (req, res)=>{
    const newAnnouncement =new Announcement(req.body);
    try{
        const savedAnnouncement = await newAnnouncement.save();
      res.status(200).json(savedAnnouncement);  
    } catch (err){
        res.status(500).json(err);
    }
});

//Update Announcement

router.put("/:id", async (req,res)=>{
      
        try{
            const announcement = await Announcement.findById(req.params.id);
            if(post.username === req.body.username){
                try{
                    const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.params.id,{
                        $set:req.body,    
                    }, { new: true});
                    res.status(200).json(updatedAnnouncement);
                } catch(err){
                    res.status(500).json(err);
                }
            } else{
                res.status(401).json("You can only update your Announcement!");
            }
        } catch(err){
            res.status(500).json(err);
        }  
       
});

//Get All Announcements

router.get("/",async (req,res)=>{
    const username = req.query.user;
    try{
        let announcements;
        if(username){
            announcements = await Announcement.find({username});
        } else{
            announcements = await Announcement.find();
        }
        res.status(200).json(announcements);
    } catch (err){
        res.status(500).json(err);
    }
})

//Get Specific Announcement
router.get("/:id",async (req,res)=>{
    try{
        const announcement = await Announcement.findById(req.params.id);
        res.status(200).json(announcement); 
    }catch (err){
        res.status(404).json("Announcement Not Found!");
    }
});

//Delete Announcement
router.delete("/:id", async (req,res)=>{
    
        try{   
            await Announcement.findByIdAndDelete(req.params.id); 
            res.status(200).json("Announcement has been deleted");
        } catch(err){
            res.status(500).json(err);
        }
});





module.exports = router;