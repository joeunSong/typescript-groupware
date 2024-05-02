import React, { useState } from 'react';
import MenuButton from './MenuButton';
import { MainMenu } from './Menu';

interface CategoryProps {
  menu: MainMenu;
}

function Category({ menu }: CategoryProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='flex flex-col'>
      <button className='h-11 text-lg' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {menu.category}
      </button>
      {isMenuOpen &&
        menu.sub.map((it: any) => <MenuButton name={it.name} url={it.url}></MenuButton>)}
    </div>
  );
}

export default Category;
