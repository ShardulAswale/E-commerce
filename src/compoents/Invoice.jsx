// src/components/Invoice.jsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Invoice = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (orders.length === 0) {
      navigate('/');
      return;
    }
    setOrder(orders[orders.length - 1]); // Get the most recent order
  }, [navigate]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Summary
      </Typography>
      {order ? (
        <Card>
          <CardContent>
            <Typography variant="h6">Order Date: {new Date(order.date).toLocaleDateString()}</Typography>
            <Typography variant="h6">Total: ${order.total}</Typography>
            {/* <Typography variant="h6">User: {order.user.name}</Typography> */}
            <Typography variant="h6">Items:</Typography>
            <Grid container spacing={2}>
              {order.items.map((item) => (
                <Grid item key={item.id} xs={12}>
                  <Typography variant="body1">
                    {item.title} - ${item.price} x {item.count}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1">No order details available</Typography>
      )}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default Invoice;
