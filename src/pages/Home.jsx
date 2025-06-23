import React, { useEffect, useState } from "react";
import { getPopularGames, getPlatforms, getGamesByPlatform } from "../services/rawgAPI";
import GameCard from "../components/GameCard";

const Home = () => {
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const platformsData = await getPlatforms();
      setPlatforms(platformsData.results);

      const gamesData = await getPopularGames(1);
      if (gamesData) {
        setGames(gamesData.results);
        setNextPageUrl(gamesData.next);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handlePlatformChange = async (e) => {
    const platformId = e.target.value;
    setSelectedPlatform(platformId);
    setLoading(true);
    
    const data = platformId ? await getGamesByPlatform(platformId, 1) : await getPopularGames(1);
    setGames(data.results);
    setPage(1);
    setNextPageUrl(data.next); 
    setLoading(false);
  };

  const loadMoreGames = async () => {
  if (isFetchingMore || !nextPageUrl) return;

  setIsFetchingMore(true);
  const nextPage = page + 1;

  const data = selectedPlatform
    ? await getGamesByPlatform(selectedPlatform, nextPage) // Usando a versão corrigida
    : await getPopularGames(nextPage);

  if (data) {
    setGames((prevGames) => {
      const uniqueGames = data.results.filter((game) => 
        !prevGames.some((prevGame) => prevGame.id === game.id)
      );
      return [...prevGames, ...uniqueGames];
    });
    setPage(nextPage);
    setNextPageUrl(data.next); // Atualiza corretamente a próxima página
  }

  setIsFetchingMore(false);
};


  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMoreGames();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPageUrl]);

  if (loading) return <p>Carregando jogos...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1 className='page-title'>🎮 Jogos Populares</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="platform-select">Filtrar por plataforma: </label>
        <select id="platform-select" value={selectedPlatform} onChange={handlePlatformChange}>
          <option value="">Todas</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {isFetchingMore && <p>Carregando mais jogos...</p>}
    </div>
  );
};

export default Home;
