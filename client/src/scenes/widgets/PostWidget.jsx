import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    buyIn,
    cashOut,
    hoursPlayed,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]); // checks if the current user has liked a post based on if the user id is in the likes map.
    const likeCount = Object.keys(likes).length;
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const medium = palette.neutral.medium;
    const primaryLight = palette.primary.light;

  
    const patchLike = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, { // postId is our req.params on controller side
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }), // userId of the liker is on req.body on our controller side
      });
      const updatedPost = await response.json(); // gets our updatedPost with new likes from backend
      dispatch(setPost({ post: updatedPost })); // update our global redux state with the new updatedPost
    };
  
    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location} 
          userPicturePath={userPicturePath}
        />
        <Box height="4.55rem" mt="1rem" bgcolor={primaryLight} borderRadius="7px" display= "flex" alignItems="center" justifyContent="center" sx={{}}>
            <Box mr="2rem">
                <Typography color={medium}>
                        Profit/Loss
                </Typography>
                <Typography color={primary} sx={{fontWeight:'bold', fontSize:"1.2rem"}}>
                        ${cashOut-buyIn}
                </Typography>
            </Box>
            <Box ml="2rem" display= "flex" alignItems="center" flexDirection="column">
                <Typography color={medium}>
                        Earnings per Hour
                </Typography>
                <Typography color={primary} sx={{fontWeight:'bold', fontSize:"1.2rem"}}>
                        ${parseFloat((cashOut-buyIn)/hoursPlayed).toFixed(2)}
                </Typography>
            </Box>

        </Box>
        <FlexBetween margin={"20px 5px"}>
            <Box width="1rem"></Box>

            <Box>
                <Typography color={medium}>
                    Buy In
                </Typography>
                <Typography color={main} sx={{}}>
                    ${buyIn}
                </Typography>
            </Box>
            <Divider orientation="vertical" flexItem/>
            <Box>
                <Typography color={medium}>
                    Cash Out
                </Typography>
                <Typography color={main} sx={{ }}>
                    ${cashOut}
                </Typography>
            </Box>
            <Divider orientation="vertical" flexItem/>
            <Box>
                <Typography color={medium}>
                    Hours Played
                </Typography>
                <Typography color={main} sx={{  }}>
                    {hoursPlayed} Hrs
                </Typography>
            </Box>
            <Box width="1rem"></Box>
        </FlexBetween>
        <Divider sx={{ margin: "0.75rem 0" }} />

        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;