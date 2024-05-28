import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface WorkTimeSelectProps {
  value: string;
  onChange: (e: SelectChangeEvent) => void;
}

const WorkTimeSelect = ({ value, onChange }: WorkTimeSelectProps) => {
  return (
    <Select value={value} onChange={onChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
      <MenuItem value='근무'>근무</MenuItem>
      <MenuItem value='출장'>출장</MenuItem>
      <MenuItem value='외근'>외근</MenuItem>
      <MenuItem value='원격'>원격 근무</MenuItem>
    </Select>
  );
};

export default WorkTimeSelect;
