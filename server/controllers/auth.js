import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

/* REGISTER USER */
export const register = async (req,res)=>{ // req provides request body from front end, res provides us with result from backend
    try{
        const{
            firstName, 
            lastName,
            email,
            password,
            picturePath,
            friends, 
            location, 
            occupation
        } = req.body; // we're structuring parameters for the request body, ie send object with these params from FE 

        // encrypt password, save it, 
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, 
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends, 
            location, 
            occupation,
            viewedProfile: Math.floor(Math.random()*10000),
            impressions:Math.floor(Math.random()*10000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // send user status code of 201 to indicate something has been saved. FE receives this.
         
    } catch(err){
        res.status(500).json({error: err.message});
    }
}

/* LOGGIN IN */
export const login = async(req, res)=>{ // this is a callback accepting function - it accepts a callback function async
    try {
        const {email,password}=req.body; // grab email and pw when user tries to log in 
        const user = await User.findOne({email: email}); // use mongoose to try to find database entry that matches email, and store the user info in User
        if (!user) return res.status(400).json({msg:"User does not exist."});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid credentials"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});
    } catch(err){
        res.status(500).json({error: err.message})
    }
}