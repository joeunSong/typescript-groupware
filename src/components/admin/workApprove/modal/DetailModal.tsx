import React, { useEffect, useState } from 'react';
import ADMIN_API from '../../../../services/admin';
import { COMPANY_ID } from '../../../../constants/constant';
import { CustomModal } from '../../../common/Components';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import _ from 'lodash';
import moment from 'moment';
import LoadingLayout from '../../../common/Loading';

interface AccountDetailProps {
  commuteDetailId: number;
  isCommuteDetailOpen: boolean;
  setIsCommuteDetailOpen: React.Dispatch<boolean>;
}

const SHOW_DATA = ['user_name', 'user_email', 'department_title', 'rank_title', 'title', 'status', 'start_at', 'end_at'];
const KOREAN_LABEL: any = {
  user_name: '이름',
  user_email: '아이디',
  department_title: '부서',
  rank_title: '직위',
  title: '근무유형',
  status: '근태구분',
  start_at: '출근시간',
  end_at: '퇴근시간',
};

const DetailModal = ({ commuteDetailId, isCommuteDetailOpen, setIsCommuteDetailOpen }: AccountDetailProps) => {
  const [commute, setCommute] = useState<any>();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCommuteDetail = async () => {
      try {
        const companyId = Number(localStorage.getItem(COMPANY_ID));
        const result = await ADMIN_API.getCommutes_detail(companyId, commuteDetailId);
        setCommute(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    getCommuteDetail();
  }, [commuteDetailId]);

  const handleCloseModal = () => {
    setIsCommuteDetailOpen(false);
  };

  return (
    <CustomModal isOpen={isCommuteDetailOpen} onClose={handleCloseModal} title='근무 상세'>
      {loading ? <LoadingLayout/> : <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
        <Table sx={{ minWidth: 500 }}>
          <TableBody>
            {Object.entries(_.pick(commute, SHOW_DATA)).map(([key, value]) => {
              if (key === 'start_at' || key === 'end_at') {
                const timeValue = moment(value);
                return [CustomRow(key, timeValue.format('HH:mm:ss'))];
              } else if (key === 'rank_title') {
                return [CustomRow(key, String(value)), CustomRow('title', commute.work_type.title)];
              } else {
                return [CustomRow(key, String(value))];
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>}
    </CustomModal>
  );
};

const CustomRow = (label: string, content: string) => {
  // console.log(label, content);
  return (
    <TableRow key={label}>
      <TableCell sx={{ border: 0, width: 100 }}>{KOREAN_LABEL[label]}</TableCell>
      <TableCell sx={{ border: 0 }}>{content}</TableCell>
    </TableRow>
  );
};
export default DetailModal;
