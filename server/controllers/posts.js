import Post from "../models/Post.js";
import User from "../models/User.js"

// CREATE 
// Creates a new post by a user
export const createPost = async( req, res)=>{
    try{
        const { userId, description, picturePath, buyIn, cashOut, hoursPlayed } = req.body; // front end will send this to us - id, post description ie caption and pic path
        const user = await User.findById(userId); // get user data from database
        const newPost = new Post({ // makes new entry to the post table
          userId,
          firstName: user.firstName,
          lastName: user.lastName,
          location: user.location,
          description,
          userPicturePath: user.picturePath,
          picturePath,
          likes: {},
          comments: [],
          buyIn,
          cashOut,
          hoursPlayed,
        });
        // wait for the post to be saved to mongodb
        await newPost.save();
    
        // gets ALL posts from DB in order to populate main feed with the newest posts
        const post = await Post.find();
        console.log(post);
        res.status(201).json(post);
    } catch(err){
        res.status(409).json({message: err.message});
    }
}

// READ
export const getFeedPosts = async (req, res) => {
    try {
      console.log("are we here?");
      const post = await Post.find(); // get all posts from DB
      res.status(200).json(post); // send to FE
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  
export const getUserPosts = async (req, res) => {
  try {
    console.log("are we heere");
    const { userId } = req.params;
    const post = await Post.find({ userId }); // get all the posts belonging to a certain user
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE 
export const likePost = async (req, res) => {
    try {
      const { id } = req.params; // this is the id of the post we want to like
      const { userId } = req.body; // the userid of the liker 
      const post = await Post.findById(id); // each post has an ID created by mongoose, not by us 
      const isLiked = post.likes.get(userId); // this checks if the liker's id is already within the liked map of the post
  
      if (isLiked) { // if the user has already liked it..
        post.likes.delete(userId);
      } else { // if the user has not liked it yet
        post.likes.set(userId, true); // this is the syntax to add to a js map/dict
      }
  
      // this is where we update the post with the new likes map. we receive the updated post back. 
      const updatedPost = await Post.findByIdAndUpdate(
        id, // the id we want to find the post by
        { likes: post.likes }, // the fields that we want to update
        { new: true }
      );
  
      res.status(200).json(updatedPost); // pass updated post to FE 
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };