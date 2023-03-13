import { createSlice } from "@reduxjs/toolkit";

// this data is accessible throughout the app globally and we can access it anytime we want
// redux toolkit is a state management library

// can think of reducers as functions that modify the global state
const initialState = {
    mode: "light",
    user: null, // this user data contains everything including name, friends list, location, occupuation, picture etc...
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setMode: (state)=>{
            state.mode = state.mode ==='light'? "dark" : "light"; // if its light, change to dark, and vice versa
        },
        setLogin: (state, action) => { // state, action are 'payloads' or params for the function
            // when a particular user logs in, the app dispatches an action with a login type and a payload containing the user data and token
            // our reducer function takes this info in and returns the new global state.
            state.user = action.payload.user; 
            state.token = action.payload.token;
        },
        setLogout: (state)=>{ // run this when we log out
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user){
                state.user.friends = action.payload.friends;
            } else {
                console.error("user firedns non-existent :(")
            }
        },
        setPosts: (state, action)=>{
            state.posts = action.payload.posts;
        },
        setPost: (state, action)=>{
            const updatedPosts = state.posts.map((post)=>{ // grab list of posts from our global state and iterate through them
                // if the post._id in the list matches the current post_id of the action payload that we are dispatching to this reducer,
                // return the relevant post that we want, ie the updated post that we changed, coming from backend. 
                if (post._id === action.payload.post._id) return action.payload.post; 
                return post;
            });
            state.posts = updatedPosts;
        }
    
    }
})

export const {
    setMode,
    setLogin,
    setLogout,
    setFriends,
    setPosts,
    setPost
} = authSlice.actions;

export default authSlice.reducer;