import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Social from './pages/Social';
import Nearby from './pages/Nearby';
import Media from './pages/Media';
import Podcast from './pages/Podcast';
import Questions from './pages/Questions';
import Blogs from './pages/Blogs';
import LoginPage from './pages/Login'; // Import the LoginPage component
import RegisterPage from './pages/Registration'; // Import the RegisterPage component
import Profile from './pages/Profile';
import ExploreCities from './components/ExploreCities';
import ExploreHotels from './components/ExploreHotels';
import ExploreRestaurants from "./components/ExploreRestaurants";
import ThingsToDo from './components/ThingsToDo';
import BlogDetail from './components/BlogDetail'; // Import the BlogDetail component

function App() {
  const location = useLocation();
  const isSocialPage = location.pathname === "/social";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/Registration"; // Uncommented this line

  return (
    <div className="min-h-screen flex flex-col">
      {/* Only show Header if not on auth pages */}
      {!isAuthPage && <Header />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/social" element={<Social />} />
          <Route path="/nearby" element={<Nearby />} />
          <Route path="/media" element={<Media />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/login" element={<LoginPage />} />
       <Route path="/registration" element={<RegisterPage />} />
          <Route path="/explorecities" element={<ExploreCities />} />
          <Route path="/explorehotels" element={<ExploreHotels />} />
          <Route path="/explorerestaurants" element={<ExploreRestaurants />} />
          <Route path="/thingstodo" element={<ThingsToDo />} />
          <Route path="/blog/:id" element={<BlogDetail/>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      
      {/* Only show Footer if not on social page or auth pages */}
      {!isSocialPage && !isAuthPage && <Footer />}
    </div>
  );
}

export default App;