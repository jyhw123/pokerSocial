import mongoose from "mongoose";

// Create  a new mongoose schema that maps to a mongoDB collection and defines the format of documents in that collection
const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName:{
            type:String,
            required: true,
            min: 2,
            max: 50,
        },
        email:{
            type:String,
            required: true,
            max: 50,
            unique: true
        },
        password:{
            type:String,
            required: true,
            min: 2,
            max: 50,
        },
        picturePath:{
            type:String,
            default:""
        },
        friends:{
            type:Array,
            default:[]
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    }, 
    {timestamps: true}
);

// Create the schema then pass it into mongoose.model
const User = mongoose.model("User", UserSchema );
export default User;
