import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik"; // Form library
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

// Theses 2 schemas below determines the shape of how the form library will save the info. 
// Yup helps us perform data validation for our forms (e.g only allow numbers, strings, no symbols etc).
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login"); // React hook to get pagetype state(login or register). setpagetype is the set function. "login" is default state.
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => { // this is called as await register(values, onsubmitprops) later on 
    // this allows us to send form info with image.
    // First we create a data structure (formdata) to store our new registration info
    const formData = new FormData(); // this is a JS API, allows us to construct set of key/value pairs representing form fields and their values 
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);


    const savedUserResponse = await fetch( // fetch API allows us to perform send/receive data from the server with get put post delete requests
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) { // if we successfully save, then set the page type to log in 
      setPageType("login");
    }
  };

  // This function takes our login details, posts it to the server to verify password, server passes us back all the user data
  // and then sets the redux state with all our user data from DB
  const login = async (values, onSubmitProps) => {
    // see server/controllers/auth.js to see login function
    // this fetch function below uses our defined routes from our express router. it verifies pw and spits data back
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json(); // this gets our user data from our backend containing all the user data, and the token. see server/controllers/auth.js
    onSubmitProps.resetForm();
    if (loggedIn) { // if our backend server correctly verifies the user and returns back all our user data...
      dispatch( // changing our global redux state for who our user is (access from navbar)
        setLogin({
          user: loggedIn.user, // we get this result in state/index.js, where we assign the new global state.user = action.payload.user.
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  // arguments values, onsubmitprops are from formik
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps); // if we are on the login page, then call the login function
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister} // inject different initial values to form based on if we are registering or loggin in
      validationSchema={isLogin ? loginSchema : registerSchema} // the schemas that dictate what info the form should accept and their valid conditions.
    >
      {({ // We are passing in these parameters to the arrow function so we can use them
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}> {/* in the bg, formik gets our handleFormSubmit*/}
          <Box 
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))" // split grid into 4 sections, minimum of 0 or split into fractions of 4
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },// any direct child of this box will get this property, ie if web device, then let each field be 2 units. if its mobile, let each field take up all 4 units.
            }} // 3hr07min
          >
            {isRegister && ( // if we are on the register page, put these components
              <> 
                <TextField // like an input component 
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName) // an error occurs if we have either touched first name or gotten an error
                  }
                  helperText={touched.firstName && errors.firstName} // shown the helper text. 
                  sx={{ gridColumn: "span 2" }} // this shares the same line with last name
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box // box to hold the dropzone
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                > 
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => // callback function for what to do if user drops some files
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} /> {/* This handles the user input */}
                        {!values.picture ? ( // if we have not received any picture...
                          <p>Add Picture Here</p>
                        ) : ( // if a picture has been received
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button // The login or register button 
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography // the button to switch between login or reigistratation 
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;