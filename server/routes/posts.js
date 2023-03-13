import express from "express";
import{
    getFeedPosts, 
    getUserPosts, 
    likePost
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ 
router.get("/", verifyToken, getFeedPosts); // This grabs our user feed when we are on the home page
router.get("/:userId/posts", verifyToken, getUserPosts) // this grabs individual users posts

// UPDATE
router.patch("/:id/like", verifyToken, likePost); 

export default router;

