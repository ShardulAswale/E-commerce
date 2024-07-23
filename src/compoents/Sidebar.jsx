import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Slider, TextField, Button } from '@mui/material';
import { filterProductsAction } from '../redux/product/productReducer';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    applyFilters(newCategory, rating, priceRange);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    applyFilters(category, newValue, priceRange);
  };

  const handlePriceChange = (event) => {
    const newPriceRange = [event.target.value[0], event.target.value[1]];
    setPriceRange(newPriceRange);
    applyFilters(category, rating, newPriceRange);
  };

  const applyFilters = (category, rating, priceRange) => {
    dispatch(filterProductsAction({ category, rating, priceRange }));
  };

  return (
    <Box sx={{ width: 250, padding: 2, marginBottom: "auto" }}>
      <Typography variant="h6">Filter</Typography>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={handleCategoryChange}>
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="jewelery">Jewelery</MenuItem>
          <MenuItem value="men's clothing">Men's Clothing</MenuItem>
          <MenuItem value="women's clothing">Women's Clothing</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="h6" sx={{ mt: 4 }}>Rating</Typography>
      <Slider
        value={rating || 0}
        min={0}
        max={5}
        step={0.1}
        onChange={handleRatingChange}
        aria-labelledby="rating-slider"
        valueLabelDisplay="auto"
        marks
      />
      <Typography variant="h6" sx={{ mt: 4 }}>Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
        aria-labelledby="price-range-slider"
        marks
      />
    </Box>
  );
};

export default Sidebar;
