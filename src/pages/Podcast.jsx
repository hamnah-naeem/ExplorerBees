import React, { useState } from 'react';
import { Play, Pause, Headphones, Volume2 } from 'lucide-react';
import podcast from '../assets/images/podcast/podcast.png';



const PodcastPlatform = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180); // 3 minutes

  // Sample podcast data
  const weeklyPodcasts = [
    {
      id: 1,
      title: "Design mistake in UI",
      author: "by Jonathan Jim",
      duration: "43:00",
      bgColor: "bg-yellow-400",
      textColor: "text-gray-900"
    },
    {
      id: 2,
      title: "Every day life",
      author: "by Kerry Jim",
      duration: "50:21",
      bgColor: "bg-orange-400",
      textColor: "text-gray-900"
    },
    {
      id: 3,
      title: "Make it simple",
      author: "by Jonathan",
      duration: "38:00",
      bgColor: "bg-blue-500",
      textColor: "text-white"
    }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Audio waveform bars component
  const AudioWaveform = () => {
    const bars = Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className={`w-1 bg-gray-600 rounded-full transition-all duration-300 ${
          isPlaying ? 'animate-pulse' : ''
        }`}
        style={{
          height: `${Math.random() * 30 + 10}px`,
          animationDelay: `${i * 0.1}s`
        }}
      />
    ));
    return <div className="flex items-end space-x-1">{bars}</div>;
  };

const MicrophoneIllustration = () => (
  <div className="relative -ml-12 flex justify-center">
    {/* Glowing Yellow Circle */}
    <div className="absolute bottom-12 w-60 h-60 bg-yellow-600 rounded-full z-0 shadow-2xl animate-pulse" />

    {/* Mic Image */}
    <img
      src={podcast}
      alt="Podcast Illustration"
      className="w-[600px]  object-contain drop-shadow-2xl transform -scale-x-100 z-10 relative -top-28"
    />

    {/* Audio Player Section - Absolutely Positioned */}
    <div className="absolute -bottom-15 flex items-center space-x-4 bg-gray-50 rounded-2xl p-4 z-20 shadow-lg ">
      <button
        onClick={togglePlay}
        className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-full transition-colors shadow-lg "
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
      </button>
      <AudioWaveform />
    </div>
  </div>
);




  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                A quick and easy{' '}
                <span className="inline-flex items-center">
                  <Volume2 className="w-8 h-8 mx-2 text-yellow-600" />
                  <AudioWaveform />
                </span>
                <br />
                way to listen most{' '}
                <span className="relative">
                  favorite{' '}
                  <span className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-600 -z-10 transform -rotate-1"></span>
                </span>
                podcast
              </h2>
              
              <p className="text-gray-700 text-lg leading-relaxed max-w-md">
                Explore latest top-notch stories from world wide community and verified tech creators
              </p>
            </div>

            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg">
              Start free trial
            </button>

            {/* Audio Player */}
            {/* <div className="flex items-center space-x-4 bg-gray-50 rounded-2xl p-4">
              <button
                onClick={togglePlay}
                className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-full transition-colors shadow-lg"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
              </button>
              <AudioWaveform />
            </div> */}
          </div>

          {/* Right Content - Microphone Illustration */}
          <div className="flex justify-center lg:justify-end">
            <MicrophoneIllustration isPlaying={isPlaying} togglePlay={togglePlay} />

          </div>
        </div>

        {/* Weekly Popular Section */}
        <section className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Weekly popular</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklyPodcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`${podcast.bgColor} p-4 rounded-2xl`}>
                    <Headphones className={`w-8 h-8 ${podcast.textColor}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-1">
                      {podcast.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">{podcast.author}</p>
                    <p className="text-gray-500 text-sm font-medium">{podcast.duration}</p>
                  </div>
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-full transition-colors shadow-md">
                    <Play className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PodcastPlatform;