import React, { useState } from 'react';

// View 1: Upload Component

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

interface UploadViewProps {
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    setInstructions: React.Dispatch<React.SetStateAction<string>>;
    file: File | null;
    handleSubmit: () => void;
    instructions: string;
    uploadState: UploadState;
    setUploadState: React.Dispatch<React.SetStateAction<UploadState>>;
    setView: React.Dispatch<React.SetStateAction<'upload' | 'processing' | 'preview'>>;
}

type UploadCloudIconProps = {
  className?: string; // The '?' makes the prop optional
};

const FileIcon = ({ className }: UploadCloudIconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);

const XIcon = ({ className }: UploadCloudIconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const UploadCloudIcon = ({ className }: UploadCloudIconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m16 16-4-4-4 4" />
    </svg>
);

const AlertTriangleIcon = ({ className }: UploadCloudIconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};





    

const UploadBox: React.FC<UploadViewProps> = ({ setFile, setInstructions, handleSubmit, file, instructions, uploadState, setUploadState, setView }) => {
    const [isDragging, setIsDragging] = useState(false);
    
    
    

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (selectedFile: File) => {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setUploadState('uploading');
            // Simulate upload delay
            setTimeout(() => {
                setFile(selectedFile);
                setUploadState('success');
            }, 1500);
        } else {
            setFile(null);
            setUploadState('error');
        }
    };
    
    const handleDeleteFile = () => {
        setFile(null);
        setUploadState('idle');
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
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
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const isSubmitDisabled = uploadState !== 'success' || !instructions.trim();

    const getUploadBoxContent = () => {
        switch (uploadState) {
            case 'uploading':
                return (
                    <div className="flex flex-col items-center justify-center text-gray-500">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-lg">Uploading...</p>
                    </div>
                );
            case 'error':
                return (
                    <div className="flex flex-col items-center justify-center text-red-500">
                        <AlertTriangleIcon className="w-12 h-12" />
                        <p className="mt-4 text-lg font-semibold">Invalid File Type</p>
                        <p className="text-sm text-gray-500">Please upload a DOC, DOCX, or PDF file.</p>
                        <button onClick={handleDeleteFile} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                            Try Again
                        </button>
                    </div>
                );
            case 'success':
                return (
                    <div className="w-full p-4 flex items-center justify-between bg-white rounded-lg">
                        <div className="flex items-center gap-4">
                            <FileIcon className="w-10 h-10 text-blue-500" />
                            <div>
                                <p className="font-semibold text-gray-800 truncate max-w-xs">{file?.name}</p>
                                <p className="text-sm text-gray-500">{file ? formatBytes(file.size) : ''}</p>
                            </div>
                        </div>
                        <button onClick={handleDeleteFile} className="p-1 text-gray-400 hover:text-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>
                );
            case 'idle':
            default:
                return (
                    <div className="text-center">
                        <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-gray-600">
                            <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">DOC, DOCX, or PDF (MAX. 10MB)</p>
                    </div>
                );
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-8 space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">Resume Modifier</h1>
                <p className="mt-2 text-lg text-gray-600">Upload your resume and tell us what to change.</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label htmlFor="resume-upload" className="block text-sm font-medium text-gray-700 mb-1">
                        1. Upload Resume
                    </label>
                    <div
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className={`relative flex justify-center items-center w-full min-h-[12rem] px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors
                        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                        ${uploadState === 'success' ? 'bg-gray-50 border-gray-200 p-0' : 'hover:border-gray-400'}
                        ${uploadState === 'error' ? 'border-red-400 bg-red-50' : ''}`}
                    >
                       <input id="resume-upload" name="resume-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                       <label htmlFor="resume-upload" className={`w-full h-full absolute inset-0 cursor-pointer ${uploadState !== 'idle' ? 'hidden' : ''}`}></label>
                       {getUploadBoxContent()}
                    </div>
                </div>

                <div>
                     <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                        2. Modification Instructions
                    </label>
                    <textarea
                        id="instructions"
                        rows={6}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        disabled={uploadState === 'uploading'}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="e.g., 'Update my job title to Senior Software Engineer at TechCorp. Emphasize my experience with React and TypeScript. Reformat to a modern, single-column layout.'"
                    />
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
            >
                Submit
            </button>
        </div>
    );
};

export default UploadBox;