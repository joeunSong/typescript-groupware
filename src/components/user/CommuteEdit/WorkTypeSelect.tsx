import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import USER_API from '../../../services/user';
import { useEffect, useState } from 'react';
import { WorkType } from '../../../types/interface';

interface WorkTimeSelectProps {
  value: string;
  onChange: (e: SelectChangeEvent) => void;
}

const WorkTypeSelect = ({ value, onChange }: WorkTimeSelectProps) => {
  const [workType, setWorkType] = useState<WorkType[] | string>('');

  useEffect(() => {
    const getCommuteType = async () => {
      try {
        const response = await USER_API.commute_type();
        setWorkType(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCommuteType();
  }, []);

  return (
    <Select value={workType.length ? value : ''} onChange={onChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }} className='w-full'>
      {typeof workType === 'object' &&
        workType.map((type) => {
          return (
            <MenuItem key={type.id} value={type.title}>
              {type.title}
            </MenuItem>
          );
        })}
    </Select>
  );
};

export default WorkTypeSelect;
