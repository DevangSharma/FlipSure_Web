import React, { useEffect, useState } from "react";
import {
  collection,
  getDoc,
  getDocs,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { auth } from "../../firebase.config";
import ProductCard from "../utils/ProductCard";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import Navbar from "../Navbar";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const getProducts = async () => {
    let products = [];
    try {
      const q = query(collection(db, "products"));
      const querySnapshot = await getDocs(q);
      setAllProducts(querySnapshot);
      querySnapshot.forEach((doc) => {
        products.push({ ...doc.data(), tokenId: doc.id });
      });
      setAllProducts(products);
    } catch (error) {
      console.log(error.message);
    }
  };

  const purchaseProducts = async (id) => {
    const user = auth.currentUser;
    const email = user.email;
    if (!email) {
      alert("Please login first!");
      return;
    }
    const userData = await getDoc(doc(db, "users", email));
    const product = await getDoc(doc(db, "products", id));

    await updateDoc(doc(db, "products", id), {
      available: false,
      purchasedOn: Date.now(),
      expiresOn:
        Date.now() +
        Number(product.data().productWarranty) * 365 * 24 * 3600 * 1000,
      ...userData.data(),
    });
    alert("Congrats,Product Purchased!!");

    const purchaseMessage = `Hello ${
      userData.data().username
    }, \n This message is to confirm your purchase of ${
      product.data().productName
    }. \n Your unique token for your purchase is : ${product.id}. \n 
    You can verify your product details on http://localhost:3000/verify. \n
    
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
        body: `Body=${purchaseMessage}&From=${
          process.env.REACT_APP_TWILIO_PHONE
        }&To=+91${userData.data().phone}`,
      }
    )
      .then(() => console.log("success"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, paddingLeft: 4, paddingRight: 4, paddingTop: 4 }}>
        <Box
          sx={{
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Shop Now{" "}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {allProducts?.map(
            (doc, idx) =>
              doc.available && (
                <Grid
                  key={idx}
                  item
                  md={2}
                  sm={4}
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <ProductCard
                    id={doc.tokenId}
                    name={doc.productName}
                    price={doc.productPrice}
                    url={doc.productImage}
                    warranty={doc.productWarranty}
                    purchase={purchaseProducts}
                  />
                </Grid>
              )
          )}
        </Grid>
      </Box>
    </>
  );
};

export default AllProducts;
