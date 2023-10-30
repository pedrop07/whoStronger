import { Toaster } from 'react-hot-toast';
import { SideBar } from '@/components/organisms/SideBar';
import { Header } from '@/components/organisms/Header';
import { DarkModeThemeProvider } from '@/providers/DarkModeThemeProvider';

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DarkModeThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <SideBar />
      <Header />
      <Toaster position="top-right" />
      <main className="mt-20 w-full sm:w-[calc(100%-240px)] sm:ml-[240px] px-4 sm:px-16">
        {children}
      </main>
    </DarkModeThemeProvider>
  );
}
