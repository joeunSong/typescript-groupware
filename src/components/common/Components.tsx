import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, makeStyles, TextField, TextFieldProps, Theme } from '@mui/material';
import { ReactNode } from 'react';
import { Control, FieldPath, FieldValues, RegisterOptions, useController, UseControllerProps } from 'react-hook-form';

interface CustomButtonProps {
  onClick?: () => void;
  children: any;
  variant: 'text' | 'outlined' | 'contained';
  size: 'lg' | 'md' | 'auto';
  color: 'primary' | 'secondary';
  submit?: boolean;
}

/**
 * CustomButton
 * @param variant 'contained'만 사용
 * @param size lg: 로그인 버튼, md: 근태등록버튼
 * @returns
 */
export const CustomButton = ({ onClick, children, variant, size, color, submit }: CustomButtonProps) => {
  const width: Record<CustomButtonProps['size'], string> = {
    auto: 'auto',
    md: '14.375rem',
    lg: '18.75rem',
  };
  const colorSet: Record<CustomButtonProps['color'], { backgroundColor: string; hover: string }> = {
    primary: { backgroundColor: 'primary.main', hover: '#bc6003' },
    secondary: { backgroundColor: 'secondary.600', hover: '#959595' },
  };
  return (
    <Button
      variant={variant}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
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
  children: ReactNode;
}

/**
 * CustomModal
 * @param isOpen 모달이 열려있다면 true, 그렇지 않다면 false
 * @param onClose const closeModal = () => setIsModalOpen(false);
 * @param title 모달 상단 제목
 * @param content 모달 내용
 */
export const CustomModal = ({ isOpen, onClose, title, children }: CustomModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          padding: '1.2rem',
          gap: '0.5rem',
          '& .custom-dialog-title': { display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '1.875rem' },
        },
      }}
    >
      <DialogTitle className='custom-dialog-title'>
        <p>{title}</p>
        <p onClick={onClose} className='cursor-pointer'>
          x
        </p>
      </DialogTitle>
      <DialogContent>
        <div className='pt-2'>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

interface TControl<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Omit<RegisterOptions<T>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

interface MuiProps {
  textFieldProps?: TextFieldProps;
}
/**
 * react-hook-form을 사용하기 위해 만든 customInput
 */
export const CustomInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  textFieldProps, // textField를 위한 prop들, mui에서 import 해온다.
  ...props
}: MuiProps & UseControllerProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return <TextField {...textFieldProps} {...field} error={!!error} helperText={!!error && error.message} />;
};
