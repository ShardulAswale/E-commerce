import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  carts: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  orders: localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [],
  categories: [],
  filteredProducts: [],
  filter: {
    category: '',
    rating: 0,
    priceRange: [0, 1000]
  },
  loading: false,
  error: null,
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
};


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.categories = action.payload.categories;
      state.filteredProducts = action.payload.products;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    ordersCleanup(state, action) {
      //clean up in hours
      // console.log("in cleanup " + JSON.stringify(state.orders.map(o => o.date)));
      // let newOrders = state.orders.filter(order => {
      //   const now = new Date();
      //   const orderDate = new Date(order.date);
      //   const diffInHours = Math.floor((now - orderDate) / (1000 * 60 * 60));
      //   return diffInHours <= 3;
      // });
      // console.log("after cleanup " + JSON.stringify(newOrders.map(o => o.date)));
      // state.orders = newOrders;


      //cleanup in seconds
      console.log("in cleanup " + JSON.stringify(state.orders.map(o => o.date)));
      let newOrders = state.orders.filter(order => {
        const now = new Date();
        const orderDate = new Date(order.date);
        const diffInSeconds = Math.floor((now - orderDate) / 1000);
        return diffInSeconds <= 15;
      });
      console.log("after cleanup " + JSON.stringify(newOrders.map(o => o.date)));
      state.orders = newOrders;

      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    insertProductAction(state, action) {
      state.products.push(action.payload);
    },
    deleteProductAction(state, action) {
      state.products = state.products.filter(prod => prod.id !== action.payload);
    },
    updateProductAction(state, action) {
      const index = state.products.findIndex(prod => prod.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    insertCartAction(state, action) {
      state.carts.push(action.payload);
    },
    updateCartAction(state, action) {
      const index = state.carts.findIndex(cart => cart.id === action.payload.id);
      if (index !== -1) {
        state.carts[index] = { ...state.carts[index], count: action.payload.count };
      }
    },
    deleteCartAction(state, action) {
      state.carts = state.carts.filter(cart => cart.id !== action.payload.id);
    },
    loginSuccessAction(state, action) {
      state.currentUser = { username: action.payload.username };
      state.error = null;
    },
    loginFailureAction(state, action) {
      state.error = action.payload;
    },
    logoutAction(state) {
      state.currentUser = null;
    },
    filterProductsAction(state, action) {
      const { category, rating, priceRange } = action.payload;
      state.filter = { category, rating, priceRange };

      state.filteredProducts = state.products.filter(product => {
        let match = true;

        // Filter by category
        if (category && product.category !== category) {
          match = false;
        }

        // Filter by rating
        if (rating !== undefined && rating !== null) {
          // Ensure rating is a number and compare with product.rating.rate
          if (product.rating.rate < rating) {
            match = false;
          }
        }

        // Filter by price range
        if (priceRange) {
          const [minPrice, maxPrice] = priceRange;
          if (product.price < minPrice || product.price > maxPrice) {
            match = false;
          }
        }

        return match;
      });
    },
    sortProductsAction(state, action) {
      const sortBy = action.payload;

      if (sortBy === 'priceAsc') {
        state.filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'priceDesc') {
        state.filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'ratingAsc') {
        state.filteredProducts.sort((a, b) => a.rating.rate - b.rating.rate);
      } else if (sortBy === 'ratingDesc') {
        state.filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
      } else if (sortBy === 'title') {
        state.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
      }

      state.sortOption = sortBy;
    },

    placeOrderAction(state, action) {
      console.log("Order placed:", action.payload);
      state.carts = []; // Clear the cart after placing the order
      localStorage.setItem('cart', JSON.stringify(state.carts));
    }
  }
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  insertProductAction,
  deleteProductAction,
  updateProductAction,
  insertCartAction,
  deleteCartAction,
  updateCartAction,
  loginSuccessAction,
  loginFailureAction,
  logoutAction,
  filterProductsAction,
  sortProductsAction,
  placeOrderAction,
  ordersCleanup
} = productSlice.actions;

export default productSlice.reducer;
