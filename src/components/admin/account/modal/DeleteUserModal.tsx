import React from 'react';
import Modal from '../../../common/Modal';
import { CustomButton } from '../../../common/Components';

interface DeleteUserProps {
  accountId: number;
  isAccountDetailOpen: number;
  setIsAccountDetailOpen: React.Dispatch<number>;
}

const headerTemplate = () => {
  return (
    <div className='flex w-full p-3'>
      <span className='text-xl font-bold'>계정 삭제</span>
    </div>
  );
};
// * 콘텐츠 템플렛
const contentTemplate = (setIsAccountDetailOpen: React.Dispatch<number>) => {
  return (
    <div className='flex items-center w-full gap-5 p-5 bg-white'>
      <div className='flex w-[70px] min-w-[70px]'>계정을 삭제하시겠습니까?</div>
      <CustomButton variant='contained' size='auto' color='secondary' onClick={() => setIsAccountDetailOpen(1)}>
        취소
      </CustomButton>
      <CustomButton variant='contained' size='auto' color='primary'>
        확인
      </CustomButton>
    </div>
  );
};

const DeleteUserModal = ({ accountId, isAccountDetailOpen, setIsAccountDetailOpen }: DeleteUserProps) => {
  return (
    <Modal
      visible={isAccountDetailOpen}
      setVisible={setIsAccountDetailOpen}
      headerTemplate={headerTemplate}
      contentTemplate={contentTemplate}
      dialogHeaderClassName={'p-0'}
      dialogClassName={`z-1400 max-sm:w-full sm:w-9/12 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-5/12 3xl:w-4/12 4xl:w-3/12 `}
    />
  );
};

export default DeleteUserModal;
