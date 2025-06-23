import React, { useState, useEffect } from 'react';
import { searchGames } from '../services/rawgAPI';
import {
  getBacklog,
  addToBacklog,
  removeFromBacklog,
  updateBacklogStatus,
} from '../utils/localStorage';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../components/AlertModal';
import '../styles/backlog.css';

const STATUS_OPTIONS = ['Quero jogar', 'Jogando', 'Zerado', 'Platinado'];

const Backlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (user) {
      const data = getBacklog(user.uid);
      setGames(data);
    } else {
      setGames([]);
    }
  },  []);

    const handleSearch = async (e) => {
    e.preventDefault();
    const data = await searchGames(query);
    setSearchResults(data?.results || []);
  };

  const handleAddGame = (game) => {
    if (!user) {
      setShowAlert(true);
      return;
    }

    if (!game || !game.id) {
      console.warn('Jogo inválido ao adicionar ao backlog:', game);
      return;
    }

    const updated = addToBacklog(user.uid, game);
    setGames(updated);
    setQuery('');
    setSearchResults([]);
  };

  const handleUpdateStatus = (id, status) => {
    if (!user) return;

    const updated = updateBacklogStatus(user.uid, id, status);
    setGames(updated);
  };

  const handleRemoveGame = (id) => {
    if (!user) return;

    const updated = removeFromBacklog(user.uid, id);
    setGames(updated);
  };


  return (
    <div className="container">
      <h1 className="page-title">📋 Minha Lista de Jogos para Zerar</h1>

      <form onSubmit={handleSearch} className="add-section">
        <input
          type="text"
          placeholder="Buscar jogo pelo nome..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Resultados:</h3>
          <ul>
            {searchResults.map((game) => (
              <li key={game.id}>
                <span>{game.name}</span>
                <button onClick={() => handleAddGame(game)}>Adicionar</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr />

      <ul className="game-list">
        {games.map((game) => (
          <li key={game.id} className="game-item">
            <img src={game.background_image} alt={game.title} width="80" />
            <strong>{game.title}</strong>
            <select
              value={game.status}
              onChange={(e) => handleUpdateStatus(game.id, e.target.value)}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <button onClick={() => handleRemoveGame(game.id)}>❌</button>
          </li>
        ))}
      </ul>

      {showAlert && (
        <AlertModal
          message="Você precisa estar logado para adicionar jogos ao backlog."
          onClose={() => {
            setShowAlert(false);
            navigate('/login');
          }}
        />
      )}
    </div>
  );
};

export default Backlog;
