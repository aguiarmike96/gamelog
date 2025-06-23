import { useState, useEffect } from 'react';
import { toggleFavorite, isFavorite } from '../utils/localStorage';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AlertModal from './AlertModal';

const GameCard = ({ game }) => {
  const [fav, setFav] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.uid && game && game.id) {
      const result = isFavorite(user.uid, game.id);
      setFav(result);
    }
  }, [user, game]);

  const handleFavorite = () => {
    if (!user || !user.uid) {
      setShowAlert(true);
      return;
    }

    if (!game || !game.id) {
      console.warn('Game inválido ou ausente:', game);
      return;
    }

    const updated = toggleFavorite(user.uid, game);
    setFav(!fav);
  };

  return (
    <div className="game-card">
      <Link to={`/game/${game.id}`} className="game-card-link">
        <img
          src={game.background_image}
          alt={game.name}
          className="game-card-image"
        />
        <h3 className="game-card-title">{game.name}</h3>
        <p className="game-card-rating">⭐ {game.rating}</p>
      </Link>

      <button
        onClick={handleFavorite}
        className={`favorite-button ${fav ? 'remove' : 'add'}`}
      >
        {fav ? '💔 Remover dos Favoritos' : '❤️ Adicionar aos Favoritos'}
      </button>

      {showAlert && (
        <AlertModal
          message="Você precisa estar logado para favoritar jogos."
          onClose={() => {
            setShowAlert(false);
            navigate('/login');
          }}
        />
      )}
    </div>
  );
};

export default GameCard;
