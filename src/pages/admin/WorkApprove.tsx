import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

function createData(
  name: number,
  company: string,
  position: string,
  id: string,
  startWork: string,
  startAccount: string,
  accountStatus: string,
  a: string,
  b: string,
) {
  return { name, company, position, id, startWork, startAccount, accountStatus, a, b };
}

const rows = [createData(30, '화요일', '개발 부서', '대리', '김지란', '출근', '지각', '9:00', '18:00')];

const AdminWorkApprovePage = () => {
  return (
    <div className='flex flex-col w-full h-full gap-5 p-5 bg-white'>
      <div className='flex justify-end'>
        {/* <CustomButton variant='contained' color='secondary' size='auto' onClick={HandleOpenModal}>
          계정 추가
        </CustomButton> */}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: 'secondary.main' }}>
            <TableRow>
              <TableCell align='center'>근무일</TableCell>
              <TableCell align='center'>요일</TableCell>
              <TableCell align='center'>부서</TableCell>
              <TableCell align='center'>직위</TableCell>
              <TableCell align='center'>이름</TableCell>
              <TableCell align='center'>
                구분
                <br />
                (출근/결근)
              </TableCell>
              <TableCell align='center'>
                상태
                <br />
                (지각/초과근무/정상)
              </TableCell>
              {/* <TableCell align='center'>근무유형\n(고민)</TableCell> */}
              <TableCell align='center'>출근시간</TableCell>
              <TableCell align='center'>퇴근시간</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((user: any) => (
              <>
                <TableRow
                  key={user.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, textAlign: 'center' }}
                  className='cursor-pointer'
                  // onClick={() => {
                  //   handleAccountDetail(user.id);
                  // }}
                >
                  <TableCell align='center'>{user.name}</TableCell>
                  <TableCell align='center'>{user.company}</TableCell>
                  <TableCell align='center'>{user.position}</TableCell>
                  <TableCell align='center'>{user.id}</TableCell>
                  <TableCell align='center'>{user.startWork}</TableCell>
                  <TableCell align='center'>{user.startAccount}</TableCell>
                  <TableCell align='center'>{user.accountStatus}</TableCell>
                  <TableCell align='center'>{user.a}</TableCell>
                  <TableCell align='center'>{user.b}</TableCell>
                </TableRow>
              </>
            ))}
            {/* {isAccountDetailOpen && accountDetailId && (
              <AccountDetail accountId={accountDetailId} isAccountDetailOpen={isAccountDetailOpen} setIsAccountDetailOpen={setIsAccountDetailOpen} />
            )} */}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <CreateUserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}
    </div>
  );
};

export default AdminWorkApprovePage;
