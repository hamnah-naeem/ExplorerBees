import React, { useState, useRef, useEffect } from 'react';
import { Play, User, CheckCircle } from 'lucide-react';
import { isVideo, isImage, getUserImageURL, getVideoThumbnailURL, getMediaURL } from '../utils/helper';
import VideoPlayer from './VideoPlayer'; // Import the new VideoPlayer component

// ReelCard Component with proper image/video handling using VideoPlayer
const ReelCard = ({ reel, onClick }) => {
  const videoPlayerRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const mediaIsVideo = isVideo(reel);
  const mediaIsImage = isImage(reel);

  // Debug log when component mounts
  useEffect(() => {
    console.log('ReelCard mounted with reel:', reel);
    console.log('Media type - Video:', mediaIsVideo, 'Image:', mediaIsImage);
    console.log('Video thumbnail:', reel.video_thumbnail);
  }, [reel, mediaIsVideo, mediaIsImage]);

  const handleMouseEnter = () => {
    if (mediaIsVideo && videoPlayerRef.current) {
      videoPlayerRef.current.play().catch((error) => {
        // Ignore errors for hover previews
        console.warn('Preview play failed:', error.message);
      });
    }
  };

  const handleMouseLeave = () => {
    if (mediaIsVideo && videoPlayerRef.current) {
      videoPlayerRef.current.pause();
      videoPlayerRef.current.currentTime = 0;
    }
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully for reel:', reel.id);
    setIsLoading(false);
  };

  const handleImageError = (e) => {
    console.error('Image failed to load for reel:', reel.id, 'URL:', e.target.src);
    setImageError(true);
    setIsLoading(false);
  };

  const handleVideoError = () => {
    console.error('Video error occurred for reel:', reel.id);
    setVideoError(true);
    setIsLoading(false);
  };

  // Random heights for masonry effect
  const heights = ['h-48', 'h-64', 'h-80', 'h-96', 'h-52', 'h-72'];
  const randomHeight = heights[Math.floor(Math.random() * heights.length)];

  // Get the correct image source with better fallback logic
  const getImageSource = () => {
    if (imageError) {
      console.log('Using placeholder due to image error');
      return getUserImageURL(null);
    }

    if (mediaIsVideo) {
      // For videos, use thumbnail first, then fallback
      const thumbnailUrl = getVideoThumbnailURL(reel);
      console.log('666 Using video thumbnail:', thumbnailUrl);
      return thumbnailUrl;
    } else {
      // For images, use the proper media URL
      const imageUrl = getMediaURL(reel);
      console.log('666 Using image source:', imageUrl);
      return imageUrl;
    }
  };

  const getFallbackUserImage = () => {
    return getUserImageURL(null);
  };

  // Debug the source being used
  const currentImageSource = getImageSource();
  console.log(`777 ReelCard ${reel.id} using image source:`, currentImageSource);

  return (
    <div
      onClick={() => onClick(reel)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer rounded-xl overflow-hidden shadow-lg bg-white ${randomHeight} group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100`}
    >
      {mediaIsVideo ? (
        <>
          {/* Hidden video for hover preview using VideoPlayer */}
          <div
            className="relative w-full h-full"
            onMouseEnter={() => videoPlayerRef.current?.play()}
            onMouseLeave={() => videoPlayerRef.current?.pause()}
          >
            <VideoPlayer
              ref={videoPlayerRef}
              mediaItem={reel}
              autoPlay={false}   // keep false so it doesn’t auto play
              loop={true}
              muted={true}
              playsInline={true}
              previewMode={true}
              onError={handleVideoError}
              className="w-full h-full object-cover"
            />
          </div>


          {/* Video thumbnail - always visible */}
          {/* <img
            style={{ backgroundColor: 'red' }}
            src={currentImageSource}
            alt={reel.name || 'Video thumbnail'}
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          /> */}
        </>
      ) : (
        <>
          {/* Image display */}
          <img
            style={{ backgroundColor: 'red' }}
            src={currentImageSource}
            alt={reel.name || 'Image content'}
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </>
      )}

      {/* User info overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center space-x-2">
          <div className="relative">
            {reel.user_image || reel.avatar ? (
              <img
                src={reel.avatar || reel.user_image}
                alt={reel.username}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                onError={(e) => {
                  console.log('User avatar failed, using fallback');
                  e.target.src = getFallbackUserImage();
                }}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-yellow-600 border-2 border-white flex items-center justify-center">
                <User className="text-white" size={16} />
              </div>
            )}

            {/* Verification badge */}
            {reel.account_verify === '1' && (
              <div className="absolute -top-1 -right-1">
                <CheckCircle className="text-yellow-600 bg-white rounded-full" size={16} />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">
              {reel.username || reel.author || 'Unknown User'}
            </p>
            {reel.name_user && reel.name_user !== reel.username && (
              <p className="text-gray-300 text-xs truncate">
                {reel.name_user}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Media type indicator */}
      <div className="absolute top-3 left-3 bg-black bg-opacity-60 px-2 py-1 rounded-full">
        <span className="text-white text-xs font-medium">
          {mediaIsVideo ? 'VIDEO' : 'IMAGE'}
        </span>
      </div>

      {/* Debug info overlay (remove in production) */}
      <div className="absolute bottom-3 right-3 bg-red-600 text-white text-xs px-1 py-0.5 rounded opacity-75">
        ID: {reel.id}
      </div>
    </div>
  );
};

export default ReelCard;