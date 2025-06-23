import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [showWarning, setShowWarning] = useState(false);
  const [redirect, setRedirect] = useState(false);


  useEffect(() => {
    if (!user) {
      setShowWarning(true);

      const timer = setTimeout(() => {
        setShowWarning(false);
        setRedirect(true);
      }, 3000); // mostra a mensagem por 3 segundos

      return () => clearTimeout(timer);
    }
  }, []);

  if (redirect) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!user && showWarning) {
    return (
      <div className="private-warning">
        <p>🔒 Você precisa estar logado para acessar esta página.</p>
      </div>
    );
  }

  return children;
};


export default PrivateRoute;
