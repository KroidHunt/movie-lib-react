import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { userSignIn, userSignUp } from "../../redux/actions/userLoginActions";
import { useDispatch, useSelector } from "react-redux";
import AutoHideAlert from "../common/alert";
import Redirect from "../common/redirect";

const UserLogin = () => {
  const dispatch = useDispatch();
  const signInErr = useSelector((state) => state.user.sign_in_error);
  const signInErrCount = useSelector((state) => state.user.sign_in_error_count);
  const [signInWarn, setSignInWarn] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState("signin");

  React.useEffect(() => {
    if (signInErr && signInErr.length > 0) {
      setOpen(true);
    }
  }, [signInErr, signInErrCount]);

  const handleMode = () => {
    setMode((prev) => {
      if (prev === "signin") return "signup";
      return "signin";
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    const confirmpassword = data.get("confirmpassword");
    const email = data.get("email");
    const firstname = data.get("firstname");
    const lastname = data.get("lastname");

    if (mode === "signup") {
      if (password !== confirmpassword) {
        setSignInWarn("Password doesn't match");
        setOpen(true);
        return;
      }
      if (!username || !password || !email || !firstname) {
        setSignInWarn("Please fill in all required fields");
        setOpen(true);
        return;
      }
    } else {
      if (!username || !password) {
        setSignInWarn("Username and Password are required");
        setOpen(true);
        return;
      }
    }

    setSignInWarn(null);
    if (mode === "signin") {
      dispatch(
        userSignIn({
          username: data.get("username"),
          password: data.get("password"),
        })
      );
    } else {
      dispatch(
        userSignUp({
          username,
          password,
          email,
          firstname,
          lastname,
        })
      );
    }
  };

  return (
    <Redirect ifSignedIn={true} to="/home">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <TheaterComedyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {mode === "signin" ? "Sign in" : "Sign Up"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {mode === "signup" ? (
              <React.Fragment>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  autoComplete="firstname"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lastname"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
              </React.Fragment>
            ) : null}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {mode === "signup" ? (
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
              />
            ) : null}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {signInWarn ? (
              <AutoHideAlert
                severity="warning"
                message={signInWarn}
                open={open}
                handleClose={handleClose}
              />
            ) : null}
            {!signInWarn && signInErr ? (
              <AutoHideAlert
                severity="error"
                message={signInErr}
                open={open}
                handleClose={handleClose}
              />
            ) : null}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {mode === "signin" ? "Sign In" : "Sign Up"}
            </Button>
            <Grid container>
              {mode === "signin" ? (
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              ) : null}
              <Grid item>
                <Link
                  onClick={handleMode}
                  variant="body2"
                  sx={{ cursor: "pointer" }}
                >
                  {mode === "signin"
                    ? "Don't have an account? Sign Up"
                    : "Have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Redirect>
  );
};

export default UserLogin;
