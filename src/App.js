import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" component={<Home />} />
          <Route path="/Home" component={<Home />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
