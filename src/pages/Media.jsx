import React, { useState } from 'react'
import ReelCard from '../components/ReelCard'
import VideoModal from '../components/VideoModal'
import { Search } from 'lucide-react';
import allReels from '../dummy-data/reels'


const Media = () => {
  const [visibleReels, setVisibleReels] = useState(12);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedReel, setSelectedReel] = useState(null);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleReels((prev) => prev + 4);
      setLoading(false);
    }, 1000);
  };

  const filteredReels = allReels.filter((reel) =>
    reel.title?.toLowerCase().includes(searchText.toLowerCase()) ||
    reel.author?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen text-black">
      {/* Simple Search Bar */}
      <div className="p-4">
        <div className="max-w-md mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d08700] focus:border-[#d08700]"
          />

        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
          {filteredReels.slice(0, visibleReels).map((reel) => (
            <div key={reel.id} className="break-inside-avoid mb-4">
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
            className="bg-[#d08700] hover:bg-[#a56400] text-black font-medium px-6 py-2 rounded-full transition"

            >
              {loading ? 'Loading...' : 'Show More'}
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredReels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No media found matching your search.</p>
          </div>
        )}
      </div>

      {/* Simple Video Modal */}
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


