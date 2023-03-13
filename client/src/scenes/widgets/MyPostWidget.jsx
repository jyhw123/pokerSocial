import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "state";
  
  const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false); // has person pressed the button to upload a pic
    const [image, setImage] = useState(null); // image to use if one was dropped
    const [post, setPost] = useState(""); // the post content
    const [buyIn, setBuyIn] = useState("");
    const [cashOut, setCashOut] = useState("");
    const [hoursPlayed, setHoursPlayed] = useState("");

    const { palette } = useTheme(); 
    const { _id } = useSelector((state) => state.user); // grab our user id from our redux state, to send to backend so we know whos posting
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  
    const handlePost = async () => {
        // create the form data structure to send to our posts router in server/index.js
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        formData.append("buyIn", buyIn)
        formData.append("cashOut", cashOut)
        formData.append("hoursPlayed", hoursPlayed)

        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
    
        // this sends our new post data to the back end via our express router. the router then sends it to the createPost controller.
        // our createPost controller takes in our post info, creates a new entry in the post database, then gets and returns updated lists of posts
        const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json(); // back end returns list of updated posts
        dispatch(setPosts({ posts })); // dispatches an action to let our redux setPosts reducer know we have made a post and to update the global state
        setImage(null);
        setPost("");
        setBuyIn("");
        setCashOut("");
        setHoursPlayed("");
    };
  
    return (
      <WidgetWrapper>
        <FlexBetween gap="1.5rem">
          <UserImage image={picturePath} />
          <InputBase
            placeholder="How did your last game go?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && ( // if an image is added, include a delete button
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
        <Divider sx={{ margin: "1.25rem 0" }} />

        <FlexBetween gap="1.5rem">
            <InputBase
                placeholder="Buy In"
                onChange={(e) => setBuyIn(e.target.value)}
                value={buyIn}
                sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "0.5rem 1rem",
                flex:1
            }}
            />
            <InputBase
                placeholder="Cash Out"
                onChange={(e) => setCashOut(e.target.value)}
                value={cashOut}
                sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "0.5rem 1rem",
                flex:1
            }}
            />
            <InputBase
                placeholder="Hours Played"
                onChange={(e) => setHoursPlayed(e.target.value)}
                value={hoursPlayed}
                sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "0.5rem 1rem",
                flex: 1
            }}
            />
        </FlexBetween>

        <Divider sx={{ margin: "1.25rem 0" }} />
  
        {/* Icons below the post */}
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>
  
          {isNonMobileScreens ? (
            <>
              <FlexBetween gap="0.25rem">
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Clip</Typography>
              </FlexBetween>
  
              <FlexBetween gap="0.25rem">
                <AttachFileOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Attachment</Typography>
              </FlexBetween>
  
              <FlexBetween gap="0.25rem">
                <MicOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Audio</Typography>
              </FlexBetween>
            </>
          ) : (
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          )}
  
        {/* Button to submit */}
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default MyPostWidget;