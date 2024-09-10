import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import http from "http"; // Import the http module
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js"; // Assuming setupSocket is defined correctly

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);

mongoose.connect(databaseURL).then(() => {
    console.log("Database connected successfully..");
}).catch((err) => {
    console.log(err.message);
});

app.get('/', (req, res) => {
    res.send("Hey there");
});

// Create an HTTP server and wrap the Express app
const server = http.createServer(app);

// Set up the socket
setupSocket(server);

// Start listening on the specified port
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
