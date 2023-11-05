import { lazy } from 'react';

const ProductPage = lazy(() => import('../pages/ProductPage/ProductPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductPage/ProductDetailPage'));
const CartPage = lazy(() => import('../pages/CartPage/CartPage'));
const CheckoutPage = lazy(() => import('../pages/Checkout/CheckoutPage'));
const ShoeCustomize = lazy(() => import('../pages/ShoeCustomize'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));

const coreRoutes = [
  {
    path: '/products',
    title: 'Products',
    component: ProductPage,
  },
  {
    path: '/products/:modelname',
    title: 'Products Details',
    component: ProductDetailPage,
  },
  {
    path: '/cart',
    title: 'Cart',
    component: CartPage,
  },
  {
    path: '/checkout',
    title: 'Checkout',
    component: CheckoutPage,
  },
  {
    path: '/customize',
    title: 'Customize',
    component: ShoeCustomize,
  },
  {
    path: '/profile/:userId',
    title: 'Profile',
    component: ProfilePage,
  },
  
];

const routes = [...coreRoutes];
export default routes;
