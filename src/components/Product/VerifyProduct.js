import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomTable from "../utils/Table";
import Navbar from "../Navbar";

const theme = createTheme();

const VerifyProduct = () => {
  useEffect(() => {
    console.log("logged in");
  }, [auth.currentUser]);

  const [product, setProduct] = useState(null);

  const findManufacturer = async (s = "") => {
    const manufacturerName = await getDoc(doc(db, "manufacturers", s));
    if (!manufacturerName.data()) return "";
    return manufacturerName.data().name;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const inputTokenId = data.get("token-id");
    const res = await getDoc(doc(db, "products", inputTokenId));
    const payload = res.data();

    payload.manufacturer = await findManufacturer(res.data().manufacturer);

    if (!res.data()) {
      alert("Token not exist!");
      return;
    }
    if (res.data().available) {
      alert("Product not purchased, please buy to verify the details!");
      return;
    }

    setProduct(payload);
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
            Product Verification
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
              id="token-id"
              label="Token Id"
              name="token-id"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify{" "}
            </Button>
          </Box>
        </Box>
      </Container>
      {product && <CustomTable product={product} />}
    </ThemeProvider>
  );
};

export default VerifyProduct;
