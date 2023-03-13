import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
        {/* Logo banner on top*/}
        <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%" // padding 
        textAlign="center"
        >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
            Poker Social
        </Typography>
        </Box>

        {/* Box for form */}
        <Box
            width={isNonMobileScreens ? "50%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
        >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to Poker Social, the Social Media Site for Poker Players!
        </Typography>
        <Form />
        </Box>
    </Box>
  );
};

export default LoginPage;