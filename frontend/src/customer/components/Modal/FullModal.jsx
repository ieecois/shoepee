import React, { useEffect, useRef, useState } from 'react';
import OptionModal from './OptionModal';
import RadioCheck from './RadioCheck';
import { shoesData } from './shoeData';
import brandApi from '../../../api/brandApi';
import { Button } from '@mui/material';

const FullModal = (handleClickOpen, handleClose) => {
  const [brandList, setBrandList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await brandApi.getAll();
        setBrandList(data);
      } catch (error) {
        console.log('Non-response Error:', error.message);
      }
    })();
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('Nike');
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [optionModalOpen, setOptionModalOpen] = useState(false);

  const trigger = useRef(null);
  const modal = useRef(null);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const filteredShoes = shoesData.filter(
    (shoe) => shoe.brand === selectedBrand
  );
  const openOptionModal = (shoeId) => {
    setSelectedShoe(shoeId);
    setOptionModalOpen(true);
  };

  const closeOptionModal = () => {
    setOptionModalOpen(false);
  };

  return (
    <>
      <div className="z-9999 container mx-auto relative">
        <Button
          open={handleClickOpen}
          ref={trigger}
          onClick={openModal}
          variant="contained" color='inherit'
        >
          CUSTOMIZE YOUR SHOE
        </Button>
        <div
          className={`fixed top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${
            modalOpen ? 'block' : 'hidden'
          }`}
        >
          <div
            ref={modal}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          >
            <div className="w-full h-full bg-white py-2 px-2 text-center md:py-[20px] md:px-[20px]">
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 absolute top-4 right-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <header className="bg-gray-100 p-4">
                <div className="flex justify-center mb-4">
                  <img
                    src="./logoshoepee.png"
                    alt="Shoepee"
                    className="w-16 h-16"
                  />
                </div>
                <h3 className="pb-2 text-xl font-bold text-dark sm:text-2xl">
                  CHOOSE A STYLE OF BRAND
                </h3>
                <RadioCheck
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                  data={brandList}
                />
              </header>
              <div className="overflow-y-auto max-h-[500px] bg-light-yellow">
                <ul className="grid gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredShoes.map((shoe) => (
                    <li key={shoe.id}>
                      <button
                        onClick={() => openOptionModal(shoe.id)}
                        className="block ml-4 mb-4 overflow-hidden group"
                      >
                        <img
                          src={shoe.image}
                          alt={shoe.name}
                          className="w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="relative pt-3">
                          <h3 className="text-lg font-bold text-gray-700 group-hover:text-red-500">
                            {shoe.name}
                          </h3>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {optionModalOpen && (
            <OptionModal
              selectedShoe={selectedShoe}
              closeModal={closeOptionModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FullModal;
