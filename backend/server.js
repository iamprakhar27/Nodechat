
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import { connectDB } from './db/db.js'
import { app,server } from './lib/socket.js';


dotenv.config();

const PORT = 5000 || process.env.PORT;

app.use(express.json({ limit: "3mb" }));  
app.use(express.urlencoded({ limit: "3mb", extended: true })); 
app.use(bodyParser.json({ limit: "3mb" }));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

connectDB();

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes)



server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});