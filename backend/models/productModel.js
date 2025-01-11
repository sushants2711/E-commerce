import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    subcategory: {
        type: String,
        required: true,
        trim: true
    },
    sizes: {
        type: Array,
        required: true,
        trim: true
    },
    bestseller: {
        type: Boolean
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Number, 
        required: true
    }
})
export default mongoose.models.product || mongoose.model("product", productSchema)

// export default mongoose.model("product", productSchema)