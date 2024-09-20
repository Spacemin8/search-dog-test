import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';

import { Api } from '../core';
import { clsxm } from '../lib';

interface Props {
  className?: string;
}

export const AppHeader: React.FC<Props> = ({ className = '' }) => {
  const navigate = useNavigate();

  const [error, setError] = React.useState<string | null>(null);
  const [showMenu, setShowMenu] = React.useState(false);

  const handleLogout = async () => {
    try {
      await Api.post('/auth/logout');
    } catch (error) {
      setError('Log out is failed.');
    }

    navigate('/login');
  };

  return (
    <header className={clsxm('bg-white', className)}>
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-end justify-end sm:items-center sm:justify-between p-6 lg:px-8"
      >
        <div className="hidden sm:flex sm:flex-1 sm:justify-end">
          <div className="logout">
            <Button
              variant="text"
              className="!normal-case"
              onClick={() => handleLogout()}
            >
              Log out
            </Button>
          </div>
        </div>
        <div className="flex sm:hidden">
          <button
            className="relative font-[16px]"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MenuIcon />
            <div
              className={`absolute top-[calc(100%)] right-0 border bg-white transition-all z-[999] duration-300 w-max ${
                showMenu ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="logout">
                <Button
                  className="!normal-case"
                  variant="text"
                  onClick={() => handleLogout()}
                >
                  Log out
                </Button>
              </div>
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
};
