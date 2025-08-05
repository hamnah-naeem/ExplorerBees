import React, { useState } from 'react'
import ReelCard from '../components/ReelCard'
import VideoModal from '../components/VideoModal'
import Masonry from "react-masonry-css";


import reel1 from '../assets/reels/reel1.mp4'
import reel2 from '../assets/reels/reel2.mp4'
import reel3 from '../assets/reels/reel3.mp4'
import reel4 from '../assets/reels/reel4.mp4'
import reel5 from '../assets/reels/reel5.mp4'
import reel6 from '../assets/reels/reel6.mp4'
import Image1 from '../assets/reels/Image1.jpeg'
import reel7 from '../assets/reels/reel7.mp4'
import reel8 from '../assets/reels/reel8.mp4'
import reel9 from '../assets/reels/reel9.mp4'
import reel10 from '../assets/reels/reel10.mp4'
import reel11 from '../assets/reels/reel11.mp4'


const allReels = [
  { id: 1, src: reel1, type: 'video', title: "Nature" },
  { id: 2, src: reel2, type: 'video', title: "Nature" },
  { id: 3, src: reel3, type: 'video', title: "Animal" },
  { id: 4, src: reel4, type: 'video', title: "Animal" },
  { id: 5, src: reel5, type: 'video', title: "Nature" },
  { id: 6, src: reel6, type: 'video', title: "Animal" },
  { id: 7, src: Image1, type: 'Image', title: "Nature" },
  { id: 8, src: reel7, type: 'video', title: "Tech" },
  { id: 9, src: reel8, type: 'video', title: "Animal" },
  { id: 10, src: reel9, type: 'video', title: "Animal" },
  { id: 11, src: reel10, type: 'video', title: "Animal" },
  { id: 12, src: reel11, type: 'video', title: "Craft" },


]

const Media = () => {
  const [visibleReels, setVisibleReels] = useState(8)
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedVideo, setSelectedVideo] = useState(null)

  const handleLoadMore = () => {
    setLoading(true)
    setTimeout(() => {
      setVisibleReels((prev) => prev + 4)
      setLoading(false)
    }, 1000)
  }

  const filteredReels = allReels.filter((reel) =>
    reel.title?.toLowerCase().includes(searchText.toLowerCase())
  )



  return (
    <div className="bg-white min-h-screen text-black px-4 py-8">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-6">
        <span className="text-yellow-500">Media</span>{' '}
        <span className="text-black">Gallery</span>
      </h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search reels..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
        />
      </div>

      {/* Reels Grid */}
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
  {filteredReels.slice(0, visibleReels).map((reel) => (
    <ReelCard
      key={reel.id}
      src={reel.src}
      onClick={() => setSelectedVideo(reel.src)}
    />
  ))}
</div>



      {/* Show More Button */}
      {visibleReels < filteredReels.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-md transition"
          >
            {loading ? 'Loading...' : 'Show More'}
          </button>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          src={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  )
}

export default Media
