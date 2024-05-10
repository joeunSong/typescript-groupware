import React, { useEffect, useState } from 'react';
import { CustomModal } from '../common/Components';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import ADMIN_API from '../../services/admin';
import { COMPANY_ID } from '../../constants/constant';
import { Account, StringObject } from '../../types/interface';
import _ from 'lodash';

interface AccountDetailProps {
  accountId: number;
  isAccountDetailOpen: boolean;
  setIsAccountDetailOpen: React.Dispatch<boolean>;
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

const AccountDetail = ({
  accountId,
  isAccountDetailOpen,
  setIsAccountDetailOpen,
}: AccountDetailProps) => {
  const [account, setAccount] = useState<Account>();

  useEffect(() => {
    const getAccountDetail = async () => {
      try {
        const companyId = Number(localStorage.getItem(COMPANY_ID));
        const result = await ADMIN_API.account_detail(companyId, accountId);

        setAccount(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAccountDetail();
  }, [accountId]);

  const handleCloseModal = () => {
    setIsAccountDetailOpen(false);
  };

  return (
    <CustomModal isOpen={isAccountDetailOpen} onClose={handleCloseModal} title='계정 상세'>
      <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
        <Table sx={{ minWidth: 500 }}>
          <TableBody>
            {Object.entries(_.pick(account, SHOW_DATA)).map(([key, value]) => {
              if (key === 'isAdmin') {
                return CustomRow(key, value ? '관리자' : '사용자');
              } else {
                return CustomRow(key, String(value));
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomModal>
  );
};

const CustomRow = (label: string, content: string) => (
  <TableRow key={label}>
    <TableCell sx={{ border: 0, width: 80 }}>{KOREAN_LABEL[label]}</TableCell>
    <TableCell sx={{ border: 0 }}>{content}</TableCell>
  </TableRow>
);

export default AccountDetail;
