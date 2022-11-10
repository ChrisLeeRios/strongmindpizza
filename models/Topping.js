import mongoose from "mongoose";

const ToppingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 60,
    },
    // prices: {
    //     type: [Number],
    //     required: true,
    // },
},
    { timestamps: true }
);


export default mongoose.models.Topping ||
    mongoose.model("Topping", ToppingSchema)