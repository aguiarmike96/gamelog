// 🔐 Chaves separadas por usuário
const FAVORITES_KEY = (uid) => `gamelog_favorites_${uid}`;
const BACKLOG_KEY = (uid) => `gamelog_backlog_${uid}`;

/* ⭐ FAVORITOS */

export const getFavorites = (uid) => {
  if (!uid) return [];
  const data = localStorage.getItem(FAVORITES_KEY(uid));
  return data ? JSON.parse(data) : [];
};

export const saveFavorites = (uid, favorites) => {
  if (!uid) return;
  localStorage.setItem(FAVORITES_KEY(uid), JSON.stringify(favorites));
};

export const toggleFavorite = (uid, game) => {
  if (!uid || !game || !game.id) {
    console.warn('toggleFavorite recebeu dados inválidos:', { uid, game });
    return getFavorites(uid); // ou []
  }

  const current = getFavorites(uid);
  const exists = current.find((item) => item.id === game.id);
  const updated = exists
    ? current.filter((item) => item.id !== game.id)
    : [...current, game];

  saveFavorites(uid, updated);
  return updated;
};


export const isFavorite = (uid, gameId) => {
  if (!uid || !gameId) return false;
  const current = getFavorites(uid);
  return current.some((item) => item.id === gameId);
};


/* 🎮 BACKLOG */

export const getBacklog = (uid) => {
  if (!uid) return [];
  const data = localStorage.getItem(BACKLOG_KEY(uid));
  return data ? JSON.parse(data) : [];
};

export const saveBacklog = (uid, backlog) => {
  if (!uid) return;
  localStorage.setItem(BACKLOG_KEY(uid), JSON.stringify(backlog));
};

export const addToBacklog = (uid, game) => {
  const current = getBacklog(uid);
  const exists = current.some((item) => item.id === game.id);
  if (exists) return current;

  const newGame = {
    id: game.id,
    title: game.name,
    background_image: game.background_image,
    status: 'Quero jogar',
  };

  const updated = [...current, newGame];
  saveBacklog(uid, updated);
  return updated;
};

export const removeFromBacklog = (uid, id) => {
  const current = getBacklog(uid);
  const updated = current.filter((g) => g.id !== id);
  saveBacklog(uid, updated);
  return updated;
};

export const updateBacklogStatus = (uid, id, newStatus) => {
  const current = getBacklog(uid);
  const updated = current.map((g) =>
    g.id === id ? { ...g, status: newStatus } : g
  );
  saveBacklog(uid, updated);
  return updated;
};
