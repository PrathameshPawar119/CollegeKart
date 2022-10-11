import mongoose from "mongoose";

const mongoUrl = "mongodb://localhost:27017/mynote2";

export default function connectToMongo(){
    mongoose.connect(mongoUrl, ()=>{
        console.log("Connected to Mongodb...");
    });  
}

