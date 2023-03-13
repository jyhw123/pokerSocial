import User from "../models/User.js";

// READ
export const getUser = async(req,res)=>{
    try{
        const {id} = req.params; // req.params gets 
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

export const getUserFriends = async(req, res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById(id);
    
        const friends = await Promise.all( // multiple api calls
            user.friends.map((id)=> User.findById(id)) // user.friends refers to the array object from the user variable returned above
        );
    
        // since friends is a promise object, we convert it into a readable format (?)
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
                }
        );
        res.status(200).json(formattedFriends);
    } catch(err){
        res.status(404).json({message: err.message});
    }
};

// UPDATE

export const addRemoveFriend = async(req, res)=>{

    try{
        const{id, friendId}=req.params;
        const user = await User.findById(id); // we get a JSON file from DB (i think) where we have fields such as the friends array
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)){ // if we want to remove friends
            user.friends = user.friends.filter((id)=>id!==friendId); // keep all friends whose id do not match friendid
            friend.friends = friend.friends.filter((id)=>id!==id); // do the same for the other friend
        } else{ // if we want to add friends 
            user.friends.push(friendId);
            friend.friends.push(id);

        }
        // we have to save the entries, then we await on the promise that they return. 
        await user.save();
        await friend.save();

        // finally, we reuse the code from getuserfriends() in order to get the updated friend list. 
        const friends = await Promise.all( // multiple api calls
            user.friends.map((id)=> User.findById(id)) // user.friends refers to the array object from the user variable returned above
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
                }
        );
        res.status(200).json(formattedFriends);

    } catch(err){
        res.status(404).json({message: `${err.message}, friend to delete is ${friend}` });
    }
}


