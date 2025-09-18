import React from 'react';

type ProcessingStage = { name: string; progress: number };

type ProcessingViewProps = {
    processingStage: ProcessingStage;
    processingError: string | null;
    handleStartOver: () => void;
};

type UploadCloudIconProps = {
  className?: string; // The '?' makes the prop optional
};

const AlertTriangleIcon = ({ className }: UploadCloudIconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

const ProcessingView: React.FC<ProcessingViewProps> = ({ processingStage, processingError, handleStartOver }) => {
    return (
        <div className="w-full max-w-2xl mx-auto p-8 flex flex-col items-center justify-center text-center space-y-6 min-h-[30rem]">
            {!processingError ? (
                <>
                    <h2 className="text-3xl font-bold text-gray-800">{processingStage.name}</h2>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${processingStage.progress}%` }}
                        ></div>
                    </div>
                    <p className="text-gray-600">Please wait while we work our magic...</p>
                </>
            ) : (
                <>
                    <div className="text-red-500">
                        <AlertTriangleIcon className="w-16 h-16 mx-auto" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">An Error Occurred</h2>
                    <p className="text-gray-600">{processingError}</p>
                    <button
                        onClick={handleStartOver}
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Start Over
                    </button>
                </>
            )}
        </div>
    );
};

export default ProcessingView;