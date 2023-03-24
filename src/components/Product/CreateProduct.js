import React from "react";
import { auth, db } from "../../firebase.config";
import {
  collection,
  doc,
  getCountFromServer,
  setDoc,
} from "firebase/firestore";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Navbar";

const theme = createTheme();

const CreateProduct = () => {
  const user = auth.currentUser;

  if (!user) {
    alert("Please Login First");
    window.location.assign("/");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const coll = collection(db, "products");
    const snapshot = await getCountFromServer(coll);
    const id = snapshot.data().count;

    const payload = {
      productId: data.get("product-id"),
      productName: data.get("product-name"),
      productImage: data.get("product-img"),
      productPrice: data.get("product-price"),
      productWarranty: data.get("product-warranty"),
      purchasedOn: null,
      manufacturer: user.email,
      expiresOn: null,
      available: true,
    };

    await setDoc(doc(db, "products", id.toString()), payload);
    alert(`Product Created! at id: ${id}`);

    //Product Number error

    window.location.replace("/");
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
