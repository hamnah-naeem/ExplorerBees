import React, { useState, useEffect } from 'react';
import ReelCard from '../components/ReelCard';
import VideoModal from '../components/VideoModal';
import { endpoints } from "../apis/endpoints";
import { Search, Loader } from 'lucide-react';
import { 
  getTrendingMedia,  
  getMediaURL, 
  getVideoThumbnailURL, 
  getUserImageURL,
} from '../utils/helper';

const Media = () => {
  const [mediaData, setMediaData] = useState([]);
  const [visibleReels, setVisibleReels] = useState(12);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedReel, setSelectedReel] = useState(null);
  const [mediaType, setMediaType] = useState('all');
  const [error, setError] = useState(null);
  

  // Transform API data to match component structure
  const transformApiData = (apiResponse) => {
    
    const transformedData = [];
    
    if (apiResponse.error === false && apiResponse.records && Array.isArray(apiResponse.records)) {
      apiResponse.records.forEach(userRecord => {
        if (userRecord.media && Array.isArray(userRecord.media)) {
          userRecord.media.forEach(mediaItem => {
            const transformedItem = {
              id: mediaItem.id,
              timeline_id: mediaItem.timeline_id,
              name: mediaItem.name,
              video_thumbnail: getVideoThumbnailURL(mediaItem),
              type: mediaItem.type,
              src: getMediaURL(mediaItem),
              username: userRecord.username,
              name_user: userRecord.name,
              user_image: getUserImageURL(userRecord.user_image),
              account_verify: userRecord.account_verify,
              description: `Content by ${userRecord.name || userRecord.username}`,
              author: userRecord.name,
              avatar: getUserImageURL(userRecord.user_image)
            };
            
            console.log('Transformed item:', transformedItem);
            transformedData.push(transformedItem);
          });
        }
      });
    }
    
    console.log('Total transformed items:', transformedData.length);
    return transformedData;
  };

  // Fetch media from API with better error handling
  const fetchMediaData = async (type = 'all', limit = 20, offset = 0) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`Fetching media: type=${type}, limit=${limit}, offset=${offset}`);
      
      const data = await getTrendingMedia(type, limit, offset);
      
      if (data.error === false) {
        const transformedData = transformApiData(data);
        
        if (transformedData.length === 0) {
          console.warn('No media items found in API response');
          setError('No media found. The API returned empty results.');
        }
        
        if (offset === 0) {
          setMediaData(transformedData);
        } else {
          setMediaData(prev => [...prev, ...transformedData]);
        }
      } else {
        console.error('API returned error:', data.error_msg);
        setError(`API Error: ${data.error_msg || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error fetching media data:', error);
      setError(`Network Error: ${error.message}`);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    console.log('Initial data load, media type:', mediaType);
    fetchMediaData(mediaType);
  }, [mediaType]);

  const handleLoadMore = () => {
    const currentOffset = mediaData.length;
    console.log('Loading more data, offset:', currentOffset);
    fetchMediaData(mediaType, 12, currentOffset);
  };

  // Filter media based on search and type
  const filteredReels = mediaData.filter((reel) => {
    const searchLower = searchText.toLowerCase().trim();
    const matchesSearch = !searchLower || (
      reel.name?.toLowerCase().includes(searchLower) ||
      reel.username?.toLowerCase().includes(searchLower) ||
      reel.name_user?.toLowerCase().includes(searchLower) ||
      reel.description?.toLowerCase().includes(searchLower)
    );

    const matchesType = mediaType === 'all' || reel.type === mediaType;
    
    return matchesSearch && matchesType;
  });

  // Reset visible reels when search changes
  useEffect(() => {
    setVisibleReels(12);
  }, [searchText, mediaType]);

  // Debug current state
  useEffect(() => {
    console.log('Current state:', {
      mediaDataLength: mediaData.length,
      filteredReelsLength: filteredReels.length,
      visibleReels,
      loading,
      initialLoading,
      error,
      mediaType,
      searchText
    });
  }, [mediaData, filteredReels, visibleReels, loading, initialLoading, error, mediaType, searchText]);

  return (
    <div className="bg-white min-h-screen text-black">
      {/* Header with Search and Filters */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by title, author, or username..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
            />
          </div>

          {/* Media Type Filter */}
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setMediaType('all')}
              className={`px-4 py-2 rounded-full font-medium transition ${
                mediaType === 'all'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Media ({mediaData.length})
            </button>
            <button
              onClick={() => setMediaType('0')}
              className={`px-4 py-2 rounded-full font-medium transition ${
                mediaType === '0'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Images ({mediaData.filter(item => item.type === '0').length})
            </button>
            <button
              onClick={() => setMediaType('1')}
              className={`px-4 py-2 rounded-full font-medium transition ${
                mediaType === '1'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Videos ({mediaData.filter(item => item.type === '1').length})
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="bg-red-100 border-l-4 border-red-600 p-3 rounded">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Search Results Info */}
      {searchText && !initialLoading && (
        <div className="text-center py-2">
          <p className="text-gray-600 text-sm">
            {filteredReels.length > 0 
              ? `Found ${filteredReels.length} result${filteredReels.length === 1 ? '' : 's'} for "${searchText}"`
              : `No results found for "${searchText}"`
            }
          </p>
        </div>
      )}

      {/* Loading State */}
      {initialLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader className="h-8 w-8 animate-spin text-yellow-600" />
          <span className="ml-2 text-gray-600">Loading media...</span>
        </div>
      )}

      {/* Media Grid */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {!initialLoading && filteredReels.length > 0 ? (
          <>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
              {filteredReels.slice(0, visibleReels).map((reel, index) => (
                <div key={`${reel.id}-${reel.timeline_id}-${index}`} className="break-inside-avoid mb-4">
                  <ReelCard
                    reel={reel}
                    onClick={setSelectedReel}
                  />
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {visibleReels < filteredReels.length && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white font-medium px-6 py-2 rounded-full transition flex items-center mx-auto"
                >
                  {loading && <Loader className="h-4 w-4 animate-spin mr-2" />}
                  {loading ? 'Loading...' : `Show More (${filteredReels.length - visibleReels} remaining)`}
                </button>
              </div>
            )}
          </>
        ) : !initialLoading ? (
          /* No Results */
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No media found</p>
              <p className="text-gray-400 text-sm">
                {searchText 
                  ? `No content matches "${searchText}". Try searching for different terms.`
                  : "No media available. Check the API connection or try refreshing the page."
                }
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Video Modal */}
      {selectedReel && (
        <VideoModal
          reel={selectedReel}
          onClose={() => setSelectedReel(null)}
        />
      )}
    </div>
  );
};

export default Media;