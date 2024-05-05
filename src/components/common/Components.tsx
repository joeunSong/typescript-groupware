import { Button, Container, Modal } from '@mui/material';
import { ReactNode } from 'react';

interface CustomButtonProps {
  onClick?: () => void;
  children: string;
  variant: 'text' | 'outlined' | 'contained';
  size: 'lg' | 'md' | 'auto';
  color: 'primary' | 'secondary';
}

export const CustomButton = ({ onClick, children, variant, size, color }: CustomButtonProps) => {
  const width: Record<CustomButtonProps['size'], string> = {
    auto: 'auto',
    md: '14.375rem',
    lg: '18.75rem',
  };
  const colorSet: Record<CustomButtonProps['color'], { backgroundColor: string; hover: string }> = {
    primary: { backgroundColor: 'primary.main', hover: '' },
    secondary: { backgroundColor: 'secondary.main', hover: '#959595' },
  };
  return (
    <Button
      variant={variant}
      onClick={onClick}
      sx={{
        color: 'white',
        backgroundColor: colorSet[color].backgroundColor,
        ':hover': { backgroundColor: colorSet[color].hover },
        width: width[size],
      }}
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

// export const CustomModal = () => {
//   return(
//     <Modal>

//     </Modal>
//   )
// }
