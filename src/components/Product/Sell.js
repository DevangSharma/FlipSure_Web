import React from "react";
import { db } from "../../firebase.config";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAuth } from "firebase/auth";
import Navbar from "../Navbar";

const auth = getAuth();
const theme = createTheme();

const Sell = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
      token: data.get("token"),
      username: data.get("username"),
      address: data.get("address"),
      phone: data.get("phone"),
      email: data.get("email"),
    };
    // const user = auth.currentUser;
    const currentProduct = await getDoc(doc(db, "products", payload.token));

    console.log(currentProduct.data());

    if (!currentProduct.data()) {
      alert("Invalid Token ID");
      return;
    }

    await updateDoc(doc(db, "products", payload.token), {
      address: payload.address,
      username: payload.username,
      phone: payload.phone,
      email: payload.email,
      available: false,
    });

    alert("Product Sold successfully");
    const purchaseMessage = `Hello ${
      payload.username
    }, \n This message is to confirm your purchase of ${
      currentProduct.data().productName
    }. \n Your unique token for your purchase is : ${currentProduct.id}. \n 
    You can verify your product details on https://flipsureweb.netlify.app//verify. \n
    
    Thank You on shopping with flipkart`;

    fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${process.env.REACT_APP_TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            btoa(
              `${process.env.REACT_APP_TWILIO_ACCOUNT_SID}:${process.env.REACT_APP_TWILIO_AUTH_TOKEN}`
            ),
        },
        body: `Body=${purchaseMessage}&From=${process.env.REACT_APP_TWILIO_PHONE}&To=+91${payload.phone}`,
      }
    )
      .then(() => {
        console.log("success");
        window.location.reload();
      })
      .catch((err) => console.log(err));

    // window.location.replace("/");
  };
  return (
    <ThemeProvider theme={theme}>
      <Navbar />

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
            Sell
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
              id="token"
              label="Token Id"
              name="token"
            />
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sell{" "}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Sell;
