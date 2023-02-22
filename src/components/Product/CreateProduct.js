import React from "react";
import { db } from "../../firebase.config";
import { addDoc, doc } from "firebase/firestore";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const CreateProduct = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const payload = {
      productId: data.get("product-id"),
      productName: data.get("product-name"),
      productImage: data.get("product-img"),
      productPrice: data.get("product-price"),
      productWarranty: data.get("product-warranty"),
      purchasedOn: null,
      manufacturer: "Authorised Msanufacturer",
      expiresOn: null,
      available: true,
    };

    await addDoc(doc(db, "products"), payload);
    alert("Product Created!");

    window.location.replace("/");
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
            Create Product
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
              id="product-id"
              label="Product Id"
              name="product-id"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="product-name"
              label="Product Name"
              name="product-name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="product-img"
              label="Product Image Url"
              id="product-img"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              name="product-price"
              label="Price"
              id="product-price"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              name="product-warranty"
              label="Warranty"
              id="product-warranty"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create{" "}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateProduct;
