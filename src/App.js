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
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home />
    </Protected>,
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
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
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: '/my-orders',
    element: (
      <UserOrdersPage />
    ),
  },
  {
    path: '/logout',
    element: (
      <Logout />
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <ForgotPasswordPage />
    ),
  },
  {
    path: '/profile',
    element: (
      <UserProfilePage />
    ),
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user)
      dispatch(fetchItemsByUserIdAsync(user.id));
  }, [user, dispatch])

  useEffect(() => {
    if (user)
      dispatch(fetchLoggedInUserAsync(user.id));
  }, [user, dispatch])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}