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
  currentUser: { user: "admin", password: "admin" },
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

        if (category && product.category !== category) {
          match = false;
        }

        if (rating && product.rating < rating) {
          match = false;
        }

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
      if (action.payload === 'priceAsc') {
        state.filteredProducts.sort((a, b) => a.price - b.price);
      } else if (action.payload === 'priceDesc') {
        state.filteredProducts.sort((a, b) => b.price - a.price);
      } else if (action.payload === 'rating') {
        state.filteredProducts.sort((a, b) => b.rating - a.rating);
      } else if (action.payload === 'title') {
        state.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
      }
      state.sortOption = action.payload;
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
  placeOrderAction
} = productSlice.actions;

export default productSlice.reducer;
