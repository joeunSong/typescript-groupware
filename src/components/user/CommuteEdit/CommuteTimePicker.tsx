import { TimePicker } from '@mui/x-date-pickers/TimePicker/TimePicker';
import { TimeValidationError } from '@mui/x-date-pickers/models/validation';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction, useMemo } from 'react';

interface CommuteTimePickerProps {
  type: string;
  initialValue: Dayjs;
  onChange: (newValue: Dayjs) => void;
  setError: Dispatch<SetStateAction<Record<string, TimeValidationError>>>;
  error: Record<string, TimeValidationError>;
  startAt?: Dayjs;
}

const CommuteTimePicker = ({ type, initialValue, onChange, setError, error, startAt }: CommuteTimePickerProps) => {
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
    <div className={`${error[type] ? '' : 'mb-5'}`}>
      <TimePicker
        ampm={false}
        views={['hours', 'minutes']}
        value={initialValue}
        onChange={(value) => {
          if (value) {
            setError((prev) => ({ ...prev, [type]: null }));
            onChange(value);
          } else {
            const error: TimeValidationError = 'invalidDate';
            setError((prev) => ({ ...prev, [type]: error }));
          }
        }}
        onError={(newError) => setError((prev) => ({ ...prev, [type]: newError }))}
        slotProps={{
          textField: {
            helperText: errorMessage,
            FormHelperTextProps: {
              style: { color: 'red', minHeight: '20px' },
            },
          },
        }}
        {...(type === 'endAt' ? { minTime: startAt } : {})}
      />
    </div>
  );
};
// interface CommuteTimePickerProps {
//   startAt: Dayjs;
//   startOnChange: (newValue: Dayjs) => void;
//   endAt: Dayjs;
//   endOnChange: (newValue: Dayjs) => void;
//   error: Record<string, TimeValidationError>;
//   setError: Dispatch<SetStateAction<Record<string, TimeValidationError>>>;
// }

// const CommuteTimePicker = memo(({ startAt, startOnChange, endAt, endOnChange, setError, error }: CommuteTimePickerProps) => {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <CustomTimePicker type='startAt' initialValue={startAt} onChange={startOnChange} setError={setError} error={error} />
//       <span className='self-center'>-</span>
//       <CustomTimePicker type='endAt' initialValue={endAt} onChange={endOnChange} setError={setError} error={error} startAt={startAt} />
//     </LocalizationProvider>
//   );
// });

export default CommuteTimePicker;
