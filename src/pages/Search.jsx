import React, { useState, useEffect } from 'react';
import { searchGames, getPlatforms } from '../services/rawgAPI';
import GameCard from '../components/GameCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPlatforms = async () => {
      const platformsData = await getPlatforms();
      setPlatforms(platformsData.results);
    };

    fetchPlatforms();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const data = await searchGames(query, selectedPlatform);
    if (data && data.results.length > 0) {
      setGames(data.results);
    } else {
      setGames([]);
      setErrorMessage('Nenhum jogo encontrado para esta pesquisa.');
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }} className='page-title'>🔎 Buscar Jogos</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome do jogo"
          className="search-input"
        />
        
        <select 
            value={selectedPlatform} 
            onChange={(e) =>
              setSelectedPlatform(
                e.target.value === '' ? '' : parseInt(e.target.value)
              )
            }
            className="search-select"
          >
            <option value="">Todas as plataformas</option>
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
        </select>


        <button type="submit" className="search-button">Buscar</button>
      </form>

      {loading && <p style={{ textAlign: 'center' }}>Carregando resultados...</p>}

      {errorMessage && (
        <p style={{ textAlign: 'center', color: '#888' }}>{errorMessage}</p>
      )}

      <div className="grid-results">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Search;
