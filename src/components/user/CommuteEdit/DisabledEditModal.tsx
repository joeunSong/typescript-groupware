import { CustomButton } from '../../common/Components';
import Modal from '../../common/Modal';

interface DisabledEditModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisabledEditModal = ({ isModalOpen, setIsModalOpen }: DisabledEditModalProps) => {
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const content = () => (
    <div className='flex justify-center align-middle'>
      <div className='w-[250px]'>이미 조정 요청된 근무 기록입니다.</div>
    </div>
  );

  const footer = () => (
    <div className='flex justify-center align-middle mb-8'>
      <CustomButton variant='text' size='auto' color='secondary' submit={false} onClick={handleModalClose}>
        확인
      </CustomButton>
    </div>
  );

  return <Modal visible={isModalOpen} setVisible={handleModalClose} contentTemplate={content} footerTemplate={footer} />;
};

export default DisabledEditModal;
