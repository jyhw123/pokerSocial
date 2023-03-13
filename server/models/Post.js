import mongoose from "mongoose";

// This is the DB schema to store information about users posts
const postSchema = mongoose.Schema(
    {
        userId: {
          type: String,
          required: true,
        },
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
          type: Map, // similar to a dictionary. faster access time than array so we use it here. 
          of: Boolean, // keys are all the ids of the friends who've liked it, and true or false depending if they like 
        },
        comments: {
          type: Array,
          default: [],
        },
        buyIn: {
          type:String,
          default:"0"
        },
        cashOut:{
          type:String,
          default:"0"
        },
        hoursPlayed:{
          type:String,
          default:"0"
        },
      },
      { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
