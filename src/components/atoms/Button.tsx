import { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  disabled?: boolean;
  colorVariant?: 'primary' | 'secondary' | 'white' | 'destructive';
  fullWidth?: boolean;
}

export function Button({
  children,
  className,
  colorVariant = 'primary',
  fullWidth,
  ...props
}: Props & ComponentProps<'button'>) {
  const butonStylesMap = {
    primary: 'bg-primary hover:bg-primary/80 focus:ring-primary/50',
    secondary: 'bg-secondary hover:bg-secondary/80 focus:ring-secondary/50',
    white: 'bg-slate-50 text-black hover:bg-slate-50',
    destructive:
      'bg-destructive hover:bg-destructive/80 focus:ring-destructive/50',
  };

  return (
    <button
      className={clsx(
        'select-none',
        'font-bold text-xs text-white uppercase',
        'py-3 px-6',
        'rounded-lg',
        'transition-all',
        'disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none',
        'focus:ring-4 focus:outline-none focus:ring-white/50',
        className,
        butonStylesMap[colorVariant],
        fullWidth && 'w-full',
      )}
      {...props}
    >
      {children}
    </button>
  );
}
