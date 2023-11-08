'use client';

import { useSideMenuStore } from '@/store/SideMenuStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Drawer } from '@material-tailwind/react';
import { FilterHeroesForm } from '../molecules/FilterHeroesForm';
import { HeroesBattle } from '../molecules/HeroesBattle';

export function SideBar() {
  const setOpenOnMobile = useSideMenuStore((store) => store.setOpenOnMobile);
  const openOnMobile = useSideMenuStore((store) => store.openOnMobile);
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const handleCloseOnMobile = () => {
    !isDesktop && setOpenOnMobile(false);
  };

  const showOverlay = isDesktop ? false : openOnMobile;

  const showMenu = isDesktop ? true : openOnMobile;

  return (
    <Drawer
      className="bg-primary dark:bg-zinc-800 p-4 space-y-4 sm:space-y-6 overflow-auto"
      size={240}
      open={showMenu}
      overlay={showOverlay}
      onClose={handleCloseOnMobile}
      overlayProps={{
        className: 'fixed',
      }}
    >
      <FilterHeroesForm />
      <HeroesBattle />
    </Drawer>
  );
}
