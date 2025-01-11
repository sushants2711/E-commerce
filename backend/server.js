import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDb } from "./config/mongodb.js";
import { connectCloudinary } from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

// dotenv configration
dotenv.config()

// app initialize
const app = express();

// connection between frontend and backend
app.use(cors())

// port initialize
const PORT = process.env.PORT || 5000

// database connected
connectDb();

// cloudinary connected
connectCloudinary()

// json data convertor
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// api endpoints 
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)

// server started 
app.listen(PORT, ()=> {
    console.log(`server started on http://localhost:${PORT}`)
})