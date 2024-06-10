// * basic
// * install libraries
// * components
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Modal from '../../../common/Modal';
import { Button } from 'primereact/button';
// * constants
// * apis

const DepartmentDeleteErrorModalLayout = (props: any) => {
  const { visible, setVisible, confirmVisible, setConfirmVisible } = props;

  const handleModalClose = () => {
    setConfirmVisible(false);
    setVisible(false);
  };
  // * 헤더 템플렛
  const headerTemplate = () => {
    return (
      <div className='flex flex-col w-full items-center gap-5 p-5'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-red-100'>
          <InformationCircleIcon className='h-8 w-8 text-red-600 bg-red-100'></InformationCircleIcon>
        </div>
        <div className='flex flex-col w-full items-center justify-center gap-1'>
          <span>부서원이 존재하는 부서는 삭제가 불가합니다.</span>
          <span>부서원을 이동 후 삭제해주세요. </span>
        </div>
      </div>
    );
  };
  // * 콘텐츠 템플렛
  const contentTemplate = () => {
    return <></>;
  };

  // * 바닥 템플렛
  const footerTemplate = () => {
    return (
      <div className='flex w-full  px-3 pb-2'>
        <Button label='닫기' className={`w-full px-5 py-2 ring-0 border-0 text-white bg-primary`} onClick={handleModalClose} autoFocus />
      </div>
    );
  };

  return (
    <>
      <Modal
        visible={confirmVisible}
        setVisible={setConfirmVisible}
        headerTemplate={headerTemplate}
        contentTemplate={contentTemplate}
        footerTemplate={footerTemplate}
        dialogHeaderClassName={'p-0'}
        dialogClassName={`max-sm:w-full sm:w-9/12 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-5/12 3xl:w-4/12 4xl:w-3/12`}
      />
    </>
  );
};

export default DepartmentDeleteErrorModalLayout;
