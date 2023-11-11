import { Box, Modal } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { API_BASE_URL } from '../constants/index';
import SignIn from './SignIn';
import SignUp from './Signup';
import { useNavigate } from 'react-router-dom';
import StorageKeys from '../constants/storage-keys';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 0,
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ handleClickOpen, handleClose }) => {
  const [email, setEmail] = useState('');
  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (
      !email ||
      !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ) {
      setEmailError('This field is required. Please enter a valid email.');
      return;
    } else {
      setEmailError('');
    }

    setEnteredEmail(email);
    let emailExists = false;
    let isCheckEmailSuccess = false;
    setIsLoading(true);

    axios
      .get(`${API_BASE_URL}/auth/existuser/${email}`)
      .then((response) => {
        emailExists = response.data.email;
        isCheckEmailSuccess = true;
      })
      .catch((error) => {
        isCheckEmailSuccess = true;
      })
      .finally(() => {
        setIsLoading(false);

        if (isCheckEmailSuccess) {
          if (emailExists) {
            setShowInitialScreen(false);
            setIsSignInVisible(true);
            setIsSignUpVisible(false);
          } else {
            setShowInitialScreen(false);
            setIsSignInVisible(false);
            setIsSignUpVisible(true);
          }
        } else {
          setEmailError(
            'There was an error checking the email. Please try again.'
          );
        }
      });
  };

  const handleBackToAuthModal = () => {
    setIsSignInVisible(false);
    setIsSignUpVisible(false);
    setShowInitialScreen(true);
  };
  const handleCloseSuccess = () => {
    setIsSignUpVisible(false);
    setIsSignInVisible(false);
  };
  const handleSignInSuccess = () => {
    handleClose();
  };
  const handleSignUpSuccess = () => {
    setHasSignedUp(true);
    setIsSignUpVisible(false);
    setIsSignInVisible(false);
  };
  const user = JSON.parse(localStorage.getItem(StorageKeys.USER));

  const userId = user ? user.userId : null;
  const handleUpdateProfile = () => {
    navigate(`profile/${userId}`);
  };

  return (
    <div>
      <Modal
        open={handleClickOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="bg-white shadow-md rounded p-4 text-center">
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 absolute top-2 right-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {showInitialScreen ? (
            <div>
              <div className="flex justify-center mb-4">
                <img
                  src="https://i.ibb.co/h9qBfDY/logoshoepee.png"
                  alt="Your Logo"
                  className="w-16 h-16"
                />
              </div>
              <h2 className="text-2xl font-bold mb-4">
                HELLO! WELCOME TO SHOEPEE
              </h2>
              <p className="text-gray-700 text-sm mb-4">
                We are glad to see you again! Please enter your email to
                continue.
              </p>
              <div className="text-left mb-4">
                <h3 className="text-lg font-bold mb-2">SIGN IN OR SIGN UP</h3>
                <label
                  htmlFor="Email"
                  className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <input
                    type="email"
                    id="emailInput"
                    placeholder="Enter your email (e.g., name@gmail.com)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                    required
                  />
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Email
                  </span>
                </label>
                {emailError && (
                  <div className="text-red-600 text-sm mt-1">{emailError}</div>
                )}
              </div>
              <button
                onClick={handleContinue}
                className="w-full text-white bg-red-900 hover:bg-black focus:ring-4 focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-800 dark:hover-bg-red-700 dark:focus-ring-blue-800"
              >
                {isLoading ? 'Loading...' : 'Continue'}{' '}
              </button>
            </div>
          ) : isSignInVisible ? (
            <SignIn
              goBack={handleBackToAuthModal}
              enteredEmail={enteredEmail}
              handleCloseSuccess={handleSignInSuccess}
            />
          ) : isSignUpVisible ? (
            <SignUp
              goBack={handleBackToAuthModal}
              enteredEmail={enteredEmail}
              handleCloseSuccess={handleSignUpSuccess}
            />
          ) : hasSignedUp ? (
            <div>
              <button onClick={handleUpdateProfile}>Update your profile</button>
            </div>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
