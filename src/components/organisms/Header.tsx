'use client';

import { useSideMenuStore } from '@/store/SideMenuStore';
import { IconButton, Navbar } from '@material-tailwind/react';
import { AlignJustify } from 'lucide-react';
import { ToggleTheme } from '../atoms/ToggleTheme';

export function Header() {
  const setOpenOnMobile = useSideMenuStore((store) => store.setOpenOnMobile);
  const openOnMobile = useSideMenuStore((store) => store.openOnMobile);

  const handleOpenSideMenuToggle = () => {
    setOpenOnMobile(!openOnMobile);
  };

  return (
    <header className="bg-background border-b dark:border-neutral-700 fixed z-50 top-0 w-full sm:w-[calc(100%-240px)] sm:ml-[240px]">
      <Navbar
        color="transparent"
        fullWidth
        className="w-full border-none bg-opacity-0 rounded-none px-4 py-2 lg:px-8"
      >
        <div className="sm:container mx-auto flex items-center justify-between text-blue-100">
          <IconButton
            onClick={handleOpenSideMenuToggle}
            variant="text"
            className="block sm:hidden"
          >
            <AlignJustify className="text-primary dark:text-secondary" />
          </IconButton>

          <div className="font-bold text-lg">
            <span className="text-secondary">who</span>
            <span className="text-primary">Stronger</span>
          </div>

          <ToggleTheme />
        </div>
      </Navbar>
    </header>
  );
}
