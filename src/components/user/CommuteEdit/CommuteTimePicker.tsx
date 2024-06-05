import { LocalizationProvider, TimePicker, TimeValidationError } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction, useMemo } from 'react';

interface CustomTimePickerProps {
  type: string;
  initialValue: Dayjs;
  onChange: (newValue: Dayjs) => void;
  setError: Dispatch<SetStateAction<Record<string, TimeValidationError>>>;
  error: Record<string, TimeValidationError>;
}

const CustomTimePicker = ({ type, initialValue, onChange, setError, error }: CustomTimePickerProps) => {
  const errorMessage = useMemo(() => {
    switch (error[type]) {
      case 'minTime': {
        return '퇴근 시간은 출근 시간보다 늦어야 합니다.';
      }

      case 'invalidDate': {
        return '유효하지 않은 시간입니다.';
      }

      default: {
        return '';
      }
    }
  }, [error, type]);
  return (
    <TimePicker
      ampm={false}
      views={['hours', 'minutes']}
      value={initialValue}
      onChange={(value) => value && onChange(value)}
      onError={(newError) => setError((prev) => ({ ...prev, [type]: newError }))}
      slotProps={{
        textField: {
          helperText: errorMessage,
        },
      }}
    />
  );
};
interface CommuteTimePickerProps {
  startAt: Dayjs;
  startOnChange: (newValue: Dayjs) => void;
  endAt: Dayjs;
  endOnChange: (newValue: Dayjs) => void;
  error: Record<string, TimeValidationError>;
  setError: Dispatch<SetStateAction<Record<string, TimeValidationError>>>;
}

const CommuteTimePicker = ({ startAt, startOnChange, endAt, endOnChange, setError, error }: CommuteTimePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomTimePicker type='startAt' initialValue={startAt} onChange={startOnChange} setError={setError} error={error} />
      <span className='self-center'>-</span>
      <CustomTimePicker type='endAt' initialValue={endAt} onChange={endOnChange} setError={setError} error={error} />
    </LocalizationProvider>
  );
};

export default CommuteTimePicker;
