import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaHeart, FaBars, FaTimes, FaListUl, FaInfoCircle } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

const handleLogout = async () => {
  await logout();
  navigate('/login');
};
  {user && (
     <button onClick={logout} className="logout-button">
       Sair
     </button>
  )}
  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        {/* <h2>🎮 GameLog</h2> */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-links mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NavLink to="/" className="nav-link" onClick={closeMenu}>
              <FaHome className="icon" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/backlog" className="nav-link" onClick={closeMenu}>
              <FaListUl className="icon" />
              <span>Backlog</span>
            </NavLink>

            <NavLink to="/search" className="nav-link" onClick={closeMenu}>
              <FaSearch className="icon" />
              <span>Buscar</span>
            </NavLink>
            <NavLink to="/favorites" className="nav-link" onClick={closeMenu}>
              <FaHeart className="icon" />
              <span>Favoritos</span>
            </NavLink>
            <NavLink to="/sobre" className="nav-link" onClick={closeMenu}>
              <FaInfoCircle className="icon" />
              <span>Sobre</span>
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu fixo em telas grandes */}
      <div className="nav-links desktop">
        <NavLink to="/" className="nav-link">
          <FaHome className="icon" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/backlog" className="nav-link">
          <FaListUl className="icon" />
          <span>Backlog</span>
        </NavLink>
        <NavLink to="/search" className="nav-link">
          <FaSearch className="icon" />
          <span>Buscar</span>
        </NavLink>
        <NavLink to="/favorites" className="nav-link">
          <FaHeart className="icon" />
          <span>Favoritos</span>
        </NavLink>
        <NavLink to="/sobre" className="nav-link">
          <FaInfoCircle className="icon" />
          <span>Sobre</span>
        </NavLink>

      </div>
      <div className="auth-buttons">
          {!user ? (
            <>
              <button onClick={() => navigate('/login')}>Entrar</button>
              <button onClick={() => navigate('/signup')}>Cadastrar</button>
            </>
          ) : (
            <button onClick={handleLogout}>Sair</button>
          )}
      </div>
    </nav>
  );
};

export default Navbar;
