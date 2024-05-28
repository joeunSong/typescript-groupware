import { CustomModal } from '../../common/Components';

interface DisabledEditModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<boolean>;
}

const DisabledEditModal = ({ isModalOpen, setIsModalOpen }: DisabledEditModalProps) => {
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <CustomModal isOpen={isModalOpen} onClose={handleModalClose} title='근무 기록 조정'>
      <div className='flex flex-col gap-3 '>
        <div className='flex gap-2'>이미 조정 요청된 근무 기록입니다.</div>
      </div>
    </CustomModal>
  );
};

export default DisabledEditModal;
