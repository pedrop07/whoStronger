'use client';

import { useHeroesStore } from '@/store/HeroesStore';
import { Hero } from '@/types';
import {
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from '@material-tailwind/react';
import { Swords, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../atoms/Button';
import { BattleResultModal } from './BattleResultModal';

export function HeroesBattle() {
  const fighters = useHeroesStore((store) => store.fighters);
  const setFighters = useHeroesStore((store) => store.setFighters);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(!openModal);

  const handleRemoveFighter = (fighterRemoved: Hero) => {
    const newFighters = fighters.filter(({ id }) => id !== fighterRemoved.id);
    setFighters(newFighters);
  };

  function FightersContent() {
    if (fighters.length === 0) {
      return (
        <p className="text-white">
          Selecione dois heróis para saber quem é o mais forte!
        </p>
      );
    }

    return (
      <div>
        <Typography className="text-white text-sm mb-2">
          * Clique na foto do herói que deseja remover da batalha
        </Typography>
        {fighters.map((fighter, index) => (
          <div
            className="flex flex-col items-center"
            key={`battle-${fighter.id}`}
          >
            {index === 1 && <X className="my-1 sm:my-3 text-white" />}
            <Typography className="font-medium text-white" as={'h4'}>
              {fighter.name}
            </Typography>
            <div className="w-full max-w-[100px] aspect-[1/1] relative overflow-hidden group">
              <div className="w-full h-full absolute bg-white/50 backdrop-blur-sm rounded-2xl z-50 hidden group-hover:flex items-center justify-center pointer-events-none">
                <X className="text-destructive" size={40} />
              </div>

              <Popover placement="bottom-end">
                <PopoverHandler>
                  <Image
                    alt={fighter.name}
                    src={fighter.images.lg}
                    style={{ objectFit: 'cover' }}
                    fill
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcWw8AAb8BHjgUU1kAAAAASUVORK5CYII="
                    className="w-full h-full rounded-2xl cursor-pointer"
                  />
                </PopoverHandler>
                <PopoverContent className="w-full max-w-max z-[9999] text-black">
                  <Typography className="mb-6 font-normal">
                    Tem certeza de que deseja remover{' '}
                    <span className="font-bold">{fighter.name}</span> da batalha
                    ?
                  </Typography>
                  <Button
                    onClick={() => handleRemoveFighter(fighter)}
                    colorVariant="destructive"
                  >
                    Remover
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
            {index === 1 && (
              <Button
                onClick={handleOpenModal}
                colorVariant="secondary"
                className="mt-4"
              >
                Iniciar batalha
              </Button>
            )}
          </div>
        ))}
        {openModal && (
          <BattleResultModal
            openModal={openModal}
            handleOpenModal={handleOpenModal}
          />
        )}
      </div>
    );
  }
  return (
    <div>
      <Typography
        className="font-medium inline-flex text-white items-center gap-2"
        as={'h3'}
      >
        <Swords />
        Batalha
      </Typography>
      <FightersContent />
    </div>
  );
}
