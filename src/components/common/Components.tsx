import { Button, Container } from '@mui/material';
import { ReactNode } from 'react';

interface CustomButtonProps {
  onClick?: () => void;
  children: string;
  variant?: 'text' | 'outlined' | 'contained';
  size: 'lg' | 'md';
}

export const CustomButton = ({ onClick, children, variant, size }: CustomButtonProps) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      color='secondary'
      sx={{ color: 'white', width: size === 'lg' ? '18.75rem' : '14.375rem' }}
    >
      {children}
    </Button>
  );
};

interface ContentBoxProps {
  title: string;
  children: ReactNode;
}

export const ContentBox = ({ title, children }: ContentBoxProps) => {
  return (
    <div className='flex flex-col w-full h-full gap-2.5 p-2.5 bg-secondary-300'>
      <div className='px-16 py-3 bg-white font-h1'>{title}</div>
      <div className='px-10 py-16 bg-white h-fit font-body1'>{children}</div>
    </div>
  );
};
