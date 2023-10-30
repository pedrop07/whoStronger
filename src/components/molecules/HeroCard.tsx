'use client';

import {
  Card,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from '@material-tailwind/react';
import Image from 'next/image';
import clsx from 'clsx';
import { useHeroesStore } from '@/store/HeroesStore';
import toast from 'react-hot-toast';
import { Hero, Fighter } from '@/types';

interface Props {
  hero: Hero;
}

const createCardData = (key: string, title: string, data: string) => ({
  key,
  title,
  data,
});

export function HeroCard({ hero }: Props) {
  const setFighters = useHeroesStore((store) => store.setFighters);
  const fighters = useHeroesStore((store) => store.fighters);

  const heroData = [
    createCardData(
      `fullname${hero.id}`,
      'Nome completo:',
      hero.biography.fullName,
    ),
    createCardData(`publisher${hero.id}`, 'Editora:', hero.biography.publisher),
    createCardData(
      `alignment${hero.id}`,
      'Alinhamento:',
      hero.biography.alignment,
    ),
    createCardData(`gender${hero.id}`, 'Gênero:', hero.appearance.gender),
    createCardData(`race${hero.id}`, 'Raça:', hero.appearance.race),
    createCardData(
      `height${hero.id}`,
      'Altura(in):',
      hero.appearance.height[0],
    ),
    createCardData(
      `heightcm${hero.id}`,
      'Altura(cm):',
      hero.appearance.height[1],
    ),
    createCardData(`weight${hero.id}`, 'Peso(lb):', hero.appearance.weight[0]),
    createCardData(
      `weightkg${hero.id}`,
      'Peso(kg):',
      hero.appearance.weight[1],
    ),
  ];

  const handleClickFight = () => {
    const heroIsAlreadySelected = fighters.some(({ id }) => id === hero.id);

    if (heroIsAlreadySelected)
      return toast.error(`${hero.name} já foi selecionado para a batalha`);

    if (fighters.length === 2)
      return toast.error(
        'Dois heróis já foram selecionados para a batalha, remova um dos heróis para selecionar outro no lugar',
      );

    const fighter: Fighter = { ...hero, totalPower: 0 };

    const totalFighterPower = Object.values(fighter.powerstats).reduce(
      (previousValue, currentValue) => {
        currentValue += previousValue;
        return currentValue;
      },
      0,
    );

    fighter.totalPower = totalFighterPower;
    setFighters([...fighters, fighter]);

    return toast.success(`${hero.name} agora está no campo de batalha!`);
  };

  return (
    <Card className="mt-6 justify-between w-full max-w-md mx-auto bg-background border dark:border-zinc-700">
      <CardBody>
        <Typography variant="h4" className="mb-3 text-foreground text-center">
          {hero.name}
        </Typography>
        <div className="w-full max-w-[240px] aspect-[1/1] relative mx-auto">
          <Image
            alt={hero.name}
            src={hero.images.lg}
            style={{ objectFit: 'cover' }}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcWw8AAb8BHjgUU1kAAAAASUVORK5CYII="
            className="w-full h-full rounded-2xl"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-6">
          {heroData.map(({ key, data, title }, index) => {
            return (
              <div
                key={key}
                className={clsx(
                  'flex items-center gap-2',
                  (index === 0 || index === 1) && 'md:col-span-2',
                )}
              >
                <h5 className="font-bold text-foreground">{title}</h5>
                <span className="text-foreground dark:text-muted-foreground">
                  {data}
                </span>
              </div>
            );
          })}
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={handleClickFight}>Batalhar</Button>
      </CardFooter>
    </Card>
  );
}
