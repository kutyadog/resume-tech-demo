import React, { useState } from 'react';

const FileDropBox: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      console.log('Dropped file:', file);
      // Here you can add logic to upload the file or process it further.
    }
  };

  const boxClass = `
    flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg
    w-96 h-96 text-center transition-colors duration-200 ease-in-out
    ${isDragging ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 bg-white text-gray-500'}
  `;

  return (
     <div className="w-128 rounded-lg bg-gray-200 p-4 shadow-lg">              
          <div
               className={boxClass}
               onDragEnter={handleDragEnter}
               onDragLeave={handleDragLeave}
               onDragOver={handleDragOver}
               onDrop={handleDrop}
          >
               <svg
               className="w-16 h-16 mb-2"
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
               >
               <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
               />
               </svg>
               <p className="font-semibold text-lg">Drag & Drop a File Here</p>
               <p className="text-sm">or click to browse</p>
          </div>
     </div>
  );
};

export default FileDropBox;