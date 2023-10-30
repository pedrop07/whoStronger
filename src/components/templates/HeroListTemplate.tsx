'use client';

import { useHeroesStore } from '@/store/HeroesStore';
import { Hero } from '@/types';
import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { HeroCard } from '../molecules/HeroCard';

interface Props {
  heroes: Hero[];
}

const ITEMS_PER_VIEW = 10;

export function HeroList({ heroes }: Props) {
  const filteredHeroes = useHeroesStore((store) => store.filteredHeroes);
  const [currentPage, setCurrentPage] = useState(1);
  const [heroesInView, setHeroesInView] = useState<Hero[]>([]);

  const heroesList = filteredHeroes || heroes;

  function ListContent() {
    if (heroesInView.length === 0 && filteredHeroes) {
      return (
        <div className="mt-10">
          <Typography className="font-bold text-muted-foreground max-w-xl mx-auto text-2xl">
            Não foi encontrado nenhum herói que corresponda aos filtros de
            pesquisa selecionados. Por favor, ajuste os filtros e tente
            novamente.
          </Typography>
        </div>
      );
    }

    return (
      <div className="grid max-w-6xl mx-auto lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
        {heroesInView.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </div>
    );
  }

  useEffect(() => {
    setHeroesInView([]);
    setCurrentPage(1);
  }, [filteredHeroes]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_VIEW;
    const endIndex = startIndex + ITEMS_PER_VIEW;
    const newHeroes = heroesList.slice(startIndex, endIndex);

    setHeroesInView((prevState) => [...prevState, ...newHeroes]);
  }, [currentPage, heroesList]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        heroesInView.length < heroesList.length
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroesInView, heroesList]);

  return (
    <>
      <div className="space-y-2 max-w-4xl mx-auto">
        <p>
          Bem-vindo ao{' '}
          <span className="font-bold text-primary">whoStronger</span>, o seu
          destino online para explorar o emocionante mundo dos super-heróis!
          Neste site incrível, você terá a oportunidade de mergulhar no universo
          dos superpoderes, descobrindo informações detalhadas sobre uma ampla
          gama de heróis, desde os icônicos até os mais obscuros.
        </p>
        <p>
          Escolha dois heróis para travar uma batalha e descubra quem é o mais
          forte
        </p>
      </div>
      <ListContent />
    </>
  );
}
