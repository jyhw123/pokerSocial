import { Box } from "@mui/material";
import { styled } from "@mui/system";

// this allows us to reuse CSS properties.
// basically, when we use these tags in our react components, we are giving all components within these tags display flex and space between properties.
// ie everything within these tags will flex 
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

export default FlexBetween