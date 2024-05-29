import React from 'react';
import Modal from '../../../common/Modal';
import { CustomButton } from '../../../common/Components';
import ADMIN_API from '../../../../services/admin';
import { COMPANY_ID } from '../../../../constants/constant';
interface DeleteUserProps {
  accountId: number;
  isAccountDetailOpen: number;
  setIsAccountDetailOpen: React.Dispatch<number>;
}

const headerTemplate = () => {
  return (
    <div className='flex items-center w-full p-9'>
      <span className='justify-center w-full font-bold text-center align-center font-h2'>계정 삭제</span>
    </div>
  );
};

const DeleteUserModal = ({ accountId, isAccountDetailOpen, setIsAccountDetailOpen }: DeleteUserProps) => {
  const handleDeleteClick = async () => {
    try {
      const companyId = Number(localStorage.getItem(COMPANY_ID));
      const response = await ADMIN_API.user_delete(companyId, accountId);

      console.log('response: ', response);
      setIsAccountDetailOpen(0);
    } catch (error) {
      console.log(error);
    }
  };

  const contentTemplate = () => {
    return (
      <div className='flex flex-col items-center gap-7'>
        <div className='flex font-body1-bold'>계정을 삭제하시겠습니까?</div>
        <div className='flex gap-3'>
          <CustomButton variant='contained' size='auto' color='secondary' onClick={() => setIsAccountDetailOpen(1)}>
            취소
          </CustomButton>
          <CustomButton variant='contained' size='auto' color='primary' onClick={() => handleDeleteClick()}>
            확인
          </CustomButton>
        </div>
      </div>
    );
  };
  return (
    <Modal
      visible={isAccountDetailOpen}
      setVisible={setIsAccountDetailOpen}
      headerTemplate={headerTemplate}
      contentTemplate={contentTemplate}
      dialogHeaderClassName={'p-0'}
      dialogClassName={``}
    />
  );
};

export default DeleteUserModal;
