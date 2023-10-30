import clsx from 'clsx';
import { ComponentProps } from 'react';

interface Props {
  label?: string;
}

export function Input({
  label,
  className,
  ...props
}: Props & ComponentProps<'input'>) {
  return (
    <div>
      {label && (
        <label className="font-medium text-base" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        className={clsx(
          'h-10 w-full',
          'rounded-md',
          'text-black text-base',
          'bg-white',
          'px-4 py-5',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    </div>
  );
}
