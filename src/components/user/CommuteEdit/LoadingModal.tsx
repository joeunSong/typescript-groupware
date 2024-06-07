import LoadingLayout from '../../common/Loading';
import Modal from '../../common/Modal';

interface LoadingModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingModal = ({ isModalOpen, setIsModalOpen }: LoadingModalProps) => {
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const content = () => <LoadingLayout />;

  return <Modal visible={isModalOpen} setVisible={handleModalClose} contentTemplate={content} />;
};

export default LoadingModal;
