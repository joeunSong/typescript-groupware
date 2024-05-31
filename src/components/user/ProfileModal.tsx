import React from 'react';
import { CustomModal } from '../common/Components';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { StringObject } from '../../types/interface';
import _ from 'lodash';

interface ProfileModalProps {
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: React.Dispatch<boolean>;
  profile: any;
}

const SHOW_DATA = ['name', 'email', 'rank', 'department', 'isAdmin', 'enterDate'];
const KOREAN_LABEL: StringObject = {
  name: '이름',
  email: '아이디',
  rank: '직위',
  department: '부서',
  isAdmin: '권한',
  enterDate: '입사일',
};

const ProfileModal = ({ isProfileModalOpen, setIsProfileModalOpen, profile }: ProfileModalProps) => {
  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <CustomModal isOpen={isProfileModalOpen} onClose={handleCloseModal} title='프로필'>
      <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
        <Table sx={{ minWidth: 500 }}>
          <TableBody>
            {Object.entries(_.pick(profile, SHOW_DATA)).map(([key, value]) => {
              if (key === 'is_admin') {
                return CustomRow(key, value ? '관리자' : '사용자');
              } else if (key === 'department' || key === 'rank') {
                return CustomRow(key, value.title);
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

export default ProfileModal;
