import {
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { CustomButton, CustomInput, CustomModal } from '../../components/common/Components';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';

function createData(name: string, company: string, position: string, id: string, startWork: number, startAccount: number, accountStatus: string) {
  return { name, company, position, id, startWork, startAccount, accountStatus };
}

const rows = [
  createData('김지란', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
  createData('김지란2', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
  createData('김지란3', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
  createData('김지란4', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
];

interface FormValue {
  name: string;
  id: string;
  password: string;
  passwordCheck: string;
  // rank: string;
}

/**
 * @todo api연결, 날짜 포맷
 */
const AccountPageLayout = () => {
  const { control, handleSubmit } = useForm<FormValue>();
  const [value, setValue] = useState<Dayjs | null>();
  const [age, setAge] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const HandleOpenModal = () => setIsModalOpen(true);
  const HandleCloseModal = () => setIsModalOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div className='flex flex-col w-full h-full gap-5 p-5 bg-white'>
      <div className='flex justify-end'>
        <CustomButton variant='contained' color='secondary' size='auto' onClick={HandleOpenModal}>
          계정 추가
        </CustomButton>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: 'secondary.main' }}>
            <TableRow>
              <TableCell align='center'>이름</TableCell>
              <TableCell align='center'>회사</TableCell>
              <TableCell align='center'>직위</TableCell>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>입사일</TableCell>
              <TableCell align='center'>계정 생성일</TableCell>
              <TableCell align='center'>계정 상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 }, textAlign: 'center' }}>
                <TableCell align='center'>{row.name}</TableCell>
                <TableCell align='center'>{row.company}</TableCell>
                <TableCell align='center'>{row.position}</TableCell>
                <TableCell align='center'>{row.id}</TableCell>
                <TableCell align='center'>{row.startWork}</TableCell>
                <TableCell align='center'>{row.startAccount}</TableCell>
                <TableCell align='center'>{row.accountStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomModal isOpen={isModalOpen} onClose={HandleCloseModal} title='계정추가'>
        <form onSubmit={handleSubmit((data: any) => alert(JSON.stringify(data)))}>
          <div className='grid-box'>
            <div className='text-black font-body1'>
              이름&nbsp;<span className='text-red'>*</span>
            </div>
            <CustomInput
              name='name'
              control={control}
              rules={{ required: '필수항목을 입력해주세요.', minLength: { value: 2, message: '최소 2글자 이상 입력하세요.' } }}
              textFieldProps={{
                variant: 'outlined',
              }}
            />
            <div className='text-black font-body1'>
              아이디&nbsp;<span className='text-red'>*</span>
            </div>
            <div className='flex gap-2 align-center'>
              <CustomInput
                name='id'
                control={control}
                rules={{ required: '필수항목을 입력해주세요.' }}
                textFieldProps={{
                  variant: 'outlined',
                }}
              />
              <p className='font-body1'>@jiran.com</p>
            </div>
            <div className='text-black font-body1'>
              비밀번호&nbsp;<span className='text-red'>*</span>
            </div>
            <CustomInput
              name='password'
              control={control}
              rules={{ required: '필수항목을 입력해주세요.' }}
              textFieldProps={{
                variant: 'outlined',
              }}
            />
            <div className='text-black font-body1'>
              비밀번호 확인&nbsp;<span className='text-red'>*</span>
            </div>
            <CustomInput
              name='passwordCheck'
              control={control}
              rules={{ required: '필수항목을 입력해주세요.' }}
              textFieldProps={{
                variant: 'outlined',
              }}
            />
            <div className='text-black font-body1'>
              직위&nbsp;<span className='text-red'>*</span>
            </div>
            <FormControl sx={{ minWidth: 120 }}>
              <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem disabled value=''>
                  부서선택
                </MenuItem>
                <MenuItem>대표</MenuItem>
                <MenuItem>부장</MenuItem>
                <MenuItem>차장</MenuItem>
                <MenuItem>과장</MenuItem>
                <MenuItem>대리</MenuItem>
                <MenuItem>사원</MenuItem>
                <MenuItem>인턴</MenuItem>
              </Select>
            </FormControl>
            <div className='text-black font-body1'>
              부서&nbsp;<span className='text-red'>*</span>
            </div>
            <FormControl sx={{ minWidth: 120 }}>
              <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem disabled value=''>
                  계정 상태 선택
                </MenuItem>
                <MenuItem>개발 부서</MenuItem>
                <MenuItem>기획 부서</MenuItem>
              </Select>
            </FormControl>
            <div className='text-black font-body1'>입사일</div>
            <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ monthShort: `M` }}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  label='YYYY/MM/DD'
                  format='YYYY-MM-DD'
                  showDaysOutsideCurrentMonth
                  value={value}
                  onChange={(newValue: any) => setValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className='flex justify-center gap-5 mt-6'>
            <CustomButton variant='contained' size='auto' color='secondary'>
              취소
            </CustomButton>
            <CustomButton variant='contained' size='auto' color='primary' submit>
              저장
            </CustomButton>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default AccountPageLayout;
