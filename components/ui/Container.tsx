import React from 'react';
import { clsx } from 'clsx';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide' | 'full';
  as?: React.ElementType;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', as: Component = 'div', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={clsx(
          'w-full mx-auto px-4 sm:px-6 lg:px-8',
          {
            'max-w-7xl': size === 'default',
            'max-w-4xl': size === 'narrow',
            'max-w-[90rem]': size === 'wide',
            'max-w-none px-0': size === 'full',
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';
