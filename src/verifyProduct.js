import React, { useState } from "react";
import { db } from "./firebase";
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
import CustomTable from "./tables";

const theme = createTheme();

const VerifyProduct = () => {

  const [product, setProduct] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const inputTokenId = data.get("token-id");
    const res = await getDoc(doc(db, "products", inputTokenId));
    const payload = res.data();


    if (!res.data()) {
      alert("Token not exist!");
      return;
    }

    setProduct(payload);
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
