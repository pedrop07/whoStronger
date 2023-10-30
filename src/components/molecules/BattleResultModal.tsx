'use client';

import { useHeroesStore } from '@/store/HeroesStore';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import Image from 'next/image';
import {
  Angry,
  ChevronsDown,
  ChevronsUp,
  Equal,
  Laugh,
  Meh,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Button } from '../atoms/Button';

interface Props {
  openModal: boolean;
  handleOpenModal: () => void;
}

type Powers =
  | 'intelligence'
  | 'strength'
  | 'speed'
  | 'durability'
  | 'power'
  | 'combat';

export function BattleResultModal({ openModal, handleOpenModal }: Props) {
  const fighters = useHeroesStore((store) => store.fighters);
  const [loadingBattle, setLoadingBattle] = useState(1);

  const totalPowerComparison = (fighterIndex: number) => {
    const testedFighter = fighters[fighterIndex];
    const enemy = fighters[fighterIndex === 0 ? 1 : 0];

    if (testedFighter.totalPower === enemy.totalPower) {
      return 'equals';
    }

    if (testedFighter.totalPower > enemy.totalPower) {
      return 'greater';
    }

    return 'less';
  };

  const totalPowerComparisonIcon = (fighterIndex: number) => {
    const iconsMap = {
      equals: <Equal className="text-blue-400" />,
      greater: <ChevronsUp className="text-green-400" />,
      less: <ChevronsDown className="text-red-400" />,
    };

    return iconsMap[totalPowerComparison(fighterIndex)];
  };

  const battleResult = (fighterIndex: number) => {
    const messageMap = {
      equals: (
        <div className="text-blue-400 inline-flex items-center gap-1">
          Empate
          <Meh />
        </div>
      ),
      greater: (
        <div className="text-green-400 inline-flex items-center gap-1">
          Vencedor
          <Laugh />
        </div>
      ),
      less: (
        <div className="text-red-400 inline-flex items-center gap-1">
          Perdedor
          <Angry />
        </div>
      ),
    };
    return messageMap[totalPowerComparison(fighterIndex)];
  };

  const powerComparisonIcon = (fighterIndex: number, power: Powers) => {
    const testedFighter = fighters[fighterIndex];
    const enemy = fighters[fighterIndex === 0 ? 1 : 0];

    if (testedFighter.powerstats[power] === enemy.powerstats[power]) {
      return <Equal className="text-blue-400" />;
    }

    if (testedFighter.powerstats[power] > enemy.powerstats[power]) {
      return <ChevronsUp className="text-green-400" />;
    }

    if (testedFighter.powerstats[power] < enemy.powerstats[power]) {
      return <ChevronsDown className="text-red-400" />;
    }
  };

  function ModalBody() {
    if (loadingBattle < 3) {
      return (
        <div className="mx-auto">
          <Player
            src="/lottie/battle.json"
            className="max-w-[300px] h-full w-full"
            autoplay
            loop
          />
        </div>
      );
    }

    return fighters.map((fighter, index) => {
      const powerStats = Object.entries(fighter.powerstats) as [
        Powers,
        number,
      ][];

      return (
        <>
          <div key={`modal-battle-${fighter.id}`}>
            <Typography as={'h5'} className="font-bold inline-flex flex-col">
              {battleResult(index)}
              {fighter.name}
            </Typography>
            <div className="w-[200px] aspect-[1/1] relative">
              <Image
                alt={fighter.name}
                src={fighter.images.lg}
                style={{ objectFit: 'cover' }}
                fill
                sizes="100vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcWw8AAb8BHjgUU1kAAAAASUVORK5CYII="
                className="w-full h-full rounded-2xl"
              />
            </div>
            <div className="space-y-2 mt-4">
              <Typography as={'h6'} className="font-bold text-center">
                Power stats:
              </Typography>
              {powerStats.map(([name, value]) => (
                <div key={name} className="flex justify-between">
                  <span className="font-bold">{name}:</span>
                  <span className="ml-2 inline-flex items-center gap-2">
                    {value} {powerComparisonIcon(index, name)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between">
                <span className="font-bold text-lg">Total:</span>
                <span className="ml-2 inline-flex items-center gap-2">
                  {fighter.totalPower} {totalPowerComparisonIcon(index)}
                </span>
              </div>
            </div>
          </div>
          {index === 0 && <X size={60} />}
        </>
      );
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadingBattle < 3) setLoadingBattle(loadingBattle + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loadingBattle]);

  return (
    <Dialog
      className="bg-background my-2 h-full lg:h-max overflow-auto"
      open={openModal}
      handler={handleOpenModal}
    >
      <DialogHeader className="justify-between">
        {loadingBattle < 3
          ? 'A batalha está acontecendo...'
          : 'Resultado da batalha:'}
        <IconButton
          onClick={handleOpenModal}
          variant="text"
          className="text-rose-600 dark:hover:bg-gray-700/50"
        >
          <X />
        </IconButton>
      </DialogHeader>
      <DialogBody className="flex items-center justify-between flex-col lg:flex-row">
        <ModalBody />
      </DialogBody>
      <DialogFooter>
        <div className="text-sm">
          * O vencedor da batalha é aquele com a maior soma de powerstats
        </div>
        <Button
          colorVariant="destructive"
          onClick={handleOpenModal}
          className="ml-2"
        >
          Fechar
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
