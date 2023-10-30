'use server';

import { Hero } from '../types';

interface GetHeroesParams {
  filterByName?: string;
  filterByGender?: string;
  filterByAlignment?: string;
}

const apiURL = process.env.API_URL;

export async function getHeroes({
  filterByName = '',
  filterByGender = '',
  filterByAlignment = '',
}: GetHeroesParams): Promise<Hero[]> {
  if (!apiURL) {
    console.error(
      'A variável apiURL não está definida. Certifique-se de configurá-la corretamente.',
    );
    throw new Error('Internal server error');
  }

  const res = await fetch(apiURL);

  if (res.ok) {
    const heroes: Hero[] = await res.json();

    if (filterByName || filterByGender || filterByAlignment) {
      return heroes.filter((hero) => {
        return (
          hero.name.toLowerCase().includes(filterByName.toLowerCase()) &&
          hero.appearance.gender.includes(filterByGender) &&
          hero.biography.alignment.includes(filterByAlignment)
        );
      });
    }

    return heroes;
  }

  console.error('getHeroes falhou ao tentar buscar os heróis.');
  throw new Error('Internal server error');
}
