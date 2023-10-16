import React, { useState } from "react";

const OptionModal = () => {
  const brands = ["Nike", "Gucci", "Adidas", "Reebok", "Converse", "Vans"];

  return (
    <>
      <div className="flex justify-center mb-4">
        <img src="./logoshoepee.png" alt="Shoepee" className="w-16 h-16" />
      </div>
      <h3 className="pb-2 text-xl font-bold text-dark sm:text-2xl">
        STYLE OPTIONS
      </h3>
      <fieldset className="grid grid-cols-3 gap-4">
        <legend className="sr-only">Style Options</legend>

        <button className="group relative block h-64 sm:h-80 lg:h-96">
          <span className="absolute inset-0 border-2 border-dashed border-black"></span>

          <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
            <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
              <img
                src="https://images.vans.com/is/image/VansBrand/customs-oldskool-classic-1?$scale-original$&fmt=png8-alpha"
                alt="Old Skool"
                className="object-cover"
              />

              <h2 className="mt-4 text-xl font-medium sm:text-2xl">
                OLD SKOOL
              </h2>
            </div>

            <div className="absolute item p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
              <h3 className="mt-4 text-xl font-medium sm:text-2xl">
                OLD SKOOL
              </h3>
              <p className="mt-4 text-sm sm:text-base">
                The Classics that you know and love.
              </p>

              <p className="mt-8 font-bold">90$</p>
            </div>
          </div>
        </button>
        <button className="group relative block h-64 sm:h-80 lg:h-96">
          <span className="absolute inset-0 border-2 border-dashed border-black"></span>

          <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
            <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
              <img
                src="https://images.vans.com/is/image/VansBrand/customs-oldskool-classic-1?$scale-original$&fmt=png8-alpha"
                alt="Old Skool"
                className="object-cover"
              />

              <h2 className="mt-4 text-xl font-medium sm:text-2xl">
                OLD SKOOL
              </h2>
            </div>

            <div className="absolute item p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
              <h3 className="mt-4 text-xl font-medium sm:text-2xl">
                OLD SKOOL
              </h3>
              <p className="mt-4 text-sm sm:text-base">
                The Classics that you know and love.
              </p>

              <p className="mt-8 font-bold">95250$</p>
            </div>
          </div>
        </button>
        <button className="group relative block h-64 sm:h-80 lg:h-96">
          <span className="absolute inset-0 border-2 border-dashed border-black"></span>

          <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
            <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
              <img
                src="https://images.vans.com/is/image/VansBrand/customs-oldskool-classic-1?$scale-original$&fmt=png8-alpha"
                alt="Old Skool"
                className="object-cover"
              />

              <h2 className="mt-4 text-xl font-medium sm:text-2xl">
                OLD SKOOL
              </h2>
            </div>

            <div className="absolute item p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
              <h3 className="mt-4 text-xl font-medium sm:text-2xl">
                OLD SKOOL
              </h3>
              <p className="mt-4 text-sm sm:text-base">
                The Classics that you know and love.
              </p>

              <p className="mt-8 font-bold">902831$</p>
            </div>
          </div>
        </button>
      </fieldset>
    </>
  );
};

export default OptionModal;
