import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameDetails } from '../services/rawgAPI';
import { translateToPTBR } from '../utils/translate';


const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [translatedDescription, setTranslatedDescription] = useState('');
  const [translationError, setTranslationError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const data = await getGameDetails(id);
        if (data) {
          setGame(data);

          if (data.description_raw) {
            const translated = await translateToPTBR(data.description_raw);
            setTranslatedDescription(translated);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do jogo:', error);
      } finally {
        setLoading(false);
      }
    };

  fetchGame();
}, [id]);


  if (loading) return <p>Carregando detalhes do jogo...</p>;
  if (!game) return <p>Jogo não encontrado.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{game.name}</h1>
      <img
        src={game.background_image}
        alt={game.name}
        style={{ width: '100%', maxWidth: '800px', borderRadius: '8px' }}
      />
      <p><strong>Nota:</strong> ⭐ {game.rating} / 5</p>
      <p><strong>Gêneros:</strong> {game.genres.map(g => g.name).join(', ')}</p>
      <p><strong>Plataformas:</strong> {game.platforms.map(p => p.platform.name).join(', ')}</p>
      <p><strong>Lançamento:</strong> {game.released}</p>
      <p><strong>Descrição:</strong></p>

      {translationError ? (
        <>
          <p style={{ opacity: 0.7 }}><em>⚠️ Descrição disponível apenas em inglês no momento.</em></p>
          <div dangerouslySetInnerHTML={{ __html: game.description }} />
        </>
      ) : (
        <p style={{ whiteSpace: 'pre-line' }}>{translatedDescription}</p>
      )}
    </div>
  );
};

export default GameDetail;
