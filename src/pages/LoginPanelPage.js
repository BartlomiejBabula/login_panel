import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthHeader } from "../api/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logInAction, getOperatorProfile } from "../actions/UserActions";

const LoginPanelPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorLogin, setErrorLogin] = useState("");
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
    }),
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      let loginData = {
        email: values.email,
        password: values.password,
      };

      api
        .post("/api/auth/login/", loginData)
        .then(async (res) => {
          const user_res = {
            email: values.email,
            password: values.password,
            ...res.data,
          };
          localStorage.setItem("refresh", res.data.refresh);
          localStorage.setItem("access", res.data.access);
          setAuthHeader(res.data.access);
          dispatch(logInAction(user_res));
          await dispatch(getOperatorProfile());
        })
        .catch((error) => {
          setErrorLogin("Incorrect email or password");
        });
    },
  });

  return (
    <>
      <Typography
        variant='h4'
        align='center'
        sx={{
          letterSpacing: 3,
          mt: 3,
          mb: 5,
          color: "primary.main",
          fontWeight: "medium",
        }}
      >
        LOG IN
      </Typography>
      <Stack
        direction='row'
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Button
          variant='outlined'
          size='large'
          sx={{ width: "50%" }}
          endIcon={<FacebookIcon />}
        >
          Continue with
        </Button>
        <Button
          variant='outlined'
          size='large'
          sx={{ width: "50%" }}
          endIcon={<GoogleIcon />}
        >
          Conitinue with
        </Button>
      </Stack>
      <Typography
        variant='h6'
        align='center'
        sx={{
          letterSpacing: 3,
          color: "primary.main",
        }}
      >
        OR
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
        {errorLogin}
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
        </Stack>
        <Button variant='text' sx={{ position: "absolute", right: 0, mr: 11 }}>
          Forgot password ?
        </Button>
        <Stack
          direction='row'
          spacing={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 8,
          }}
        >
          <Button
            variant='contained'
            type='submit'
            sx={{ width: 150, height: 60 }}
          >
            Login
          </Button>
          <Box>
            <Typography
              variant='body2'
              align='center'
              sx={{
                color: "primary.main",
              }}
            >
              Don't have an account?
              <Button
                variant='text'
                sx={{ displey: "inline", pb: 0.8 }}
                onClick={() => {
                  navigate({ pathname: "/signup" }, { replace: true });
                }}
              >
                Create
              </Button>
            </Typography>
          </Box>
        </Stack>
      </form>
    </>
  );
};

export default LoginPanelPage;
