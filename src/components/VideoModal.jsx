import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";

const VideoModal = ({ src, onClose }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        };
    }, []);

    const handleClose = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        onClose();
    };

    const isVideo = /\.(mp4|webm|ogg)$/i.test(src); // Check if src is a video

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="relative w-[90vw] max-w-full max-h-[90vh] overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 left-3 bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition z-10"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>

                {/* Conditionally Render Video or Image */}
                {isVideo ? (
                    <video
                        ref={videoRef}
                        controls
                        className="w-full h-auto max-h-[90vh] rounded-lg shadow-lg object-contain"
                        src={src}
                        autoPlay
                    />
                ) : (
                    <img
                        src={src}
                        alt="Media content"
                        className="w-full h-auto max-h-[90vh] rounded-lg shadow-lg object-contain"
                    />
                )}
            </div>
        </div>
    );
};

export default VideoModal;
