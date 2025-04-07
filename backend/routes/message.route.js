
import express from "express"
import { protectRoute } from "../middleware/protectRoute.js";
import { getMessages, getUsersForSidebar, sendMessages } from "../controller/message.controller.js";


const router = express.Router()

router.get("/users",protectRoute, getUsersForSidebar)
router.get("/:id",protectRoute,getMessages)

router.post("/send/:id",protectRoute, sendMessages)

export default router;