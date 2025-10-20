import React, { useRef, useEffect, useState, useCallback } from 'react';

interface CameraModalProps {
    productName: string;
    onClose: () => void;
    onCapture: (dataUrl: string) => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ productName, onClose, onCapture }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    const startCamera = useCallback(async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            setError("Could not access the camera. Please ensure permissions are granted and you are using a secure (HTTPS) connection.");
        }
    }, []);

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    }, [stream]);

    useEffect(() => {
        startCamera();
        return () => {
            stopCamera();
        };
    }, [startCamera, stopCamera]);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                onCapture(dataUrl);
            }
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-supeco-dark rounded-lg shadow-xl p-6 w-full max-w-2xl border border-supeco-light-gray">
                <h2 className="text-xl font-bold mb-4 text-white">Capture Photo for: <span className="text-supeco-yellow">{productName}</span></h2>
                
                <div className="relative bg-black rounded-md overflow-hidden mb-4 aspect-video">
                    {error ? (
                         <div className="flex items-center justify-center h-full text-center text-red-400 p-4">{error}</div>
                    ) : (
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
                    )}
                    <canvas ref={canvasRef} className="hidden"></canvas>
                </div>
                
                <div className="flex justify-end space-x-4">
                    <button 
                        onClick={onClose}
                        className="bg-supeco-light-gray text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleCapture}
                        disabled={!!error || !stream}
                        className="bg-supeco-yellow text-supeco-gray font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        Capture & Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CameraModal;