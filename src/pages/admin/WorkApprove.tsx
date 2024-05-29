import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { COMPANY_ID } from '../../constants/constant';
import ADMIN_API from '../../services/admin';
import DetailModal from '../../components/admin/workApprove/modal/DetailModal';
import moment from 'moment';

const AdminWorkApprovePage = () => {
  const [commutes, setCommutes] = useState<any>();
  const [isCommuteDetailOpen, setIsCommuteDetailOpen] = useState(false);
  const [commuteDetailId, setCommuteDetailId] = useState<number>();

  useEffect(() => {
    const getCommutes = async () => {
      try {
        const companyId = Number(localStorage.getItem(COMPANY_ID));
        const result = await ADMIN_API.getCommutes(companyId);
        console.log(result);

        setCommutes(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCommutes();
    console.log('commutes: ', commutes);
  });

  const getDayOfWeek = (date: Date) => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = week[new Date(date).getDay()];

    return dayOfWeek;
  };

  const handleAccountDetail = (commuteDetailId: number) => {
    setIsCommuteDetailOpen(true);
    setCommuteDetailId(commuteDetailId);
  };

  return (
    <div className='flex flex-col w-full h-full gap-5 p-5 bg-white'>
      <div className='flex justify-end'></div>
      <TableContainer component={Paper}>
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
              commutes.data.map((commute: any) => {
                const start_at = moment(commutes.data.start_at);
                const end_at = moment(commutes.data.end_at);

                const formattedStartTime = start_at.format('HH:mm');
                const formattedEndTime = end_at.format('HH:mm');

                return (
                  <>
                    <TableRow
                      key={commute.user_name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, textAlign: 'center' }}
                      className='cursor-pointer'
                      onClick={() => {
                        handleAccountDetail(commute.user_id);
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
              })}
            {isCommuteDetailOpen && commuteDetailId && (
              <DetailModal
                commuteDetailId={commuteDetailId}
                isCommuteDetailOpen={isCommuteDetailOpen}
                setIsCommuteDetailOpen={setIsCommuteDetailOpen}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminWorkApprovePage;
