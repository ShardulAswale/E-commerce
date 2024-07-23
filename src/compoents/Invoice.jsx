import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Grid } from '@mui/material';

const Invoice = () => {
  const { order } = useSelector((state) => state.products);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Invoice
      </Typography>
      {order ? (
        <Grid container spacing={2}>
          {order.products.map((item) => (
            <Grid item key={item.id} xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 2 }}>
                <Typography variant="body1">
                  {item.title} - ${item.price} x {item.count}
                </Typography>
                <Typography variant="body1">
                  ${item.price * item.count}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No order details available</Typography>
      )}
      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Typography variant="h6">Total: ${order ? order.totalPrice : '0.00'}</Typography>
      </Box>
    </Box>
  );
};

export default Invoice;
