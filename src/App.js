import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home />
    </Protected>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <Protected>
      <CartPage />
    </Protected>,
  },
  {
    path: "/checkout",
    element:
      <Protected>
        <Checkout />
      </Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage />,
  },
]);

export default function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user)
      dispatch(fetchItemsByUserIdAsync(user.id));
  }, [user, dispatch])
  return (
    <div className="App">   
      <RouterProvider router={router} />
    </div>
  );
}