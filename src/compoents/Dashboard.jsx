import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NavBar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Products from "./Products";
import Cart from "./Cart";
import Login from "./Login";
import Users from "./Users";
import Sidebar from "./Sidebar";
import Invoice from "./Invoice";
import ViewOrders from "./ViewOrders";

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Use 100vh to take full viewport height
        width: "100vw",  // Use 100vw to take full viewport width
        overflow: "hidden", // Hide scroll bars
        margin: "-8px", // Reset margin
        padding: 0, // Reset padding
      }}
    >
      {/* Top Bar */}
      <Paper
        sx={{
          height: "50px",
          backgroundColor: "lightblue",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NavBar />
      </Paper>

      {/* Sidebar and Main Content */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          overflow: "hidden", // Hide overflow
          padding: 1
        }}
      >
        <Grid container sx={{ flexGrow: 1, height: "100%" }}>
          <Grid item xs={12} md={2} sx={{ height: "100%" }}>
            <Paper
              sx={{
                height: "100%",
                overflowY: "auto", // Enable vertical scroll if needed
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingRight: 1
              }}
            >
              <Sidebar />
            </Paper>
          </Grid>
          <Grid item xs={12} md={10} sx={{ height: "100%" }}>
            <Paper
              sx={{
                height: "100%",
                paddingLeft: 1,
                overflowY: "auto", // Enable vertical scroll if needed
              }}
            >
              <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<Users />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/orders" element={<ViewOrders />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
