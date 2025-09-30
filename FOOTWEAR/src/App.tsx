// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home.tsx'; // Your homepage component
import About from './pages/about'; // Your actual about component
import Contact from './pages/contact'; // Your actual contact component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
