import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignupPanelPage = () => {
  const navigate = useNavigate();
  const [errorRegister, setErrorRegister] = useState("");
  const [created, setCreated] = useState(false);
  const formik = useFormik({
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .max(50, "Email address is to long - should be 50 chars maximum")
        .required("Required"),
      password: Yup.string()
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .min(6)
        .required("Required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Invalid repeat password")
        .required("Required"),
    }),
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    onSubmit: (values) => {
      let user_data = {
        email: values.email,
        password: values.password,
        type: "OPERATOR",
      };
      api
        .post("/api/auth/register/", user_data)
        .then((res) => {
          setCreated(true);
        })
        .catch((error) => {
          console.log(error);
          setErrorRegister("Email address already exists");
        });
    },
  });

  return created ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant='h4'
        align='center'
        sx={{
          letterSpacing: 3,
          mt: 18,
          mb: 5,
          color: "primary.main",
          fontWeight: "medium",
        }}
      >
        WELCOME
      </Typography>
      <Typography
        variant='subtitle2'
        align='center'
        elevation={0}
        sx={{
          letterSpacing: 1,
          mb: 3,
          fontWeight: "medium",
          color: "primary.main",
        }}
      >
        Your account has been successfully created, select the login button if
        you want to login now
      </Typography>

      <Button
        variant='contained'
        sx={{ width: 120, height: 50 }}
        onClick={() => {
          navigate({ pathname: "/login_panel/" }, { replace: true });
        }}
      >
        Log in
      </Button>
    </Box>
  ) : (
    <>
      <Typography
        variant='h4'
        align='center'
        sx={{
          letterSpacing: 3,
          mt: 8,
          mb: 5,
          color: "primary.main",
          fontWeight: "medium",
        }}
      >
        SIGN UP
      </Typography>
      <Typography
        variant='subtitle2'
        align='center'
        elevation={0}
        sx={{
          letterSpacing: 1,
          mt: 1,
          mb: 1,
          fontWeight: "medium",
          color: "error.main",
        }}
      >
        {errorRegister}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          direction='column'
          spacing={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <TextField
            label='Email'
            variant='outlined'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label='Password'
            variant='outlined'
            type='password'
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            label='Confirm password'
            variant='outlined'
            type='password'
            name='rePassword'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            error={
              formik.touched.rePassword && Boolean(formik.errors.rePassword)
            }
            helperText={formik.touched.rePassword && formik.errors.rePassword}
          />
        </Stack>
        <Stack
          direction='row'
          spacing={10}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Button
            variant='contained'
            sx={{ width: 150, height: 60 }}
            type='submit'
          >
            Register
          </Button>

          <Box>
            <Typography
              variant='body2'
              align='center'
              sx={{
                color: "primary.main",
              }}
            >
              Have an account?
              <Button
                variant='text'
                sx={{ displey: "inline", pb: 0.8 }}
                onClick={() => {
                  navigate({ pathname: "/login_panel/" }, { replace: true });
                }}
              >
                Log in
              </Button>
            </Typography>
          </Box>
        </Stack>
      </form>
    </>
  );
};

export default SignupPanelPage;
