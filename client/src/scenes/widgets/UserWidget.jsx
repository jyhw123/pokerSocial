import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "components/UserImage"; // we can only do this thanks for our jsconfig.js file
  import FlexBetween from "components/FlexBetween";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";

  // REACT COMPONENT (arguments of a react function are called props. these props are passed in the homepage)
  const UserWidget = ({ userId, picturePath }) => {  
    const [user, setUser] = useState(null); // react hook
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token); // redux hook
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
  
    // API call to get our mongodb database info!! 
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    };
  
    useEffect(() => { // this hook allows us to handle side-effects (ie code that could fail) without affecting the react components rendeirng.
      getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    if (!user) { // if no user, do not return the user widget
      return null;
    }
  
    const { // grab our user data from our API request to the backend via getUser()
      firstName,
      lastName,
      location,
      occupation,
      viewedProfile,
      impressions,
      friends,
    } = user;
  
    return (
        // this widgetwrapper wraps the whole profile widget on the left
        <WidgetWrapper> 
            {/* FIRST ROW */}
            <FlexBetween // BASICALLY just give all the components inside these tags 'display: flex' and 'justify-content: space-between'
            gap="0.5rem"
            pb="1.1rem"
            onClick={() => navigate(`/profile/${userId}`)} // clicking on the profile widget brings you to your profile
            >
                <FlexBetween gap="1rem"> {/* This flex between box gives us a box that contains the user image and another box*/}
                    <UserImage image={picturePath} />
                    <Box>
                    <Typography
                        variant="h4"
                        color={dark}
                        fontWeight="500"
                        sx={{
                        "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer",
                        },
                        }}
                    >
                        {firstName} {lastName}
                    </Typography>
                    <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />

            {/* SECOND ROW */}
            <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                <Typography color={medium}>{location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
                <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                <Typography color={medium}>{occupation}</Typography>
            </Box>
            </Box>

            <Divider />

            {/* THIRD ROW */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Who's viewed your profile</Typography>
                    <Typography color={main} fontWeight="500">
                    {viewedProfile}
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>Impressions of your post</Typography>
                    <Typography color={main} fontWeight="500">
                    {impressions}
                    </Typography>
                </FlexBetween>
            </Box>

            <Divider />

            {/* FOURTH ROW */}
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>

                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                    <img src="../assets/twitter.png" alt="twitter" />
                    <Box>
                        <Typography color={main} fontWeight="500">
                        Twitter
                        </Typography>
                        <Typography color={medium}>Social Network</Typography>
                    </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                            Linkedin
                            </Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
            </Box>
        </WidgetWrapper>
        );
    };
  
  export default UserWidget;