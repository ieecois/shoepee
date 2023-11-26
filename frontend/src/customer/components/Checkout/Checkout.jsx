import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  getCartAsync,
  placeOrderAsync,
} from '../../../containers/Cart/cartSlice';
import userApi from '../../../api/userApi';
import { fetchOrders } from '../../../containers/Cart/orderSlice';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required')
    .matches(/^[A-Za-z -]+$/, 'Invalid characters'),
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Email is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string()
    .required('Phone is required')
    .matches(/^\d{10}$/, 'Invalid phone number'),
  paymentMethod: Yup.string()
    .required('Payment Method is required')
    .oneOf(['COD', 'VNPAY'], 'Invalid payment method'),
});

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    orderAddress: '',
    orderPhone: '',
    paymentMethod: 'COD',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const { cartId, user } = useSelector((state) => state.cart);
  const orders = useSelector((state) => state.orders.content);

  const initialValues = useMemo(
    () => ({
      fullName: '',
      email: user?.email || '',
      address: '',
      phone: '',
      paymentMethod: 'COD',
    }),
    [user?.email]
  );

  const handleConfirm = (values) => {
    setOrderDetails(values);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const action = await dispatch(
        placeOrderAsync({ ...orderDetails, cartId })
      );
      if (action.meta.requestStatus === 'fulfilled') {
        await dispatch(fetchOrders()); // Ensure this completes before proceeding
        setOrderSubmitted(true);
      }
    } catch (error) {
      console.error('Order submission failed:', error);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const initiatePayment = async () => {
      const latestOrder = orders[orders.length - 1];
      if (latestOrder?.paymentMethod === orderDetails.paymentMethod) {
        if (latestOrder.paymentMethod === 'VNPAY') {
          userApi
            .payOrder({ orderId: latestOrder.orderId })
            .then((response) => window.open(response, '_blank'))
            .catch((error) => console.error('Payment failed:', error));
          setOrderSubmitted(false);
          navigate('/user/purchase', { replace: true });
        } else if (latestOrder.paymentMethod === 'COD') {
          navigate('/user/purchase', { replace: true });
        }
        setOrderSubmitted(false);
      }
    };
    if (orderSubmitted) {
      initiatePayment();
    }
  }, [orderSubmitted, orderDetails, orders, navigate]);

  const handleCancel = () => setIsModalOpen(false);

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Shipping Informations
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleConfirm}
      >
        <Form className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="bg-gradient-to-r bg-clip-text text-xs text-gray-600 font-semibold uppercase transition-all duration-300"
            >
              Full Name
            </label>
            <Field
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Your Name"
              className="form-input w-full border-0 border-b-2 border-gray-300 bg-white bg-opacity-80 placeholder-gray-400 focus:border-gray-300 focus:ring-0"
            />

            <ErrorMessage
              name="fullName"
              component="div"
              className="bg-gradient-to-r bg-clip-text text-xs text-red-600 font-semibold uppercase transition-all duration-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="bg-gradient-to-r bg-clip-text text-xs text-gray-600 font-semibold uppercase transition-all duration-300"
            >
              Address
            </label>
            <Field
              type="text"
              id="address"
              name="address"
              placeholder=""
              className="form-input w-full border-0 border-b-2 border-gray-300 bg-white bg-opacity-80 placeholder-gray-400 focus:border-gray-300 focus:ring-0"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="bg-gradient-to-r bg-clip-text text-xs text-red-600 font-semibold uppercase transition-all duration-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="bg-gradient-to-r bg-clip-text text-xs text-gray-600 font-semibold uppercase transition-all duration-300"
            >
              Phone
            </label>
            <Field
              type="text"
              id="phone"
              name="phone"
              placeholder="0123456789"
              className="form-input w-full border-0 border-b-2 border-gray-300 bg-white bg-opacity-80 placeholder-gray-400 focus:border-gray-300 focus:ring-0"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="bg-gradient-to-r bg-clip-text text-xs text-red-600 font-semibold uppercase transition-all duration-300"
            />
          </div>

          <div className="mx-auto py-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Payment Method
            </h1>
            <div className="space-y-4">
              {/* COD Option */}
              <label className="flex items-center space-x-3">
                <Field
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  className="radio text-black focus:ring-black"
                />
                <span className="text-sm font-medium text-gray-700">
                  COD (Cash On Delivery)
                </span>
              </label>

              {/* Bank Online Option */}
              <label className="flex items-center space-x-3">
                <Field
                  type="radio"
                  name="paymentMethod"
                  value="VNPAY"
                  className="radio text-black focus:ring-black"
                />
                <div className="flex items-center space-x-2">
                  <img
                    src="/vnpay.svg"
                    alt="Bank Logo"
                    className="h-6 w-auto"
                  />
                </div>
              </label>
            </div>
            <ErrorMessage
              name="paymentMethod"
              component="div"
              className="text-red-500 mt-2"
            />
          </div>

          <button
            type="submit"
            className="w-full btn bg-black text-white hover:bg-gray-700 px-6 py-3 rounded-md font-semibold"
          >
            Place Order
          </button>
        </Form>
      </Formik>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative rounded-lg bg-white p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Confirm Address
            </h2>
            <p className="mt-2 text-md text-gray-500">
              <span className="font-semibold">Is this address correct?</span> If
              yes, click 'Yes, I'm sure'.
            </p>

            <p className="mt-2 text-md ml-4 text-gray-500">
              {orderDetails.customerName}
            </p>
            <p className="mt-2 text-md ml-4 text-gray-500">
              {orderDetails.orderAddress}
            </p>

            <p className="mt-2 text-md text-gray-500">
              <span className="font-semibold">Not correct? </span>Click 'No, go
              back' to go back and make changes.
            </p>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="rounded bg-meta-3/10 px-4 py-2 text-sm font-medium text-meta-3"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Yes, I'm sure"
                )}
              </button>

              <button
                type="button"
                className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
                onClick={handleCancel}
              >
                No, go back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
