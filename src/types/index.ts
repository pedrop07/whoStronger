export interface Hero {
  id: number;
  name: string;
  powerstats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
  appearance: {
    gender: 'Male' | 'Female';
    race: string;
    height: string[];
    weight: string;
  };
  biography: {
    fullName: string;
    publisher: string;
    alignment: 'good' | 'bad';
  };
  images: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
}

export interface Fighter extends Hero {
  totalPower: number;
}
