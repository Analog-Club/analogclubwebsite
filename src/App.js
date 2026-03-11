import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Resources from './pages/Resources';
import Magazine from './pages/Magazine';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/magazine" element={<Magazine />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
