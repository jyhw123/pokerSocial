import { useState } from "react";
import {
    Box, 
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material";
import{
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch, useSelector} from "react-redux";
import { setMode, setLogout} from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () =>{
    // Hooks (both local react hooks and global redux hooks) to decide if mobile menu should be shown (small screens only), etc.
    // Hooks should always be used at the top level of the react function components. 
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false); // local react hook. syntax for useState is always [someState, setSomeState]
    const dispatch = useDispatch(); // redux hook that returns a reference to the dispatch function from redux store. essentially, lets you dispatch an action to make a change to redux store
    const navigate = useNavigate(); // this hook lets you navigate to a specific URL, or back/front pages.
    const user = useSelector((state)=> state.user); // this redux hook grabs our user state from redux store
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme(); // this hook accesses our themes declared in theme.js. It uses the theme declared in app.js.
    const neutralLight = theme.palette.neutral.light; 
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt; 

    const fullName = `${user.firstName} ${user.lastName}`;
    //const fullName = "Julian Yap";


    return(
        // This element below flexes the logo/search flexbox and navigation icons flexbox
        <FlexBetween padding="1rem 6%" backgroundColor ={alt}> 
            {/* This element below flexes the logo and search bar*/}
            <FlexBetween gap="1.75rem">
                <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)" 
                color="primary"
                onClick={() => navigate("/home")}
                sx={{
                    // This is how you add CSS properties 
                    "&:hover": {
                    color: primaryLight,
                    cursor: "pointer",
                    },
                }}
                >
                    Poker Social
                </Typography>
                {/* This (condition) && (item to render) notation below simply means
                render the search bar with icon if isNonMobileScreens == true */}
                {isNonMobileScreens &&( 
                    <FlexBetween // This flexes the search bar and search icon 
                        backgroundColor={neutralLight} 
                        borderRadius='9px' 
                        gap ='3rem' 
                        padding="0.1rem 1.5rem"
                        >
                        <InputBase placeholder="Search..."/>
                        <IconButton>
                            <Search/>
                        </IconButton>

                    </FlexBetween>
                )}
            </FlexBetween>

            {/* DESKTOP NAV -- This element flexes the icons in the navigation icons flexbox */}
            {isNonMobileScreens ? ( // If we are using a desktop -> show whole navigation bar
            <FlexBetween gap="2rem">
                {/* UI Components can only affect the redux store via dispatching actions 
                By adding an action/reducer(?) as an argument to the dispatch variable, we 
                can change the store state. Here, can change the light and dark mode state.
                */}
                <IconButton onClick={()=>dispatch(setMode())}>
                    {theme.palette.mode === "dark"?(
                        <DarkMode sx={{ fontSize:"25px"}}/>
                    ):(
                        <LightMode sx={{ color: dark, fontSize:"25px"}}/>
                    )}
                </IconButton>
                <Message sx={{ fontSize:"25px"}}/>
                <Notifications sx={{ fontSize:"25px"}}/>
                <Help sx={{ fontSize:"25px"}}/>
                <FormControl variant="standard" value = {fullName}>
                    <Select
                        value={fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width:"150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root":{
                                pr:"0.25rem",
                                width:"3rem"
                            }, 
                            "& .MuiSelect-select: focus":{
                                backgroundColor: neutralLight
                            }
                        }}
                        input = {<InputBase />}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        {/* Below is how you trigger REDUX hooks */}
                        <MenuItem onClick={()=> dispatch(setLogout())}>Log Out</MenuItem>
                    </Select> 
                </FormControl>
            </FlexBetween>
            ) : ( // If we are using a mobile device -> show only menu button. 
                // Below is how you trigger REACT hooks. 
            <IconButton onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <Menu />
            </IconButton>)}

            {/* MOBILE NAV -- appears if we are on mobile device, and we click the menu icon*/}
            {!isNonMobileScreens && isMobileMenuToggled &&(
                // This box contains all the menu icons
                <Box
                    position="fixed" 
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10" 
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                >
                {/* CLOSE ICON */}
                <Box display="flex" justifyContent="flex-end" p="1rem">
                    <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                    <Close />
                    </IconButton>
                </Box>
        
                {/* MENU ITEMS */}
                <FlexBetween
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap="3rem"
                >
                    <IconButton
                    onClick={() => dispatch(setMode())}
                    sx={{ fontSize: "25px" }}
                    >
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard" value={fullName}>
                    <Select
                        value={fullName}
                        sx={{
                        backgroundColor: neutralLight,
                        width: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root": {
                            pr: "0.25rem",
                            width: "3rem",
                        },
                        "& .MuiSelect-select:focus": {
                            backgroundColor: neutralLight,
                        },
                        }}
                        input={<InputBase />}
                    >
                        <MenuItem value={fullName}>
                        <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}>
                        Log Out
                        </MenuItem>
                    </Select>
                    </FormControl>
                </FlexBetween>
                </Box>
            )}
        </FlexBetween> 
    );
};


export default Navbar