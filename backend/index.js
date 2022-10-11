import connectToMongo from "./DbConnect.js";
import multer from "multer";
connectToMongo();

import express  from "express";
import auth from './routes/auth.js'
import prods from './routes/prods.js'
import cors  from "cors";


const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());


// Using routes to define endpoints and calling them here
app.use('/api/auth', auth);
app.use('/api/prods', prods);




app.listen(port, ()=>{
    console.log("App running at http://localhost:5000");
})

