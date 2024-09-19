import '../assets/styles/login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogOut: React.FC = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const handleLogut = () => {
    try {
      axios.post<any>(
        'https://frontend-take-home-service.fetch.com/auth/logout',
        {
          withCredentails: true
        }
      );
      navigate('/login');
    } catch (error) {
      setError('LogOut is failed.');
    }
  };
  return (
    <div className="logout">
      <span onClick={handleLogut}>Logout</span>
    </div>
  );
};

export default LogOut;
