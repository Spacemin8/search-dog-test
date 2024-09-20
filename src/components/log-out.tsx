import '../assets/styles/login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Api } from '../core';

const LogOut: React.FC = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const handleLogut = async () => {
    try {
      await Api.post('/auth/logout');
      navigate('/login');
    } catch (error) {
      setError('LogOut is failed.');
    }
  };
  return (
    <div className="logout">
      <span onClick={() => handleLogut()} className="menu-icon">
        Logout
      </span>
    </div>
  );
};

export default LogOut;
