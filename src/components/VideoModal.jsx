import React, { useRef, useEffect, useState } from "react";
import { X, User, CheckCircle, Play, Pause, Download, Share2 } from "lucide-react";
import { isVideo, isImage, getUserImageURL , getMediaURL } from '../utils/helper';
import VideoPlayer from './VideoPlayer'; // Import the new VideoPlayer component

// Enhanced VideoModal that properly handles BOTH images and videos using VideoPlayer
const VideoModal = ({ reel, onClose }) => {
  const videoPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const mediaIsVideo = isVideo(reel);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Auto-play video when modal opens
  useEffect(() => {
    if (mediaIsVideo && videoPlayerRef.current) {
      setTimeout(() => {
        if (videoPlayerRef.current) {
          videoPlayerRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch((error) => {
            console.warn('Modal autoplay failed:', error);
          });
        }
      }, 100);
    }
  }, [mediaIsVideo]);

  const togglePlayPause = () => {
    if (mediaIsVideo && videoPlayerRef.current) {
      if (isPlaying) {
        videoPlayerRef.current.pause();
        setIsPlaying(false);
      } else {
        videoPlayerRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(console.error);
      }
    }
  };

  const handleVideoError = () => {
    console.error('Video error occurred for:', reel.src);
    setMediaError(true);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', reel.src);
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error('Image error occurred for:', reel.src);
    setMediaError(true);
  };

  const getImageSource = () => {
    if (mediaError) {
      return `https://ui-avatars.com/api/?name=${reel.username || 'User'}&size=800&background=f59e0b&color=000000`;
    }
    console.log('Using image source:', reel.src);
    return isImage(reel) ? getMediaURL(reel) : "";
  };

  const getFallbackImageSource = () => {
    return getUserImageURL(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <div className="relative w-[95vw] max-w-4xl max-h-[95vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-full transition z-20"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-4 left-4 flex space-x-2 z-20">
          <button className="bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full transition">
            <Download size={20} />
          </button>
          <button className="bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full transition">
            <Share2 size={20} />
          </button>
        </div>

        {/* Media Content */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          {mediaError ? (
            <div className="w-full h-96 flex items-center justify-center bg-gray-800 rounded-lg">
              <div className="text-center text-white">
                <div className="mb-4">
                  <img
                    src={getFallbackImageSource()}
                    alt="Fallback"
                    className="mx-auto rounded-full w-20 h-20"
                  />
                </div>
                <p className="text-lg mb-2">Media unavailable</p>
                <p className="text-gray-400 text-sm">
                  {mediaIsVideo ? 'Unable to load this video stream.' : 'Unable to load this image.'}
                </p>
                <p className="text-gray-500 text-xs mt-2">URL: {reel.src}</p>
              </div>
            </div>
          ) : mediaIsVideo ? (
            // VIDEO CONTENT using VideoPlayer component
            <div className="relative">
              <VideoPlayer
                ref={videoPlayerRef}
                mediaItem={reel}
                className="w-full h-auto max-h-[70vh] rounded-lg object-contain"
                autoPlay={false} // We handle autoplay manually
                loop={true}
                muted={true}
                playsInline={true}
                onError={handleVideoError}
                onLoadedData={() => console.log('Video data loaded')}
                onCanPlay={() => console.log('Video can play')}
              />

              {/* Video Info Badge */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded-full">
                <span className="text-white text-sm font-medium">
                  {getMediaURL(reel).includes('.m3u8') ? 'HLS VIDEO' : 'VIDEO'}
                </span>
              </div>
            </div>
          ) : (
            // IMAGE CONTENT  
            <div className="relative">
              <img
                src={getImageSource()}
                alt="Image content"
                className="w-full h-auto max-h-[70vh] rounded-lg object-contain"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            </div>
          )}

          {/* Bottom User Info Panel */}
          <div className="bg-white p-6 rounded-b-lg">
            <div className="flex items-start space-x-4">
              {/* User Avatar */}
              <div className="relative flex-shrink-0">
                {reel.user_image || reel.avatar ? (
                  <img
                    src={reel.avatar || reel.user_image}
                    alt={reel.username}
                    className="w-16 h-16 rounded-full border-3 border-yellow-600 object-cover"
                    onError={(e) => {
                      e.target.src = getFallbackImageSource();
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-yellow-600 border-3 border-yellow-600 flex items-center justify-center">
                    <User className="text-white" size={24} />
                  </div>
                )}
                
                {/* Verification Badge */}
                {reel.account_verify === '1' && (
                  <div className="absolute -bottom-1 -right-1">
                    <CheckCircle className="text-yellow-600 bg-white rounded-full border-2 border-white" size={20} />
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="text-black font-bold text-lg truncate">
                    {reel.username || reel.author || 'Unknown User'}
                  </h3>
                  {reel.account_verify === '1' && (
                    <CheckCircle className="text-yellow-600 flex-shrink-0" size={18} />
                  )}
                </div>
                
                {reel.name_user && reel.name_user !== reel.username && (
                  <p className="text-gray-600 font-medium mb-1">
                    {reel.name_user}
                  </p>
                )}
                
                <p className="text-gray-700 text-sm mb-2">
                  {reel.description || `${mediaIsVideo ? 'Video' : 'Image'} content by ${reel.username || 'user'}`}
                </p>
                
                {/* Media Info with URL for debugging */}
                <div className="flex flex-col space-y-1 text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full ${mediaIsVideo ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                      {mediaIsVideo ? (reel.src?.includes('.m3u8') ? 'HLS VIDEO' : 'VIDEO') : 'IMAGE'}
                    </span>
                    <span>ID: {reel.id}</span>
                    <span>Timeline: {reel.timeline_id}</span>
                    <span>File: {reel.name}</span>
                  </div>
                  <div className="text-xs text-gray-400 break-all">
                    URL: {reel.src}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
        aria-label="Close modal"
      />
    </div>
  );
};

export default VideoModal;