import '../assets/styles/login.css';
import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { AuthContext } from '../context/authContext';
interface FormData {
  name: string;
  email: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: ''
  });
  const [error, setError] = useState<string | null>(null);

  const { name, email } = formData;
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const body = { name, email };
      const baseUrl: any = process.env.REACT_APP_BASE_URL;
      axios
        .post<any>(baseUrl + '/auth/login', body, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          navigate('/search');
        });
    } catch (error) {
      setError('Invalid name or password. Please try again');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>name:</label>
          <input
            type="name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
