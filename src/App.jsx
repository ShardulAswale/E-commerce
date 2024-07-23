// App.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInitialData } from './redux/product/productActions';
import Dashboard from './compoents/Dashboard';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  return (
    <div>
      <Dashboard/>
    </div>
  );
};

export default App;
