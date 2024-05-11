import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { CustomButton } from '../../components/common/Components';
import { useEffect, useState } from 'react';
import ApiClient from '../../utils/axios';
import React from 'react';
import AccountDetail from '../../components/admin/AccountDetail';
import CreateUserModal from '../../components/admin/account/modal/CreateUserModal';

const AccountPageLayout = () => {
  const { instance, setBaseURL } = ApiClient;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersInfo, setUsersInfo] = useState<any>(null);
  const [isAccountDetailOpen, setIsAccountDetailOpen] = useState(false);
  const [accountDetailId, setAccountDetailId] = useState<number>();

  const HandleOpenModal = () => setIsModalOpen(true);

  useEffect(() => {
    const getUsersInfo = async () => {
      try {
        setBaseURL('http://127.0.0.1/api/');

        const response = await instance.get(`v1/companies/1/users`);
        console.log('data: ', response.data);
        setUsersInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersInfo();
    console.log('usersInfo: ', usersInfo);
  }, [isModalOpen]);

  const handleAccountDetail = (accountId: number) => {
    setIsAccountDetailOpen(true);
    setAccountDetailId(accountId);
  };
  console.log('usersInfo: ', usersInfo);

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
              <TableCell align='center'>부서</TableCell>
              <TableCell align='center'>직위</TableCell>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>권한</TableCell>
              <TableCell align='center'>입사일</TableCell>
              <TableCell align='center'>계정 생성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersInfo &&
              usersInfo.data.map((user: any) => (
                <>
                  <TableRow
                    key={user.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, textAlign: 'center' }}
                    className='cursor-pointer'
                    onClick={() => {
                      handleAccountDetail(user.id);
                    }}
                  >
                    <TableCell align='center'>{user.name}</TableCell>
                    <TableCell align='center'>{user.department_title}</TableCell>
                    <TableCell align='center'>{user.rank_title}</TableCell>
                    <TableCell align='center'>{user.email}</TableCell>
                    <TableCell align='center'>{user.is_admin}</TableCell>
                    <TableCell align='center'>{user.enter_date}</TableCell>
                    <TableCell align='center'>{user.created_date}</TableCell>
                  </TableRow>
                </>
              ))}
            {isAccountDetailOpen && accountDetailId && (
              <AccountDetail accountId={accountDetailId} isAccountDetailOpen={isAccountDetailOpen} setIsAccountDetailOpen={setIsAccountDetailOpen} />
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateUserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default AccountPageLayout;
