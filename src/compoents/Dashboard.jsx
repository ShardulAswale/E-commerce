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
        minWidth: "100vw",
        minHeight: "100vh",
        overflow: "hidden", // Hide scroll bars
        margin: "-8px",
      }}
    >
      {/* Top Bar */}
      <Paper
        sx={{
          height: "50px",
          backgroundColor: "lightblue",
          marginBottom: "5px",
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
          justifyContent: "stretch",
          alignItems: "stretch",
        }}
      >
        <Grid container spacing={1} sx={{ minHeight: "100%" }}>
          <Grid item xs={6} md={2}>
            <Paper
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sidebar />
            </Paper>
          </Grid>
          <Grid item xs={6} md={10}>
            <Paper sx={{ height: "100%" }}>
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
