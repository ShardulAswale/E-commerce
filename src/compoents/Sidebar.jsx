import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Slider } from '@mui/material';
import { filterProducts} from '../redux/product/productActions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
  
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    applyFilters({ category: event.target.value, rating, priceRange });
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    applyFilters({ category, rating: newValue, priceRange });
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
    applyFilters({ category, rating, priceRange: newValue });
  };

  const applyFilters = (filters) => {
    dispatch(filterProducts(filters));
  };

  return (
    <Box sx={{ width: 250, padding: 2, marginBottom: "auto" }}>
      <Typography variant="h6">Filter</Typography>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select onChange={handleCategoryChange} value={category}>
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h6" sx={{ mt: 4 }}>Rating</Typography>
      <Slider
        min={0}
        max={5}
        step={0.1}
        value={rating}
        onChange={handleRatingChange}
        aria-labelledby="rating-slider"
        valueLabelDisplay="auto"
      />
      <Typography variant="h6" sx={{ mt: 4 }}>Price Range</Typography>
      <Slider
        min={0}
        max={1000}
        step={10}
        value={priceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        aria-labelledby="price-range-slider"
      />
    </Box>
  );
};

export default Sidebar;
