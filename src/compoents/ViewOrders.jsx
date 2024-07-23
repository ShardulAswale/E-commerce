// src/components/ViewOrders.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const ViewOrders = () => {
    // Correctly access the orders from the Redux state
    const { orders } = useSelector((state) => state.products);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Your Orders
            </Typography>
            {console.log(orders)}
            {orders && orders.length > 0 ? (
                <Grid container spacing={2}>
                    {orders.map((order, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Order {index + 1}
                                    </Typography>
                                    {order.items.map((item) => (
                                        <Box key={item.id} sx={{ marginBottom: 1 }}>
                                            <Typography variant="body1">
                                                {item.title} - ${item.price} x {item.count}
                                            </Typography>
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1">No orders found</Typography>
            )}
        </Box>
    );
};

export default ViewOrders;
