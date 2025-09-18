import { useState } from 'react';
import UploadBox from './components/DropBox';
import ProcessingView from './components/ProcessingView';
import PreviewView from './components/PreviewResultsView';
type UploadState = 'idle' | 'uploading' | 'success' | 'error';
type View = 'upload' | 'processing' | 'preview';
type ProcessingStage = { name: string; progress: number };

export default function App() {
    const [view, setView] = useState<View>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [uploadState, setUploadState] = useState<UploadState>('idle');
    const [instructions, setInstructions] = useState('');

    // State for the processing view
    const [processingStage, setProcessingStage] = useState<ProcessingStage>({ name: 'Initializing...', progress: 0 });
    const [processingError, setProcessingError] = useState<string | null>(null);


    const startProcessing = () => {
        setView('processing');
        setProcessingError(null);
        
        const stages = [
            { name: 'Processing resume...', progress: 25, delay: 1000 },
            { name: 'Analyzing content...', progress: 50, delay: 1500 },
            { name: 'Building new format...', progress: 75, delay: 2000 },
            { name: 'Finishing up...', progress: 100, delay: 1000 },
        ];
        
        let cumulativeDelay = 0;
        stages.forEach(stage => {
            cumulativeDelay += stage.delay;
            setTimeout(() => {
                setProcessingStage({ name: stage.name, progress: stage.progress });
            }, cumulativeDelay - stage.delay);
        });
        
        // Simulate a potential error (20% chance)
        const willError = Math.random() < 0.2;

        setTimeout(() => {
            if (willError) {
                setProcessingError("Failed to analyze resume structure. Please try a different file.");
            } else {
                setView('preview');
            }
        }, cumulativeDelay + 500);
    };

    const handleSubmit = () => {
        startProcessing();
    };

    const handleStartOver = () => {
        setView('upload');
        // Keep file and instructions, but reset upload state to success to show file info
        setUploadState('success'); 
    };

    const handleUploadNew = () => {
        // Reset to the very beginning, but keep instructions for convenience
        setFile(null);
        setUploadState('idle');
        setView('upload');
    };


    const renderView = () => {
        switch (view) {
            case 'upload':
                return (
                    <UploadBox
                        file={file}
                        setFile={setFile}
                        instructions={instructions}
                        setInstructions={setInstructions}
                        uploadState={uploadState}
                        setUploadState={setUploadState}
                        setView={setView}
                        handleSubmit={handleSubmit}
                    />
                );
            case 'processing':
                return (
                    <ProcessingView 
                        processingStage={processingStage}
                        processingError={processingError}
                        handleStartOver={handleStartOver}
                    />
                );
            case 'preview':
                return (
                    <PreviewView
                        handleUploadNew={handleUploadNew}
                    />
                );
            default:
                return <div>Error: Unknown view</div>;
        }
    };

    return (
        <main className="bg-slate-100 min-h-screen flex items-center justify-center font-sans antialiased text-gray-900 p-4">
           <div className="w-full h-full">
              {renderView()}
           </div>
        </main>
    );
}
