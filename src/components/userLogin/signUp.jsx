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
import { useDispatch, useSelector } from "react-redux";
import AutoHideAlert from "../common/alert";
import { userSignUp } from "../../redux/actions/userLoginActions";
import Redirect from "../common/redirect";

const SignUp = () => {
  const dispatch = useDispatch();
  const signInErr = useSelector((state) => state.user.sign_in_error);
  const signInErrCount = useSelector((state) => state.user.sign_in_error_count);
  const [signInWarn, setSignInWarn] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (signInErr && signInErr.length > 0) {
      setOpen(true);
    }
  }, [signInErr, signInErrCount]);

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
    if (password !== confirmpassword) {
      setSignInWarn("Password doesn't match");
      setOpen(true);
      return;
    }
    const email = data.get("email");
    const firstname = data.get("firstname");
    const lastname = data.get("lastname");
    if (!username || !password || !email || !firstname) {
      setSignInWarn("Please fill in all required fields");
      setOpen(true);
      return;
    }
    setSignInWarn(null);
    dispatch(
      userSignUp({
        username,
        password,
        email,
        firstname,
        lastname,
      })
    );
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
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="Confirm Password"
              type="password"
              id="confirmpassword"
            />
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Redirect>
  );
};

export default SignUp;
