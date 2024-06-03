import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { COMPANY_ID } from '../../constants/constant';
import ADMIN_API from '../../services/admin';
import DetailModal from '../../components/admin/workApprove/modal/DetailModal';
import CustomeDataTable from '../../components/common/DataTable';
import {
  CustomDate,
  CustomDepartmentTitle,
  CustomEndAt,
  CustomStatus,
  CustomUserName,
  CustomWorkTypeTitle,
} from '../../components/admin/workApprove/content/CustomColumns';
import { CustomStartAt } from '../../components/user/approval/CustomColumns';

const AdminWorkApprovePage = () => {
  const [commutes, setCommutes] = useState<any>();
  const [isCommuteDetailOpen, setIsCommuteDetailOpen] = useState(false);
  const [commuteDetailId, setCommuteDetailId] = useState<number>();
  const [selectData, setSelectData]: any = useState(null);

  useEffect(() => {
    const getCommutes = async () => {
      try {
        const companyId = Number(localStorage.getItem(COMPANY_ID));
        const result = await ADMIN_API.getCommutes(companyId);
        // console.log(result);

        setCommutes(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCommutes();
  });

  const handleWorkDetail = (selectData: any) => {
    setIsCommuteDetailOpen(true);
    setCommuteDetailId(selectData.data.id);
  };

  const columns = [
    {
      field: 'date',
      header: '근무일',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomDate(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
    {
      field: 'user_name',
      header: '이름',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomUserName(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
    {
      field: 'department_title',
      header: '부서',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomDepartmentTitle(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
    {
      field: 'work_type_title',
      header: '근무유형',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomWorkTypeTitle(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
    {
      field: 'start_at',
      header: '출근시간',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomStartAt(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
    {
      field: 'end_at',
      header: '퇴근시간',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomEndAt(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
    {
      field: 'status',
      header: '근태구분',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomStatus(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
  ];

  return (
    <div className='flex flex-col w-full h-full gap-5 p-5 bg-white'>
      <div className='flex justify-end'></div>
      <CustomeDataTable
        data={commutes}
        columns={columns}
        selectData={selectData}
        setSelectData={setSelectData}
        filterVisible={false}
        paginatorVisible={true}
        handleRowClick={handleWorkDetail}
      />
      {isCommuteDetailOpen && commuteDetailId && (
        <DetailModal commuteDetailId={commuteDetailId} isCommuteDetailOpen={isCommuteDetailOpen} setIsCommuteDetailOpen={setIsCommuteDetailOpen} />
      )}
    </div>
  );
};

export default AdminWorkApprovePage;
