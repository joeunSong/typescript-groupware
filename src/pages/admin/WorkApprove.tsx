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

  const handleAccountDetail = (selectData: any) => {
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
        headerTitle={'부서원 목록'}
        headerTitleVisible={false}
        selectData={selectData}
        setSelectData={setSelectData}
        filterVisible={false}
        paginatorVisible={true}
        handleRowClick={handleAccountDetail}
      />
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: 'secondary.main' }}>
            <TableRow>
              <TableCell align='center'>근무일</TableCell>
              <TableCell align='center'>이름</TableCell>
              <TableCell align='center'>부서</TableCell>
              <TableCell align='center'>근무유형</TableCell>
              <TableCell align='center'>출근시간</TableCell>
              <TableCell align='center'>퇴근시간</TableCell>
              <TableCell align='center'>근태구분</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commutes &&
              commutes.map((commute: any) => {
                let start_at;
                let end_at;
                start_at = moment(commute.start_at);
                end_at = moment(commute.end_at);

                const formattedStartTime = start_at.format('HH:mm');
                const formattedEndTime = end_at.format('HH:mm');

                return (
                  <>
                    <TableRow
                      key={commute.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, textAlign: 'center' }}
                      className='cursor-pointer'
                      onClick={() => {
                        handleAccountDetail(commute.id);
                      }}
                    >
                      <TableCell align='center'>{`${commute.date}(${getDayOfWeek(commute.date)})`}</TableCell>
                      <TableCell align='center'>{commute.user_name}</TableCell>
                      <TableCell align='center'>{commute.department_title}</TableCell>
                      <TableCell align='center'>{commute.work_type_title}</TableCell>
                      <TableCell align='center'>{formattedStartTime}</TableCell>
                      <TableCell align='center'>{formattedEndTime}</TableCell>
                      <TableCell align='center'>{commute.status}</TableCell>
                    </TableRow>
                  </>
                );
              })} */}
      {isCommuteDetailOpen && commuteDetailId && (
        <DetailModal commuteDetailId={commuteDetailId} isCommuteDetailOpen={isCommuteDetailOpen} setIsCommuteDetailOpen={setIsCommuteDetailOpen} />
      )}
      {/* </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
};

export default AdminWorkApprovePage;
