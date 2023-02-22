import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";

const pages = [{ pageName: "Create Product", to: "/create" }];
const Navbar = () => {
  const handleUserAuth = (event, isSignup = 0) => {
    if (isSignup) window.location.replace("/signup");
    else window.location.replace("/login");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("You are logged out!");
        window.location.reload();
      })
      .catch(() => alert("Something went wrong!"));
  };

  const user = auth.currentUser;

  return (
    <AppBar sx={{ marginTop: 0 }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FLIPSURE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                style={{ textDecoration: "none" }}
                to={page.to}
                key={page.to}
              >
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                  }}
                >
                  {page.pageName}
                </Button>
              </Link>
            ))}
          </Box>

          {!user && (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                onClick={handleUserAuth}
                sx={{ p: 0, color: "white", fontSize: 16 }}
              >
                Login
              </IconButton>
            </Box>
          )}
          {!user && (
            <Box sx={{ flexGrow: 0, marginLeft: 4 }}>
              <IconButton
                onClick={(e) => handleUserAuth(e, 1)}
                sx={{ p: 0, color: "white", fontSize: 16 }}
              >
                Signup
              </IconButton>
            </Box>
          )}
          {user && (
            <Box sx={{ flexGrow: 0, marginLeft: 4 }}>
              <IconButton sx={{ p: 0, color: "white", fontSize: 16 }}>
                {user.email}
              </IconButton>
            </Box>
          )}
          {user && (
            <Box sx={{ flexGrow: 0, marginLeft: 4 }}>
              <IconButton
                onClick={handleLogout}
                sx={{ p: 0, color: "white", fontSize: 16 }}
              >
                Logout
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
