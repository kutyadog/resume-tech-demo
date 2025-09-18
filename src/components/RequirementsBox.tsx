// src/components/FormBox.tsx
import React, { useState } from 'react';

const RequirementBox: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [checkboxOne, setCheckboxOne] = useState(false);
  const [checkboxTwo, setCheckboxTwo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ inputValue, checkboxOne, checkboxTwo });
    // Handle form submission logic here
  };

  return (      
    <div className="flex-1 ml-4 rounded-lg bg-gray-100 p-4 shadow-lg items-center justify-center bg-gray-100">
      <div className=" rounded-lg bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Requirements</h1>
        <p className="mb-6 text-gray-600">Please provide your requirements below.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <textarea
              id="feedback"
              className="mt-1 block w-full resize-none rounded-md border border-gray-300 p-3 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={6}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your detailed feedback here..."
              required
            ></textarea>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="checkbox-1"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                checked={checkboxOne}
                onChange={(e) => setCheckboxOne(e.target.checked)}
              />
              <label htmlFor="checkbox-1" className="ml-2 text-sm text-gray-700">
                I agree to the terms and conditions.
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="checkbox-2"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                checked={checkboxTwo}
                onChange={(e) => setCheckboxTwo(e.target.checked)}
              />
              <label htmlFor="checkbox-2" className="ml-2 text-sm text-gray-700">
                Subscribe to our newsletter.
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequirementBox;

