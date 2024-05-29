import { LocalizationProvider, TimePicker, TimeValidationError } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';

interface CommuteTimePickerProps {
  startAt: Dayjs;
  startOnChange: (newValue: Dayjs) => void;
  endAt: Dayjs;
  endOnChange: (newValue: Dayjs) => void;
}

const CommuteTimePicker = ({ startAt, startOnChange, endAt, endOnChange }: CommuteTimePickerProps) => {
  const [error, setError] = useState<TimeValidationError | null>(null);

  const errorMessage = useMemo(() => {
    switch (error) {
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
  }, [error]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker ampm={false} views={['hours', 'minutes']} value={startAt} onChange={(value) => value && startOnChange(value)} />
      <span className='self-center'>-</span>
      <TimePicker
        ampm={false}
        views={['hours', 'minutes']}
        value={endAt}
        onChange={(value) => value && endOnChange(value)}
        minTime={startAt}
        onError={(newError) => setError(newError)}
        slotProps={{
          textField: {
            helperText: errorMessage,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CommuteTimePicker;
