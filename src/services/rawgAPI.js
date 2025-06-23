import axios from 'axios';

const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

// Instância do Axios
const api = axios.create({
  baseURL: BASE_URL,
});

// Buscar jogos populares
export const getPopularGames = async (page = 1) => {
  try {
    const response = await api.get('/games', {
      params: {
        key: API_KEY,
        ordering: '-rating',
        page_size: 12, // Tamanho da página
        page, // Página sendo carregada
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar jogos populares:', error);
    return null;
  }
};



// Buscar jogo por nome
export const searchGames = async (query, platformIdInput = null) => {
  try {
    const platformId = platformIdInput !== '' && platformIdInput !== null
      ? parseInt(platformIdInput)
      : null;

    const isValidPlatform = Number.isInteger(platformId) && platformId > 0;

    const response = await api.get('/games', {
      params: {
        key: API_KEY,
        search: query,
        ordering: '-relevance',
        page_size: 10,
      },
    });

    const basicResults = response.data.results;

    // Se nenhuma plataforma foi escolhida, retorna direto
    if (!isValidPlatform) {
      return { results: basicResults };
    }

    // Verifica a plataforma real com getGameDetails
    const confirmedResults = await Promise.all(
      basicResults.map(async (game) => {
        try {
          const full = await getGameDetails(game.id);
          const hasPlatform = full.platforms?.some(
            (p) => p.platform.id === platformId
          );
          return hasPlatform ? game : null;
        } catch {
          return null;
        }
      })
    );

    return { results: confirmedResults.filter(Boolean) };
  } catch (error) {
    console.error('Erro ao buscar jogos por nome + detalhes:', error);
    return null;
  }
};





// Gerando a página GameDetails
export const getGameDetails = async (id) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
      params: {
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do jogo:', error);
    return null;
  }
};

// Filtrando por plataformas
export const getPlatforms = async () => {
  const res = await fetch(`${BASE_URL}/platforms?key=${API_KEY}`);
  return res.json();
};

export const getGamesByPlatform = async (platformId, page = 1) => {
  try {
    const response = await api.get('/games', {
      params: {
        key: API_KEY,
        platforms: platformId, // Certifique-se de que o ID está sendo passado corretamente
        ordering: '-rating',
        page_size: 12,
        page,
      },
    });

    // Filtrar manualmente jogos que realmente pertencem à plataforma
    const filteredGames = response.data.results.filter((game) => 
      game.platforms && game.platforms.some((p) => p.platform.id === parseInt(platformId))
    );

    return { results: filteredGames, next: response.data.next };
  } catch (error) {
    console.error('Erro ao buscar jogos por plataforma:', error);
    return null;
  }
};




