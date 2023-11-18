import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const modelSchema = Yup.object().shape({
  modelname: Yup.string().required('Please enter model name'),
  price: Yup.number().min(1, 'Price must be greater than 0').required('Please enter price'),
  imageurl: Yup.string().required('Please enter image url'),
});

const ModelForm = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={modelSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, values }) => (
      <Form>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Model Name
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4"></span>
              <Field
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus-border-primary"
                type="text"
                name="modelname"
                placeholder="Air"
              />
              <ErrorMessage name="modelname" component="div" className="error" />
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Price
            </label>
            <Field
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus-border-primary"
              type="number"
              name="price"
              placeholder="$0+"
            />
            <ErrorMessage name="price" component="div" className="error" />
          </div>
        </div>
        {/* Image URL Field */}
        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Img Url
          </label>
          <Field
            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name="imageurl"
          />
          <ErrorMessage name="imageurl" component="div" className="error" />
        </div>

        {/* Image Preview */}
        {values.imageurl && (
          <div className="relative mb-5.5 block w-full rounded border-2 border-dashed bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5">
            <img
              src={values.imageurl}
              alt="Preview"
              className="max-w-full h-auto"
            />
          </div>
        )}

        <div className="flex justify-end gap-4.5">
          <button
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
          >
            Cancel
          </button>
          <button
            className="flex justify-center rounded bg-black-2 dark:bg-white dark:text-black-2 py-2 px-6 font-medium text-white hover:shadow-1"
            type="submit"
            disabled={isSubmitting}
          >
            Save
          </button>
        </div>
      </Form>
    )}
  </Formik>
);

export default ModelForm;
