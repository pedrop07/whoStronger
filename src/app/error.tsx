'use client';

import { Button } from '@/components/atoms/Button';
import { Player } from '@lottiefiles/react-lottie-player';
import { Typography } from '@material-tailwind/react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-4 text-center p-4">
      <div className="max-w-[300px] w-full aspect-square">
        <Player
          src="/lottie/error.json"
          className="h-full w-full"
          autoplay
          keepLastFrame
        />
      </div>
      <h1 className="font-bold text-3xl">Algo de inesperado ocorreu!</h1>
      <Typography className="font-medium text-muted-foreground max-w-xl text-lg">
        Não conseguimos listar os heróis neste momento. Por favor, tente
        novamente mais tarde.
      </Typography>
      <Button onClick={() => reset()}>Tentar novamente</Button>
    </main>
  );
}
