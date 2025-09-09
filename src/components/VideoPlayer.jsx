import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { getMediaURL } from '../utils/helper';

// VideoPlayer component that handles all video logic (HLS.js, MP4, etc.)
const VideoPlayer = forwardRef(({ 
  mediaItem, 
  className = "", 
  autoPlay = false, 
  loop = true, 
  muted = true, 
  playsInline = true, 
  controls = false,
  onError,
  onLoadedData,
  onCanPlay,
  previewMode = false, // For ReelCard hover previews
  ...props 
}, ref) => {
  const videoRef = useRef(null);
  const [hlsLoaded, setHlsLoaded] = useState(false);
  const [hlsInstance, setHlsInstance] = useState(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  // Expose video controls to parent components
  useImperativeHandle(ref, () => ({
    play: () => {
      if (videoRef.current && videoReady) {
        return videoRef.current.play();
      }
      return Promise.reject('Video not ready');
    },
    pause: () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    },
    get currentTime() {
      return videoRef.current?.currentTime || 0;
    },
    set currentTime(value) {
      if (videoRef.current) {
        videoRef.current.currentTime = value;
      }
    },
    get paused() {
      return videoRef.current?.paused ?? true;
    },
    get duration() {
      return videoRef.current?.duration || 0;
    },
    videoElement: videoRef.current
  }));

  // Load HLS.js from CDN if needed
  useEffect(() => {
    if (!mediaItem || !getMediaURL(mediaItem).includes('.m3u8')) {
      setHlsLoaded(true); // Not needed for non-HLS videos
      return;
    }

    const loadHLS = () => {
      // Check if HLS.js is already loaded
      if (window.Hls) {
        setHlsLoaded(true);
        return;
      }

      // Load HLS.js from CDN
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
      script.onload = () => {
        console.log('HLS.js loaded successfully');
        setHlsLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load HLS.js');
        setHlsLoaded(false);
        setVideoError(true);
      };
      document.head.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    };

    loadHLS();
  }, [mediaItem]);

  // Initialize video when HLS is loaded and mediaItem changes
  useEffect(() => {
    let hls = null;
    let isComponentMounted = true;

    const initializeVideo = async () => {
      if (!mediaItem || !videoRef.current || videoError || !hlsLoaded) {
        console.log('Video initialization skipped:', { 
          hasMediaItem: !!mediaItem, 
          hasVideoRef: !!videoRef.current, 
          videoError, 
          hlsLoaded 
        });
        return;
      }
      
      const video = videoRef.current;
      const videoSrc = getMediaURL(mediaItem);

      console.log('Initializing video with URL:', videoSrc);

      try {
        // Reset video state
        video.pause();
        setVideoReady(false);

        // Check if it's an HLS stream
        if (videoSrc.includes('.m3u8')) {
          console.log('Detected HLS stream');
          
          if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support (Safari)
            console.log('Using native HLS support');
            video.src = videoSrc;
            
            const handleCanPlay = () => {
              if (isComponentMounted) {
                console.log('Video ready with native HLS');
                setVideoReady(true);
                
                if (autoPlay) {
                  setTimeout(() => {
                    if (isComponentMounted && videoRef.current) {
                      video.play().catch((error) => {
                        console.warn('Native HLS autoplay error:', error.message);
                        if (error.name !== 'AbortError' && isComponentMounted && onError) {
                          onError();
                        }
                      });
                    }
                  }, 100);
                }
              }
            };
            
            video.addEventListener('canplay', handleCanPlay, { once: true });
            
          } else if (window.Hls && window.Hls.isSupported()) {
            // Use HLS.js for other browsers
            console.log('Using HLS.js');
            hls = new window.Hls({
              debug: false,
              enableWorker: false,
              lowLatencyMode: false,
            });
            
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            
            hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
              console.log('HLS manifest parsed successfully');
              if (isComponentMounted) {
                setVideoReady(true);
                
                if (autoPlay) {
                  setTimeout(() => {
                    if (isComponentMounted && videoRef.current) {
                      video.play().catch((error) => {
                        console.warn('HLS.js autoplay error:', error.message);
                        if (error.name !== 'AbortError' && isComponentMounted && onError) {
                          onError();
                        }
                      });
                    }
                  }, 100);
                }
              }
            });

            hls.on(window.Hls.Events.ERROR, (event, data) => {
              console.error('HLS error:', data);
              if (isComponentMounted && data.fatal) {
                setVideoError(true);
                if (onError) onError();
              }
            });

            setHlsInstance(hls);
          } else {
            console.error('HLS not supported on this browser');
            if (isComponentMounted) {
              setVideoError(true);
              if (onError) onError();
            }
          }
        } else {
          // Regular MP4 video
          console.log('Using regular MP4 video');
          video.src = videoSrc;
          
          const handleCanPlay = () => {
            if (isComponentMounted) {
              console.log('MP4 video ready');
              setVideoReady(true);
              
              if (autoPlay) {
                setTimeout(() => {
                  if (isComponentMounted && videoRef.current) {
                    video.play().catch((error) => {
                      console.warn('MP4 autoplay error:', error.message);
                      if (error.name !== 'AbortError' && isComponentMounted && onError) {
                        onError();
                      }
                    });
                  }
                }, 100);
              }
            }
          };
          
          video.addEventListener('canplay', handleCanPlay, { once: true });
        }
      } catch (error) {
        console.error('Video initialization error:', error);
        if (isComponentMounted) {
          setVideoError(true);
          if (onError) onError();
        }
      }
    };

    if (mediaItem && hlsLoaded) {
      initializeVideo();
    }
    
    return () => {
      isComponentMounted = false;
      if (hls) {
        hls.destroy();
        hls = null;
      }
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setVideoReady(false);
    };
  }, [mediaItem, hlsLoaded, autoPlay, onError]);

  // Handle video events
  const handleVideoError = (e) => {
    console.error('Video error occurred for:', getMediaURL(mediaItem));
    setVideoError(true);
    if (onError) onError(e);
  };

  const handleLoadedData = (e) => {
    console.log('Video data loaded');
    if (onLoadedData) onLoadedData(e);
  };

  const handleCanPlay = (e) => {
    console.log('Video can play');
    if (onCanPlay) onCanPlay(e);
  };

  if (!mediaItem) {
    return null;
  }

  if (videoError) {
    return (
      <div className={`flex items-center justify-center bg-gray-800 text-white ${className}`}>
        <div className="text-center p-4">
          <p>Video unavailable</p>
          <p className="text-xs text-gray-400 mt-1">Failed to load video stream</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!hlsLoaded && getMediaURL(mediaItem).includes('.m3u8') && (
        <div className={`absolute inset-0 bg-gray-800 flex items-center justify-center z-10 ${className}`}>
          <div className="text-white text-center">
            <p>Loading video player...</p>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        className={className}
        autoPlay={true} // We handle autoplay manually
        loop={loop}
        playsInline={playsInline}
        muted={muted}
        controls={controls}
        onError={handleVideoError}
        onLoadedData={handleLoadedData}
        onCanPlay={handleCanPlay}
        {...props}
      />
    </>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;