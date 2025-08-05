import React, { useRef } from 'react';

const ReelCard = ({ src, onClick }) => {
  const videoRef = useRef(null);
  const isVideo = src.match(/\.(mp4|webm|ogg)$/i);

  const handleMouseEnter = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer rounded overflow-hidden shadow-lg bg-white w-full max-h-[400px] aspect-[9/16]"
    >
      {isVideo ? (
        <>
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            preload="metadata"
            controls={false}
            className="w-full h-full object-cover"
          />
          {/* Reels icon with white background and rounded corners */}
          <div className="absolute top-2 right-2 bg-white p-1 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="#000"
            >
              <path d="M21 3H3v18h18V3zm-2 16H5V5h14v14zM8.75 9.4c0-.58.63-.95 1.13-.63l5.25 3.3a.75.75 0 010 1.26l-5.25 3.3a.75.75 0 01-1.13-.63V9.4z" />
              <path d="M9.88 4.25L4.25 10h2.5l5.63-5.75h-2.5z" fill="#000" />
            </svg>
          </div>
        </>
      ) : (
        <img
          src={src}
          alt="Reel"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default ReelCard;