import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Cart from '../../components/Cart/Cart';
import CartSummary from '../../components/Cart/CartSummary';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  const breadcrumbItems = [
    { label: 'Products', url: '/products' },
    { label: 'Cart' },
  ];
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="min-h-screen grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 m-8">
        <div className="h-full rounded-lg  lg:col-span-2">
          <Cart />
        </div>
        <div className="h-full rounded-lg ">
          <CartSummary />
          <button
            onClick={handleCheckoutClick}
            className="bg-black font-bold text-white px-4 py-2 mb-2 w-full hover:bg-gray-900"
          >
            PROCEED TO CHECKOUT
          </button>
          <p className="text-center text-gray-600">
            <a className="underline hover:text-gray-800" href="/products">
              Continue Shopping
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default CartPage;
