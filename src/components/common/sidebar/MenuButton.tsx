import React from 'react';

interface MenuButtonProps {
  name: string;
  url: string;
}

const MenuButton = ({ name, url }: MenuButtonProps) => {
  const handleMovePage = () => {
    //router로 url로 이동
  };

  return (
    <button className='h-11 text-lg' onClick={handleMovePage}>
      {name}
    </button>
  );
};

export default MenuButton;
