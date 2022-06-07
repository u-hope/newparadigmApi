const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const announcementRoute = require("./routes/announcement");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/image",express.static(path.join(__dirname,"/image")))

mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

    const storage = multer.diskStorage({
        destination:(req,file,cb) => {
            cb(null,"image")
        },filename:(req,file,cb) =>{
            cb(null,req.body.name);
        },
    });

    const upload = multer({storage:storage});
    app.post("/api/upload",upload.single("file"),(req,res)=>{
        res.status(200).json("File has been Uploaded");
    })

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/announcement",announcementRoute);

app.listen("5000", ()=>{
    console.log("Backend is running");
});
// mongodb+srv://ermias:<password>@cluster0.i2jbv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb+srv://ermi:blackSoft22@blog.fpqzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority