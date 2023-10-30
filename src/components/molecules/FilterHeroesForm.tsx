'use client';

import { Select, Typography, Option } from '@material-tailwind/react';
import { SlidersHorizontal } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useHeroesStore } from '@/store/HeroesStore';
import { getHeroes } from '@/actions/actions';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

const initialFilters = {
  name: '',
  gender: '',
  alignment: '',
};

export function FilterHeroesForm() {
  const setFilteredHeroes = useHeroesStore((store) => store.setFilteredHeroes);
  const [filters, setFilters] = useState(initialFilters);

  const isEmpty = Object.values(filters).every((filter) => filter === '');

  const handleChangeNameFilter = (name: string) => {
    const newFilters = { ...filters, name };
    setFilters(newFilters);
  };

  const handleChangeGenderFilter = (gender: string) => {
    const newFilters = { ...filters, gender };
    setFilters(newFilters);
  };

  const handleChangeAlignmentFilter = (alignment: string) => {
    const newFilters = { ...filters, alignment };
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({ ...initialFilters });
    setFilteredHeroes(null);
  };

  const handleSubmitFilter = async (event: FormEvent) => {
    event.preventDefault();

    if (isEmpty) return setFilteredHeroes(null);

    const filteredHeroes = await getHeroes({
      filterByName: filters.name,
      filterByGender: filters.gender,
      filterByAlignment: filters.alignment,
    });

    setFilteredHeroes(filteredHeroes);
  };

  return (
    <div>
      <Typography
        className="font-medium inline-flex text-white items-center gap-2"
        as={'h3'}
      >
        <SlidersHorizontal size={18} />
        Filtrar por
      </Typography>
      <form className="mt-1 sm:mt-2 space-y-2 md:space-y-4 text-white">
        <div>
          <Input
            id="heroName"
            onChange={(ev) => handleChangeNameFilter(ev.target.value)}
            value={filters.name}
            label="Nome do herói"
            placeholder="ex: Yoda"
          />
        </div>
        <div>
          <Typography className="font-medium" as={'h4'}>
            Gênero
          </Typography>
          <Select
            value={filters.gender}
            onChange={(gender) => handleChangeGenderFilter(gender!)}
            color="deep-purple"
          >
            <Option
              value="Male"
              className="text-foreground dark:text-black hover:bg-slate-200"
            >
              Masculino
            </Option>
            <Option
              value="Female"
              className="text-foreground dark:text-black hover:bg-slate-200"
            >
              Feminino
            </Option>
          </Select>
        </div>
        <div>
          <Typography className="font-medium" as={'h4'}>
            Alinhamento
          </Typography>
          <Select
            value={filters.alignment}
            onChange={(alignment) => handleChangeAlignmentFilter(alignment!)}
            color="deep-purple"
          >
            <Option
              value="good"
              className="text-foreground dark:text-black hover:bg-slate-200"
            >
              Bom
            </Option>
            <Option
              value="bad"
              className="text-foreground dark:text-black hover:bg-slate-200"
            >
              Mal
            </Option>
          </Select>
        </div>
        <Button
          fullWidth
          disabled={isEmpty}
          type="button"
          onClick={handleClearFilters}
          colorVariant="destructive"
        >
          Limpar filtros
        </Button>
        <Button
          fullWidth
          type="submit"
          onClick={handleSubmitFilter}
          colorVariant="secondary"
        >
          Aplicar filtros
        </Button>
      </form>
    </div>
  );
}
