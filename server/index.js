import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

app.use("/upload/profiles", express.static("uploads/profiles"));


app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect(databaseURL).then(() => {
    console.log("Database connected successfully..");
}).catch((err) =>{
    console.log(err.message);
}) 


app.get('/', (req, res) => {
    res.send("Hey there");
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})