// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import productReducer from './product/productReducer';

const store = configureStore({
  reducer: {
    products: productReducer
  },
  middleware: [thunk]
});

export default store;
