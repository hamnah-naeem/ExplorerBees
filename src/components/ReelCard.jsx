
import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Search } from 'lucide-react';

// ReelCard Component with masonry styling
const ReelCard = ({ reel, onClick }) => {
  const videoRef = useRef(null);
  const isVideo = reel.src && reel.src.match(/\.(mp4|webm|ogg)$/i);

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

  // Random heights for masonry effect
  const heights = ['h-48', 'h-64', 'h-80', 'h-96', 'h-52', 'h-72'];
  const randomHeight = heights[Math.floor(Math.random() * heights.length)];

  return (
    <div
      onClick={() => onClick(reel)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer rounded-xl overflow-hidden shadow-lg bg-white ${randomHeight} group hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
    >
      {isVideo ? (
        <>
          <video
            ref={videoRef}
            src={reel.src}
            muted
            loop
            preload="metadata"
            controls={false}
            className="w-full h-full object-cover"
          />
          {/* Play overlay */}
          <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
          </div>
          {/* Video indicator */}
          <div className="absolute top-3 right-3 bg-black bg-opacity-60 p-1 rounded-lg">
            <Play className="text-white" size={12} />
          </div>
        </>
      ) : (
        <>
          <img
            src={reel.src}
            alt="Media content"
            className="w-full h-full object-cover"
          />
          {/* Hover overlay for images */}
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        </>
      )}
      
      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default ReelCard;