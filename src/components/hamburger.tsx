import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import LogOut from './log-out';

const Hamburger = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="relative font-[16px]"
      onClick={() => setShowMenu(!showMenu)}
    >
      <MenuIcon />
      <div
        className={`absolute top-[calc(100%)] right-0 border bg-white transition-all z-[999] duration-300 w-max ${
          showMenu ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <LogOut />
      </div>
    </div>
  );
};

export default Hamburger;
