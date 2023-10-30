import { Hero, Fighter } from '@/types';
import { create } from 'zustand';

interface HeroesStore {
  filteredHeroes: Hero[] | null;
  setFilteredHeroes: (heroes: Hero[] | null) => void;
  fighters: Fighter[];
  setFighters: (fighters: Fighter[]) => void;
}

export const useHeroesStore = create<HeroesStore>((set) => {
  return {
    filteredHeroes: null,
    setFilteredHeroes: (filteredHeroes) => {
      set(() => ({ filteredHeroes }));
    },
    fighters: [],
    setFighters: (fighters) => {
      set(() => ({ fighters }));
    },
  };
});
