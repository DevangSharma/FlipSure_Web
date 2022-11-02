import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(title, value) {
  return { title, value };
}

const dateFormatter = (s) => {
  const purchasedOn = new Date(s); // Date 2011-05-09T06:08:45.178Z
  const year = purchasedOn.getFullYear();
  const month = ("0" + (purchasedOn.getMonth() + 1)).slice(-2);
  const day = ("0" + purchasedOn.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export default function CustomTable({ product }) {
  product.purchasedOn = dateFormatter(product?.purchasedOn); // 2011-05-09
  product.expiresOn = dateFormatter(product?.expiresOn); // 2011-05-09
  const warranty = `${product.productWarranty} years`;

  const rows = [
    createData("Manufacturer", product?.manufacturer),
    createData("Product Id", product?.productId),
    createData("Product Name", product?.productName),
    createData("Price", product?.productPrice),
    createData("Warranty", warranty),
    createData("Buyer", product?.username),
    createData("Address", product?.address),
    createData("Phone", product?.phone),
    createData("Email", product?.email),
    createData("Purchased On", product?.purchasedOn),
    createData("Expires On", product?.expiresOn),
  ];

  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      component={Paper}
    >
      <Table sx={{ maxWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Specs</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row?.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
