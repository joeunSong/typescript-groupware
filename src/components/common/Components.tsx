import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material';
import { ReactNode } from 'react';

interface CustomButtonProps {
  onClick?: () => void;
  children: string;
  variant: 'text' | 'outlined' | 'contained';
  size: 'lg' | 'md' | 'auto';
  color: 'primary' | 'secondary';
}

/**
 * CustomButton
 * @param variant 'contained'만 사용
 * @param size lg: 로그인 버튼, md: 근태등록버튼
 * @returns
 */
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

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
}

/**
 * CustomModal
 * @param isOpen 모달이 열려있다면 true, 그렇지 않다면 false
 * @param onClose const closeModal = () => setIsModalOpen(false);
 * @param title 모달 상단 제목
 * @param content 모달 내용
 */
export const CustomModal = ({ isOpen, onClose, title, content }: CustomModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>{title}</p>
        <p onClick={onClose} className='cursor-pointer'>
          x
        </p>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
