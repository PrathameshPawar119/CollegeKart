import mongoose from "mongoose";

const ProdSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //foreign key,
        ref: "user"
    },
    image:{
        Data: Buffer,
        ContentType: String
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('prod', ProdSchema);