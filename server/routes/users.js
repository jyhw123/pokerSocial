import express from "express";

// we import the functions (ie the route handler/controller) we need to use
import{
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/:id", verifyToken, getUser); // if user is sending a particular userid, grab data from our database. also, if we use 2 handlers in our route, the middle one must have next() parameter
router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE 
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
 