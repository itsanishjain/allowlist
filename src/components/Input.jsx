import React from "react";

const inputTagClasses = {
  smallInput:
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",

  largeInput:
    "block p-4  w-full h-24 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
};

const Input = ({ inputTagType, placeholder, onChange, value, name }) => (
  <div>
    {inputTagType === "smallInput" ? (
      <input
        type='text'
        className={inputTagClasses[inputTagType]}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    ) : (
      <textarea
        className={inputTagClasses[inputTagType]}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

export default Input;
