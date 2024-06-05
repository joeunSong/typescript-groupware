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
import {
  CustomCreatedDate,
  CustomDepartment,
  CustomEmail,
  CustomEnterDate,
  CustomIsAdmin,
  CustomName,
  CustomRank,
} from '../../components/admin/account/content/CustomColumns';
import CustomeDataTable from '../../components/common/DataTable';
import LoadingLayout from '../../components/common/Loading';

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
  const [selectData, setSelectData]: any = useState(null);
  const [isAccountDetailOpen, setIsAccountDetailOpen] = useState(1);
  const [accountDetailId, setAccountDetailId] = useState<number>();
  const [loading, setLoading] = useState(true)

  const HandleOpenModal = () => setIsModalOpen(true);

  useEffect(() => {
    const getUsersInfo = async () => {
      try {
        const companyId = Number(localStorage.getItem(COMPANY_ID));
        const response = await ADMIN_API.users(companyId);

        console.log('data: ', response.data);
        setUsersInfo(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    getUsersInfo();
    console.log('usersInfo: ', usersInfo);
  }, [isModalOpen, isAccountDetailOpen]);

  const columns = [
    {
      field: 'name',
      header: '이름',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomName(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
    {
      field: 'department_title',
      header: '부서',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomDepartment(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
    {
      field: 'rank_title',
      header: '직위',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomRank(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
    {
      field: 'email',
      header: 'ID',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomEmail(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
    {
      field: 'is_admin',
      header: '권한',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomIsAdmin(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
    {
      field: 'enter_date',
      header: '입사일',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomEnterDate(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
    {
      field: 'created_date',
      header: '계정 생성일',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomCreatedDate(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
  ];

  const handleAccountDetail = (selectData: any) => {
    setIsAccountDetailOpen(1);
    setAccountDetailId(selectData.data.id);
  };
  console.info('usersInfo: ', usersInfo);
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
        <CustomButton variant='contained' color='add' size='auto' onClick={HandleOpenModal}>
          계정 추가
        </CustomButton>
      </div>
      {loading ? (
        <LoadingLayout />
      ) : (
        <CustomeDataTable
          data={usersInfo}
          columns={columns}
          selectData={selectData}
          setSelectData={setSelectData}
          filterVisible={false}
          paginatorVisible={true}
          handleRowClick={handleAccountDetail}
        />
      )}
      <CreateUserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} rankSelectList={rankSelectList} authSelectList={authSelectList} />
      {renderModal()}
    </div>
  );
};

export default AccountPageLayout;
