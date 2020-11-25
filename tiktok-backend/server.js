import express from "express"
import mongoose from "mongoose"
import data from "./data.js";
import Data from "./data.js";
import Videos from "./dbModel.js"
import cors from "cors"
//app config

const app = express();
const port = process.env.PORT || 9000  ;
app.use(express.json())
app.use(cors())




//middlwares


//db config

const conection_url="mongodb+srv://admin:xr3iWiBYsbR20ESu@cluster0.tgexn.mongodb.net/tiktok?retryWrites=true&w=majority"


mongoose.connect(conection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})


// api endpoints
app.get("/",(req,res)=>{
    res.status(200).send("hello juan")

});


app.get("/v1/post",(req,res)=>{
    res.status(200).send(data)
})

app.get("/v2/posts",(req,res)=>{
    Videos.find((err,data)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })
})


app.post("/v2/posts",(req,res)=>{

    const dbVideos=req.body;

    Videos.create(dbVideos,(err,data)=>{
        if (err) {
            err.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

//


//listen
app.listen(port,()=>{
    console.log("server iniciado")
})
