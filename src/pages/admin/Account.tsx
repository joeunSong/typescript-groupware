import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { CustomButton } from '../../components/common/Components';
import { useEffect, useState } from 'react';
import ADMIN_API from '../../services/admin';
import { COMPANY_ID } from '../../constants/constant';
import React from 'react';
import AccountDetail from '../../components/admin/AccountDetail';
import CreateUserModal from '../../components/admin/account/modal/CreateUserModal';
import ModifyUserModal from '../../components/admin/account/modal/ModifyUserModal';
import DeleteUserModal from '../../components/admin/account/modal/DeleteUserModal';

const rankSelectList = [
  { label: '대표', value: 8 },
  { label: '부장', value: 6 },
  { label: '차장', value: 5 },
  { label: '과장', value: 4 },
  { label: '대리', value: 1 },
  { label: '사원', value: 3 },
  { label: '인턴', value: 2 },
];

const authSelectList = [
  { label: '사용자', value: '0' },
  { label: '관리자', value: '1' },
];

const AccountPageLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersInfo, setUsersInfo] = useState<any>(null);
  const [isAccountDetailOpen, setIsAccountDetailOpen] = useState(1);
  const [accountDetailId, setAccountDetailId] = useState<number>();

  const HandleOpenModal = () => setIsModalOpen(true);

  useEffect(() => {
    const getUsersInfo = async () => {
      try {
        const companyId = Number(localStorage.getItem(COMPANY_ID));
        const response = await ADMIN_API.users(companyId);

        console.log('data: ', response.data);
        setUsersInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersInfo();
    // console.log('usersInfo: ', usersInfo);
  }, [isModalOpen, isAccountDetailOpen]);

  const handleAccountDetail = (accountId: number) => {
    setIsAccountDetailOpen(1);
    setAccountDetailId(accountId);
  };
  // console.log('usersInfo: ', usersInfo);
  const renderModal = () => {
    if (accountDetailId) {
      switch (isAccountDetailOpen) {
        case 1:
          return (
            <AccountDetail accountId={accountDetailId} isAccountDetailOpen={isAccountDetailOpen} setIsAccountDetailOpen={setIsAccountDetailOpen} />
          );
        case 2:
          return (
            <ModifyUserModal
              accountId={accountDetailId}
              isAccountDetailOpen={isAccountDetailOpen}
              setIsAccountDetailOpen={setIsAccountDetailOpen}
              rankSelectList={rankSelectList}
              authSelectList={authSelectList}
            />
          );
        case 3:
          return (
            <DeleteUserModal accountId={accountDetailId} isAccountDetailOpen={isAccountDetailOpen} setIsAccountDetailOpen={setIsAccountDetailOpen} />
          );
        default:
          return null;
      }
    }
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
          </TableBody>
        </Table>
      </TableContainer>
      <CreateUserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} rankSelectList={rankSelectList} authSelectList={authSelectList} />
      {renderModal()}
    </div>
  );
};

export default AccountPageLayout;
