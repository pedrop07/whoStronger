import { getHeroes } from '@/actions/actions';
import { HeroList } from '@/components/templates/HeroListTemplate';

export default async function HomePage() {
  const heroes = await getHeroes({});

  return (
    <div>
      <HeroList heroes={heroes} />
    </div>
  );
}
