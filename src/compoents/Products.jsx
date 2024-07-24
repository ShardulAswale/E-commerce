import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { Grid } from '@mui/material';
import { addToCart, fetchInitialData, removeFromCart, sortProducts } from '../redux/product/productActions';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Products = () => {
  const dispatch = useDispatch();
  const { filteredProducts, loading, error, sortOption, carts } = useSelector((state) => state.products);
  const [sortOptionState, setSortOptionState] = useState(sortOption || 'title');

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(sortProducts(sortOptionState));
  }, [sortOptionState, dispatch]);

  const handleSortChange = (event) => {
    setSortOptionState(event.target.value);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Products
        </Typography>
        <Box sx={{ mb: 2 }}>
          <select onChange={handleSortChange} value={sortOptionState}>
            <option value="priceAsc">Sort by Price: Low to High</option>
            <option value="priceDesc">Sort by Price: High to Low</option>
            <option value="title">Sort by Title</option>
            <option value="ratingAsc">Sort by Rating: Low to High</option>
            <option value="ratingDesc">Sort by Rating: High to Low</option>
          </select>
        </Box>
        {loading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : error ? (
          <Typography variant="body1" color="error">
            Error: {error}
          </Typography>
        ) : filteredProducts.length > 0 ? (
          <Box>
            {filteredProducts.map((product) => {
              const isInCart = carts.some(cart => cart.id === product.id);
              return (
                <Grid container key={product.id}>
                  <Card key={product.id} sx={{ display: 'flex', flexDirection: 'row', mb: 2, width: '100%' }}>
                    <Grid item xs={3}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.title}
                        sx={{ width: "100%", height: "100%", objectFit: 'cover' }}
                      />
                    </Grid>
                    <Grid item xs={7} >
                      <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, }}>
                        <Typography variant="h6" component="div" gutterBottom>
                          {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                          {product.description}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ flexGrow: 1 }}>
                          Rating: {product.rating.rate}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                          Price: ${product.price}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={2} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                      {isInCart ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => handleRemoveFromCart(product)}
                          >
                            <DeleteForeverIcon />
                          </Button>
                          <Typography variant="body2" sx={{ margin: "0px 5px" }}>
                            Count: {carts.find(cart => cart.id === product.id)?.count || 0}
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleAddToCart(product)}
                          >
                            <AddIcon />
                          </Button>
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>

                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </Box>
                      )}

                    </Grid>
                  </Card>
                </Grid>
              );
            })}
          </Box>
        ) : (
          <Typography variant="body1">No products to show</Typography>
        )
        }
      </Box >
    </Box >
  );
};

export default Products;
