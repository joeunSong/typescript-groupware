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
import { CustomButton, CustomModal } from '../../components/common/Components';
import { useState } from 'react';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function createData(name: string, company: string, position: string, id: string, startWork: number, startAccount: number, accountStatus: string) {
  return { name, company, position, id, startWork, startAccount, accountStatus };
}

const rows = [
  createData('김지란', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
  createData('김지란2', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
  createData('김지란3', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
  createData('김지란4', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
];

/**
 * @todo api연결, 날짜 포맷
 */
const AccountPageLayout = () => {
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
        <div>
          <div className='grid-box'>
            <div className='text-black font-body1'>
              이름&nbsp;<span className='text-red'>*</span>
            </div>
            <TextField variant='outlined' />
            <div className='text-black font-body1'>
              아이디&nbsp;<span className='text-red'>*</span>
            </div>
            <div className='flex gap-1'>
              <TextField variant='outlined' />
              <p className='font-body1'>@jiran.com</p>
            </div>
            <div className='text-black font-body1'>
              비밀번호&nbsp;<span className='text-red'>*</span>
            </div>
            <TextField variant='outlined' />
            <div className='text-black font-body1'>
              비밀번호 확인&nbsp;<span className='text-red'>*</span>
            </div>
            <TextField variant='outlined' />
            <div className='text-black font-body1'>
              직위&nbsp;<span className='text-red'>*</span>
            </div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem disabled value=''>
                  <em>부서선택</em>
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
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem disabled value=''>
                  <em>계정 상태 선택</em>
                </MenuItem>
                <MenuItem>개발 부서</MenuItem>
                <MenuItem>기획 부서</MenuItem>
              </Select>
            </FormControl>

            <div className='text-black font-body1'>입사일</div>
            {/* <DatePicker label="Basic date picker" /> */}
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default AccountPageLayout;
