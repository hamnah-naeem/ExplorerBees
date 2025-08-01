import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Social from './pages/Social';
import Nearby from './pages/Nearby';
import Media from './pages/Media';
import Podcast from './pages/Podcast';
import Questions from './pages/Questions';
import Blogs from './pages/Blogs';
import ExploreCities from './components/ExploreCities';
import ExploreHotels from './components/ExploreHotels';
import ExploreRestaurants from "./components/ExploreRestaurants";
import ThingsToDo from './components/ThingsToDo';




function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/social" element={<Social />} />
          <Route path="/nearby" element={<Nearby />} />
          <Route path="/media" element={<Media />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/explorecities" element={<ExploreCities />} />
          <Route path="/explorehotels" element={<ExploreHotels />} />
          <Route path="/explorerestaurants" element={<ExploreRestaurants />} />
          <Route path="/thingstodo" element={<ThingsToDo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
