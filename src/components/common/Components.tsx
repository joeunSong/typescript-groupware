import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { ReactNode, useEffect } from 'react';
import { Control, Controller, FieldPath, FieldValues, RegisterOptions, useController, UseControllerProps, useFormContext } from 'react-hook-form';

interface CustomButtonProps {
  onClick?: (() => void) | ((event: any) => void);
  children: any;
  variant: 'text' | 'outlined' | 'contained';
  size: 'lg' | 'md' | 'auto';
  color: 'primary' | 'secondary' | 'add';
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
  const colorSet: Record<CustomButtonProps['color'], { backgroundColor: string; hover: string; color?: string }> = {
    primary: { backgroundColor: 'primary.main', hover: '#bc6003' },
    secondary: { backgroundColor: 'secondary.600', hover: '#959595' },
    add: { backgroundColor: '#EDF5FF', hover: '#DEE7F2' },
  };
  return (
    <Button
      variant={variant}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
      sx={{
        color: color === 'add' ? '#4182FB' : 'white',
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
          padding: '0 1.2rem',
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
        <div>{children}</div>
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
  value?: string;
}
/**
 * react-hook-form을 사용하기 위해 만든 customInput
 */
export const CustomInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  textFieldProps, // textField를 위한 prop들, mui에서 import 해온다.
  value,
  ...props
}: MuiProps & UseControllerProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  const formContext = useFormContext();

  useEffect(() => {
    if (formContext && value) {
      console.log('setValue called:', props.name, value); // setValue 함수가 호출되는지 확인
      formContext.setValue(props.name as string, value || '');
    }
  }, [formContext, value, props.name]);

  return <TextField {...textFieldProps} {...field} error={!!error} helperText={!!error && error.message} />;
};

export interface ISelectItem {
  label: ReactNode;
  value: string | number;
  selected?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}

interface CustomSelectProps<T> {
  selectList: ISelectItem[];
  placeholder?: string;
  onChange?: (event: SelectChangeEvent<any>) => void;
  getValue?: string;
}

type TProps<T extends FieldValues> = Omit<SelectProps, 'onChange' | 'placeholder'> & CustomSelectProps<T> & TControl<T>;
/**
 * react-hook-form을 사용하기 위해 만든 CustomSelect
 */
export const CustomSelect = <T extends FieldValues>(props: TProps<T>) => {
  const { name, rules, control, selectList, placeholder, onChange: propsOnChange, getValue } = props;
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules,
    control,
  });
  const handleChange = (event: SelectChangeEvent<any>) => {
    onChange(event.target.value);
    if (propsOnChange) {
      propsOnChange(event);
    }
  };
  useEffect(() => {
    if (getValue && !value) {
      const initialValue = selectList.find((item) => item.label === getValue)?.value;
      onChange(initialValue);
    }
  }, [getValue, value, onChange, selectList]);

  const renderValue = (selected: any) => {
    if (!selected && getValue) {
      return getValue;
    }
    return selectList.find((item) => item.value === selected)?.label || placeholder;
  };
  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <Select
          value={value || ''}
          renderValue={(selected) => renderValue(selected)}
          onChange={handleChange}
          onBlur={onBlur}
          displayEmpty
          error={invalid}
        >
          <MenuItem disabled value=''>
            {placeholder}
          </MenuItem>
          {selectList.map(({ label, value, disabled }, index) => (
            <MenuItem key={index} value={value} disabled={disabled ?? false}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {invalid &&
        error && ( // 에러가 있을 경우 에러 메시지 표시
          <p
            style={{
              color: '#d32f2f',
              fontWeight: '400',
              fontSize: '0.75rem',
              lineHeight: '1.66',
              textAlign: 'left',
              marginTop: '3px',
              marginRight: '14px',
              marginBottom: 0,
              marginLeft: '14px',
            }}
          >
            {error.message}
          </p>
        )}
    </div>
  );
};

interface CustomDatePickerProps<T> {
  name: Extract<keyof T, string>;
  control: any;
  error?: boolean;
  helperText?: string;
  defaultValue: any;
  onDateChange?: any;
  label?: string;
  format?: string;
  rules?: any;
  getValue?: string;
}

export const CustomDatePicker = <T,>({
  name,
  control,
  error,
  helperText,
  defaultValue,
  onDateChange,
  label,
  format,
  rules,
  getValue,
  ...rest
}: CustomDatePickerProps<T>) => {
  const val = getValue ? getValue : null;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control as Control<FieldValues, any>}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
          <>
            <DatePicker
              value={value ? dayjs(value) : dayjs(val)}
              label={label}
              format={format}
              // showDaysOutsideCurrentMonth
              onChange={onChange}
              slotProps={{
                actionBar: {
                  actions: ['today', 'accept'],
                },
                textField: {
                  error: !!error,
                  helperText: error?.message,
                },
              }}
              {...rest}
            />
          </>
        )}
      />
    </LocalizationProvider>
  );
};
