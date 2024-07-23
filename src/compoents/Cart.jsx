// src/components/Cart.jsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid, Typography, IconButton } from '@mui/material';
import { removeFromCart, deleteFromCart, addToCart, placeOrder } from '../redux/product/productActions';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { carts, currentUser } = useSelector((state) => state.products);

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleDelete = (product) => {
    dispatch(deleteFromCart(product));
  };

  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

  const handlePlaceOrder = () => {
    dispatch(placeOrder());
    navigate('/invoice'); // Redirect to invoice page
  };

  const getTotalPrice = () => {
    return carts.reduce((total, item) => total + (item.price * item.count), 0).toFixed(2);
  };

  if (!currentUser) {
    window.location.href = '/login';
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {carts.length > 0 ? (
        <Grid container spacing={2}>
          {carts.map((item) => (
            <Grid item key={item.id} xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: 2, marginBottom: 2 }}>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  {item.title} - ${item.price}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleRemove(item)}
                    disabled={item.count <= 1}
                    sx={{ marginRight: 1 }}
                  >
                    -
                  </Button>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    {item.count}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleAdd(item)}
                    sx={{ marginRight: 1 }}
                  >
                    +
                  </Button>
                  <IconButton onClick={() => handleDelete(item)}>
                    Remove
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No items in cart</Typography>
      )}
      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Typography variant="h6">Total: ${getTotalPrice()}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder}
          disabled={!currentUser}
        >
          Pay Now
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
