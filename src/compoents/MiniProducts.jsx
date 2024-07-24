import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/product/productActions';

const MiniProducts = () => {
  const { products, carts } = useSelector((state) => state.products);
  const [MiniProducts, setMiniProducts] = useState(products);
  const dispatch = useDispatch();


  useEffect(() => {
    if (carts.length === 0)
      setMiniProducts(products)
    else {
      const prod = products.filter(product =>
        !carts.some(cart => cart.id === product.id) && // Product is not in cart
        categoriesInCart.includes(product.category)    // Product category is in the list of categories in cart
      );
      console.log(prod)
      setMiniProducts(prod)
    }
  }, [carts]);


  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', marginBottom: "auto", overflow: 'hidden',
    }}>
      <Typography variant='h6'>Recomended Products</Typography>
      <Box sx={{
        display: 'flex', flexDirection: 'column'
      }}>
        {MiniProducts && MiniProducts.map((product) => {
          // const isInCart = carts.some(cart => cart.id === product.id);
          return (
            <Card key={product.id} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{ width: "100%", height: "100%", objectFit: 'cover' }}
              />

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

              {/* {isInCart ? ( */}
              {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
              ) : ( */}
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
              {/* )} */}

            </Card>
          );
        })}
      </Box>
    </Box>
  )
}

export default MiniProducts