
// PodcastDetailPage.jsx
import React, { useState } from 'react';
import { Play, Clock, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { episodes } from '../dummy-data/podcast-data';
// import image1 from '../assets/images/podcast3.jpg'; // Remove this if image not working

const PodcastDetailPage = ({ podcast, onBack }) => {
  // State for load more functionality
  const [visibleEpisodes, setVisibleEpisodes] = useState(6); // Show 6 episodes initially
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleEpisodes(prev => Math.min(prev + 6, episodes.length));
      setIsLoadingMore(false);
    }, 500);
  };

  const hasMoreEpisodes = visibleEpisodes < episodes.length;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-yellow-600 flex items-center gap-2 transition-colors font-medium hover:translate-x-1 duration-200"
        >
          ← Back to Podcasts
        </button>

        {/* Podcast Header with Image */}
        <div
          className="relative flex flex-col md:flex-row gap-8 mb-10 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Reduced overlay opacity for better background visibility */}
          <div className="absolute inset-0 bg-white bg-opacity-40 md:bg-opacity-30 backdrop-blur-sm"></div>

          {/* Content Layer */}
          <div className="relative flex flex-col md:flex-row gap-8 p-8 w-full">
            <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-lg flex-shrink-0">
              <img
                src={podcast.image}
                alt={podcast.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <span className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                Public Podcast
              </span>
              <h1 className="text-5xl font-bold mb-4 text-gray-900 leading-tight">
                {podcast.title}
              </h1>
              <p className="text-gray-800 mb-6 text-lg leading-relaxed">
                {podcast.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-700 mb-8">
                <span className="font-semibold">{podcast.episodes} episodes</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span>{podcast.duration}</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span>by <span className="font-medium">{podcast.host}</span></span>
              </div>

              <div className="flex gap-3 flex-wrap">
                {/* Play Latest */}
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105 duration-200 text-sm">
                  <Play size={18} fill="white" />
                  Play Latest
                </button>

                {/* Heart */}
                <button className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white p-3 rounded-full transition-all hover:scale-105 duration-200 shadow-md hover:shadow-lg">
                  <Heart size={18} />
                </button>

                {/* Share */}
                <button className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white p-3 rounded-full transition-all hover:scale-105 duration-200 shadow-md hover:shadow-lg">
                  <Share2 size={18} />
                </button>

                {/* More */}
                <button className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white p-3 rounded-full transition-all hover:scale-105 duration-200 shadow-md hover:shadow-lg">
                  <MoreHorizontal size={18} />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Episodes Section */}
        <div className="bg-gray-50 rounded-3xl p-8 mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Episodes ({episodes.length} total)
          </h2>

          {/* Episodes Header */}
          <div className="flex items-center justify-between mb-6 text-gray-500 font-medium text-sm uppercase tracking-wide">
            <span className="w-8">#</span>
            <span className="flex-1 ml-6">Episode Title</span>
            <span className="w-28 text-center">Date Added</span>
            <span className="w-20 text-center">
              <Clock size={16} />
            </span>
          </div>

          {/* Episodes List - Show only visible episodes */}
          <div className="space-y-3">
            {episodes.slice(0, visibleEpisodes).map((episode, index) => (
              <div
                key={episode.id}
                className="flex items-center py-5 px-6 hover:bg-yellow-50 rounded-2xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-yellow-200 hover:shadow-sm"
              >
                <span className="w-8 text-center text-gray-500 group-hover:hidden font-semibold">
                  {index + 1}
                </span>
                <div className="w-8 text-center hidden group-hover:flex justify-center">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors shadow-md">
                    <Play size={14} fill="white" className="text-white ml-0.5" />
                  </div>
                </div>

                <div className="flex-1 ml-6">
                  <h4 className="font-bold mb-2 text-gray-900 group-hover:text-yellow-800 text-lg">
                    {episode.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {episode.description}
                  </p>
                </div>

                <span className="w-28 text-center text-sm text-gray-500 font-medium">
                  {episode.date}
                </span>
                <span className="w-20 text-center text-sm text-gray-600 font-semibold">
                  {episode.duration}
                </span>
              </div>
            ))}
          </div>

          {/* Load More Button - Updated with functionality */}
          {hasMoreEpisodes && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white px-8 py-3 rounded-full transition-all font-semibold hover:scale-105 duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:scale-100"
              >
                {isLoadingMore ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </div>
                ) : (
                  `Load More Episodes (${episodes.length - visibleEpisodes} remaining)`
                )}
              </button>
            </div>
          )}

          {/* Show completion message when all episodes are loaded */}
          {!hasMoreEpisodes && visibleEpisodes > 6 && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 font-medium">
                All {episodes.length} episodes loaded ✨
              </p>
            </div>
          )}
        </div>

        {/* Related Podcasts - Updated with yellow theme */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
                {/* Changed from indigo to yellow gradient */}
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={16} className="text-white" fill="white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Related Podcast {i}</h3>
                <p className="text-sm text-gray-600 mb-4">Interesting content you might enjoy</p>
                {/* Changed category badge to yellow theme */}
                <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                  Technology
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastDetailPage;