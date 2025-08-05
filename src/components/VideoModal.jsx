import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";

// Simple VideoModal with bottom overlay
const VideoModal = ({ reel, onClose }) => {
  const videoRef = useRef(null);
  const isVideo = reel.src && /\.(mp4|webm|ogg)$/i.test(reel.src);

  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.play();
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isVideo]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="relative w-[90vw] max-w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Media Content */}
        {isVideo ? (
          <video
            ref={videoRef}
            className="w-full h-auto max-h-[90vh] rounded-lg shadow-lg object-contain"
            src={reel.src}
            autoPlay
            playsInline
            muted
          />
        ) : (
          <img
            src={reel.src}
            alt="Media content"
            className="w-full h-auto max-h-[90vh] rounded-lg shadow-lg object-contain"
          />
        )}

        {/* Bottom Overlay with User Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 rounded-b-lg">
          <div className="flex items-center">
            <img
              src={reel.avatar || `https://ui-avatars.com/api/?name=${reel.author}&background=random`}
              alt={reel.author}
              className="w-12 h-12 rounded-full mr-3 border-2 border-white"
            />
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg">{reel.author}</h3>
              <p className="text-gray-200 text-sm mt-1">{reel.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
