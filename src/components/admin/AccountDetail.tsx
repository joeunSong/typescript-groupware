import React, { useEffect, useState } from 'react';
import { CustomButton, CustomModal } from '../common/Components';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import ADMIN_API from '../../services/admin';
import { COMPANY_ID } from '../../constants/constant';
import { User, StringObject } from '../../types/interface';
import _ from 'lodash';
import LoadingLayout from '../common/Loading';

interface AccountDetailProps {
  accountId: number;
  isAccountDetailOpen: number;
  setIsAccountDetailOpen: React.Dispatch<number>;
}

// api 구성에 따른 필터링 요소(임시)
const SHOW_DATA = ['name', 'email', 'rank_title', 'department_title', 'is_admin', 'enter_date'];
const KOREAN_LABEL: StringObject = {
  name: '이름',
  email: '아이디',
  rank_title: '직위',
  department_title: '부서',
  is_admin: '권한',
  enter_date: '입사일',
};

const AccountDetail = ({ accountId, isAccountDetailOpen, setIsAccountDetailOpen }: AccountDetailProps) => {
  const [account, setAccount] = useState<User>();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAccountDetail = async () => {
      try {
        const companyId = Number(localStorage.getItem(COMPANY_ID));
        const result = await ADMIN_API.account_detail(companyId, accountId);

        setAccount(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    getAccountDetail();
  }, [accountId]);

  const handleCloseModal = () => {
    setIsAccountDetailOpen(0);
  };

  return (
    <>
      <CustomModal isOpen={isAccountDetailOpen === 1} onClose={handleCloseModal} title='계정 상세'>
        {loading ? <LoadingLayout/> : <><TableContainer component={Paper} sx={{ boxShadow: 0 }}>
          <Table sx={{ minWidth: 500 }}>
            <TableBody>
              {Object.entries(_.pick(account, SHOW_DATA)).map(([key, value]) => {
                if (key === 'is_admin') {
                  console.log('isadmin', value ? '관리자' : '사용자');
                  return CustomRow(key, value ? '관리자' : '사용자');
                } else {
                  return CustomRow(key, String(value));
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='flex justify-center gap-5 mt-8'>
          <CustomButton variant='contained' size='auto' color='secondary' onClick={() => setIsAccountDetailOpen(3)}>
            삭제
          </CustomButton>
          <CustomButton variant='contained' size='auto' color='primary' onClick={() => setIsAccountDetailOpen(2)}>
            수정
          </CustomButton>
        </div></>}
      </CustomModal>
    </>
  );
};

const CustomRow = (label: string, content: string) => {
  // console.log(label, content);

  return (
    <TableRow key={label}>
      <TableCell sx={{ border: 0, width: 80 }}>{KOREAN_LABEL[label]}</TableCell>
      <TableCell sx={{ border: 0 }}>{content}</TableCell>
    </TableRow>
  );
};
export default AccountDetail;
