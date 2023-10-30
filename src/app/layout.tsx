import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'whoStronger',
  description:
    'Explore uma lista de heróis e crie batalhas para descobrir quem é o mais forte!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
