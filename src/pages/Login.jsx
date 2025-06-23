import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // <- Estado para mensagem de erro

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); // Limpa erro anterior
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('Usuário não encontrado.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Senha incorreta.');
      } else if (err.code === 'auth/invalid-email') {
        setError('E-mail inválido.');
      } else {
        setError('Erro ao fazer login. Verifique seus dados e tente novamente.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Entrar</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>

        {/* Mensagem de erro */}
        {error && <p className="error-message">{error}</p>}

        <div className="switch-link">
          Ainda não tem conta? <Link to="/signup">Cadastre-se</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
