import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AppRouter from './routes/AppRouter';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

const CartIcon = () => {
  const items = useSelector((state: any) => state.cart.items);
  return (
    <IconButton component={Link} to="/cart" color="inherit">
      <Badge badgeContent={items.length} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" color="inherit" sx={{ flexGrow: 1, textDecoration: 'none' }}>
            Авіаквитки
          </Typography>
          <CartIcon />
        </Toolbar>
      </AppBar>
      <div style={{ padding: 24 }}>
        <AppRouter />
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;