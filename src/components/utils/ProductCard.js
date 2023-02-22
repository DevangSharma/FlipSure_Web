import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

export default function ProductCard({
  id,
  name,
  url,
  price,
  warranty,
  purchase,
}) {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        component="img"
        height="240"
        width="300"
        image={url}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          &#8377; {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Warranty - {warranty} years
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "space-evenly", marginTop: 2 }}
        >
          <Button variant="contained" onClick={() => purchase(id)}>
            Buy
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
