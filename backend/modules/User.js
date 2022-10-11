import mongoose from "mongoose";
// import { validate } from "uuid";

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        // validate(value){
        //     if(!value.match(/\d/) || !value.match(/[a-zA-Z]/)){
        //         throw new Error("Password must contain both numbers and Alphabets");
        //     }
        // }
    },
    date:{
        type: Date,
        default: Date.now
    }

})

const user =  mongoose.model('user', UserSchema);
user.createIndexes();

export default user;