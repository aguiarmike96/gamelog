import React, { useState, useEffect } from 'react';
import { getFavorites } from '../utils/localStorage';
import { getPlatforms } from '../services/rawgAPI';
import { useAuth } from '../contexts/AuthContext';
import GameCard from '../components/GameCard';

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('');

  useEffect(() => {
    if (user && user.uid) {
      setFavorites(getFavorites(user.uid));
    } else {
      setFavorites([]);
    }

    const fetchPlatforms = async () => {
      const platformsData = await getPlatforms();
      setPlatforms(platformsData.results);
    };

    fetchPlatforms();
  },  []);

    const filterFavoritesByPlatform = () => {
    return selectedPlatform 
      ? favorites.filter(
          (game) =>
            Array.isArray(game.platforms) &&
            game.platforms.some((p) => p.platform.id === parseInt(selectedPlatform))
        )
      : favorites;
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1 className='page-title'>❤️ Meus Favoritos</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="platform-select">Filtrar por plataforma:</label>
        <select 
          id="platform-select" 
          value={selectedPlatform} 
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="favorites-select"
        >
          <option value="">Todas as plataformas</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
      </div>

      {!favorites.length ? (
        <p>Você ainda não adicionou jogos aos favoritos.</p>
      ) : filterFavoritesByPlatform().length === 0 ? (
        <p>Nenhum jogo favorito encontrado para esta plataforma.</p>
      ) : (
        <div className="grid-results">
          {filterFavoritesByPlatform().map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
