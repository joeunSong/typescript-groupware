import { Button } from '@mui/material';

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
      color='primary'
      sx={{ color: 'white', width: size === 'lg' ? '18.75rem' : '14.375rem' }}
    >
      {children}
    </Button>
  );
};
