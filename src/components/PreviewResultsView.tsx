import React, { useRef } from 'react';
import { useReactToPrint } from "react-to-print";

type PreviewViewProps = {
    handleModify: () => void;
    handleUploadNew: () => void;
    modifications: string;
    setModifications: React.Dispatch<React.SetStateAction<string>>;
    isModifying: boolean;
};

type UploadCloudIconProps = {
  className?: string; // The '?' makes the prop optional
};

const DownloadIcon = ({ className }: UploadCloudIconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const PreviewView: React.FC<PreviewViewProps> = ({ handleModify, handleUploadNew, modifications, setModifications, isModifying }) => {
    const isModifyDisabled = !modifications.trim() || isModifying;
    
    const contentRef = useRef<HTMLDivElement>(null);
    // const reactToPrintFn = useReactToPrint({ contentRef });

    const reactToPrintFn = useReactToPrint({
       documentTitle: 'Formatted-Resume-John-Doe',
       contentRef: contentRef,
    })

    return (
        <div className="w-full max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left side: Preview */}
            <div className="lg:col-span-3">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your New Resume</h2>
                <div className="relative w-full aspect-[8.5/11] bg-white rounded-lg shadow-lg border border-gray-200 p-8 overflow-hidden" ref={contentRef}>
                    {/* Fake PDF Content */}
                    <div className="space-y-4 text-sm text-gray-700">
                        <div className="text-center border-b pb-4">
                            <h3 className="text-2xl font-bold">John Doe</h3>
                            <p>john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-blue-600">Senior Software Engineer</h4>
                            <p>Experienced software engineer with a demonstrated history of working in the computer software industry. Skilled in React, TypeScript, and Node.js. Strong engineering professional with a Bachelor's degree focused in Computer Science.</p>
                        </div>
                         <div>
                            <h4 className="font-bold text-blue-600 border-t pt-4">Experience</h4>
                            <p className="font-semibold">TechCorp - Senior Software Engineer</p>
                            <p className="text-xs text-gray-500">2020 - Present</p>
                            <ul className="list-disc list-inside mt-1 text-xs">
                                <li>Developed and maintained web applications using React and TypeScript.</li>
                                <li>Collaborated with cross-functional teams to define, design, and ship new features.</li>
                                <li>Mentored junior developers and conducted code reviews.</li>
                            </ul>
                        </div>
                    </div>
                    {isModifying && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-lg text-gray-700">Applying modifications...</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right side: Controls */}
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Next Steps</h2>
                <div className="space-y-4">
                    <button
                        onClick={reactToPrintFn}
                        disabled={isModifying}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        <DownloadIcon className="w-6 h-6" />
                        Download PDF
                    </button>
                     <button
                        onClick={handleUploadNew}
                        disabled={isModifying}
                        className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Upload New Resume
                    </button>
                </div>
                <div className="border-t pt-6">
                    <label htmlFor="modifications" className="block text-sm font-medium text-gray-700">
                        Further Modifications
                    </label>
                    <textarea
                        id="modifications"
                        rows={6}
                        value={modifications}
                        onChange={(e) => setModifications(e.target.value)}
                        disabled={isModifying}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="e.g., 'Change the accent color to dark green. Add a section for my personal projects.'"
                    />
                     <button
                        onClick={handleModify}
                        disabled={isModifyDisabled}
                        className="mt-2 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        Modify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreviewView