import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { CustomButton } from '../../components/common/Components';

function createData(name: string, company: string, position: string, id: string, startWork: number, startAccount: number, accountStatus: string) {
  return { name, company, position, id, startWork, startAccount, accountStatus };
}

const rows = [
  createData('김지란', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
  createData('김지란', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
  createData('김지란', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
  createData('김지란', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
];

/**
 * @todo api연결, 날짜 포맷
 */
const AccountPageLayout = () => {
  return (
    <div className='flex flex-col w-full h-full gap-5'>
      <div className='flex justify-end'>
        <CustomButton variant='contained' color='secondary' size='auto'>
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
    </div>
  );
};

export default AccountPageLayout;
