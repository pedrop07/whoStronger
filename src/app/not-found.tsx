'use client';

import { Button } from '@/components/atoms/Button';
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col justify-center items-center gap-4 text-center p-4">
      <Player
        src="/lottie/not-found.json"
        className="h-full w-full max-w-[300px]"
        autoplay
        loop
      />
      <h1 className="text-xl md:text-2xl font-bold">
        A página que você está tentando acessar não existe.
      </h1>
      <div className="flex items-center justify-center gap-4">
        <Link href="/">
          <Button>Página inicial</Button>
        </Link>
      </div>
    </main>
  );
}
