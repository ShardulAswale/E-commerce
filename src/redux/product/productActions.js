// src/redux/product/productActions.js
import axios from 'axios';
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  logoutAction,
  updateCartAction,
  deleteCartAction,
  insertCartAction,
  loginFailureAction,
  loginSuccessAction,
  placeOrderAction,
  filterProductsAction,
  sortProductsAction,

} from './productReducer';

// Fetch initial data
export const fetchInitialData = () => async dispatch => {
  dispatch(fetchDataStart());
  try {
    const products = await axios.get('https://fakestoreapi.com/products');
    dispatch(fetchDataSuccess({ products: products.data }));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

// Perform login
export const performLogin = (username, password) => dispatch => {
  const validUsername = "admin";
  const validPassword = "admin";

  if (username === validUsername && password === validPassword) {
    const user = { username }; // Example user object
    dispatch(loginSuccessAction(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    dispatch(loginFailureAction("Invalid credentials"));
  }
};

// Logout action
export const logoutUser = () => dispatch => {
  dispatch(logoutAction());
  localStorage.removeItem('currentUser');
};

// src/redux/product/productActions.js

export const addToCart = (product) => (dispatch, getState) => {
  const { carts } = getState().products;
  const existingCartIndex = carts.findIndex(cartItem => cartItem.id === product.id);

  if (existingCartIndex !== -1) {
    // Product already exists in cart, increment the count
    const updatedCartItem = {
      ...carts[existingCartIndex],
      count: carts[existingCartIndex].count + 1
    };
    dispatch(updateCartAction(updatedCartItem));
  } else {
    // Product is new, add it to the cart
    dispatch(insertCartAction({ ...product, count: 1 }));
  }

  // Save to local storage
  const updatedCarts = carts.map(cartItem =>
    cartItem.id === product.id ? { ...cartItem, count: cartItem.count + 1 } : cartItem
  );

  if (existingCartIndex === -1) {
    updatedCarts.push({ ...product, count: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(updatedCarts));
};


// Remove product from cart (decrement count or delete if count 0)
export const removeFromCart = (product) => (dispatch, getState) => {
  const { carts } = getState().products;
  const existingCartIndex = carts.findIndex(cartItem => cartItem.id === product.id);

  if (existingCartIndex !== -1) {
    const existingCart = carts[existingCartIndex];

    if (existingCart.count > 1) {
      dispatch(updateCartAction({
        ...existingCart,
        count: existingCart.count - 1
      }));
    } else {
      dispatch(deleteCartAction({ id: product.id }));
    }

    // Save to local storage
    const updatedCarts = getState().products.carts.filter(cartItem => cartItem.id !== product.id || cartItem.count > 1);
    localStorage.setItem('cart', JSON.stringify(updatedCarts));
  }
};

// Completely remove product from cart
export const deleteFromCart = (product) => (dispatch, getState) => {
  dispatch(deleteCartAction({ id: product.id }));

  // Save to local storage
  const updatedCarts = getState().products.carts.filter(cartItem => cartItem.id !== product.id);
  localStorage.setItem('cart', JSON.stringify(updatedCarts));
};

// Add order and clear cart
export const placeOrder = () => (dispatch, getState) => {
  const { carts } = getState().products;

  // Calculate the total price of the order
  const total = carts.reduce((sum, item) => sum + (item.price * item.count), 0).toFixed(2);

  // Save the order to local storage
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const order = {
    id: new Date().toISOString(), // Use timestamp as unique order ID
    items: carts,
    date: new Date().toISOString(),
    total
  };
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Clear the cart
  dispatch(placeOrderAction());
  localStorage.setItem('cart', JSON.stringify([])); // Clear cart in local storage
};



// Filter products
export const filterProducts = (filters) => (dispatch) => {
  dispatch(filterProductsAction(filters));
};

// Sort products
export const sortProducts = (sortOption) => (dispatch) => {
  dispatch(sortProductsAction(sortOption));
};