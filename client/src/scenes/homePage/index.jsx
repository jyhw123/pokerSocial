import { Box, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar"
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () =>{
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const {_id, picturePath}  = useSelector((state)=>state.user);
    console.log(`id is ${_id}`);


    return (<Box>
        <Navbar/>
        <Box
            width="100%"
            padding = "2rem 6%"
            display = {isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
            >
            {/* LEFT COLUMN */}
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}> 
                {/* userId and picturePath below are props, ie the arguments we are passing to the userWidget react function */}
                <UserWidget userId={_id} picturePath={picturePath}/> 
            </Box>
            {/* MIDDLE COLUMN */}            
            <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
                mt={isNonMobileScreens ? undefined : '2rem'}
                >
                <MyPostWidget picturePath={picturePath}/> 
                <PostsWidget userId ={_id}/>
            </Box>
            {/* RIGHT COLUMN */}
            {isNonMobileScreens && <Box flexBasis="26%">
                <FriendListWidget userId ={_id}/>
                
            </Box>}
        </Box>
    </Box>);

};

export default HomePage