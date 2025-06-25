import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import GameDetails from './pages/GameDetail';
import Favorites from './pages/Favorites';
import Backlog from './pages/Backlog';
import logo from './assets/gamelog-logo.png';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import './styles/global.css';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <header className="app-header">
            <div className="theme-toggle-container">
              <button onClick={toggleTheme} className="theme-toggle">
                {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
              </button>
            </div>

            <div className="logo-wrapper">
              <img src={logo} alt="GameLog Logo" className="logo" />
            </div>
          </header>


          <Navbar />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/game/:id" element={<GameDetails />} />
            <Route path="/favorites" element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            } />
            <Route path="/backlog" element={
              <PrivateRoute>
                <Backlog />
              </PrivateRoute>
            } />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
