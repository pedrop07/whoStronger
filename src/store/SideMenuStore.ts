import { create } from 'zustand';

interface SideMenuStore {
  openOnMobile: boolean;
  setOpenOnMobile: (openOnMobile: boolean) => void;
}

export const useSideMenuStore = create<SideMenuStore>((set) => {
  return {
    openOnMobile: false,
    setOpenOnMobile: (openOnMobile) => {
      set(() => ({ openOnMobile }));
    },
  };
});
