// * basic
// * install libraries
// * components
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Modal from '../../../common/Modal';
import { Button } from 'primereact/button';
// * constants
import { COMPANY_ID } from '../../../../constants/constant';
// * apis
import ADMIN_API from '../../../../services/admin';
import { useState } from 'react';
import DepartmentDeleteErrorModalLayout from './DepartmentDeleteErrorModal';

const DepartmentDeleteModal = (props: any) => {
  const { visible, setVisible, selectDepartment, getOrganization } = props;
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  // * 부서 삭제
  const handleAPI = async () => {
    try {
      await ADMIN_API.department_delete(localStorage.getItem(COMPANY_ID), selectDepartment.id);
      setVisible(false);
      getOrganization();
    } catch (error: any) {
      setErrorModalVisible(true);
    }
  };

  // * 헤더 템플렛
  const headerTemplate = () => {
    return (
      <div className='flex flex-col w-full items-center gap-5 p-5'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-red-100'>
          <InformationCircleIcon className='h-8 w-8 text-red-600 bg-red-100'></InformationCircleIcon>
        </div>
        <div className='flex w-full justify-center gap-1'>
          <span className='font-bold'>{selectDepartment?.label} </span>
          <span>부서를 삭제하시겠습니까?</span>
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
      <div className='flex w-full justify-end px-3 pb-2'>
        <Button label='닫기' className={`w-1/2 px-2 py-1 ring-0 border-0 text-white bg-gray-400`} onClick={() => setVisible(false)} autoFocus />
        <Button label='확인' className={`w-1/2 px-5 py-2 ring-0 border-0 text-white bg-primary `} onClick={handleAPI} autoFocus />
      </div>
    );
  };

  return (
    <>
      <DepartmentDeleteErrorModalLayout
        visible={visible}
        setVisible={setVisible}
        confirmVisible={errorModalVisible}
        setConfirmVisible={setErrorModalVisible}
      />
      <Modal
        visible={visible}
        setVisible={setVisible}
        headerTemplate={headerTemplate}
        contentTemplate={contentTemplate}
        footerTemplate={footerTemplate}
        dialogHeaderClassName={'p-0'}
        dialogClassName={`max-sm:w-full sm:w-9/12 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-5/12 3xl:w-4/12 4xl:w-3/12`}
      />
    </>
  );
};

export default DepartmentDeleteModal;
