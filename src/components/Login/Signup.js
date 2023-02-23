import React from "react";
import { db } from "../../firebase.config";
import { doc, setDoc } from "firebase/firestore";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

const theme = createTheme();

const Signup = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
      username: data.get("username"),
      address: data.get("address"),
      phone: data.get("phone"),
      email: data.get("email"),
      password: data.get("password"),
    };
    createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then(async () => {
        await setDoc(doc(db, "users", payload.email), payload);

        signInWithEmailAndPassword(auth, payload.email, payload.password)
          .then(() => {
            alert("Welcome to FlipSure");
            window.location.replace("/");
          })
          .catch((err) => {
            alert(err);
          });

        alert("Signed Up!");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  return (
    <ThemeProvider theme={theme}>
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
          <Typography component="h1" variant="h5">
            Signup
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            // noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Name"
              name="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              multiline
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
            />
            <TextField
              type="password"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Signup{" "}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
