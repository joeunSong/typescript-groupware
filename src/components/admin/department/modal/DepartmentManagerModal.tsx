// * basic
import { useState } from 'react';
// * install libraries
// * components
import { Button } from 'primereact/button';
import Modal from '../../../common/Modal';
import CustomeDataTable from '../../../common/DataTable';
// * constants
import { COMPANY_ID } from '../../../../constants/constant';
// * apis
import ADMIN_API from '../../../../services/admin';
import { XMarkIcon } from '@heroicons/react/24/outline';

const DepartmentManagerModal = (props: any) => {
  const { visible, setVisible, selectDepartment, columns, getOrganization } = props;
  const [selectData, setSelectData]: any = useState(null);
  // * 부서 추가
  const handleAPI = async () => {
    try {
      await ADMIN_API.department_manager_edit(localStorage.getItem(COMPANY_ID), selectData?.department_id, selectData?.id);
      setVisible(false);
      getOrganization();
    } catch (error: any) {}
  };

  // * 모달 닫기
  const handleModalClose = () => {
    setVisible(false);
  };

  // * 헤더 템플렛
  const headerTemplate = () => {
    return (
      <div className='flex w-full justify-between px-[24px] py-[50px]'>
        <span className='text-3xl font-bold'>근태 관리자 설정</span>
        <XMarkIcon className=' cursor-pointer' width={25} height={25} fill='#000000' onClick={handleModalClose} />
      </div>
    );
  };
  // * 콘텐츠 템플렛
  const contentTemplate = () => {
    return (
      <div className='flex w-full items-center bg-white'>
        <CustomeDataTable
          data={selectDepartment?.users}
          columns={columns}
          headerTitle={'부서원 목록'}
          headerTitleVisible={false}
          selectData={selectData}
          setSelectData={setSelectData}
          filterVisible={false}
          paginatorVisible={true}
          emptyMessage={'부서원이 존재하지 않습니다.'}
        />
      </div>
    );
  };

  // * 바닥 템플렛
  const footerTemplate = () => {
    return (
      <div className='flex w-full justify-center px-3 pb-2 gap-5ß'>
        <Button label='닫기' className={`w-20 px-2 py-1 ring-0 border-0 text-white bg-gray-400`} onClick={() => setVisible(false)} autoFocus />
        <Button label='확인' className={`w-20 px-5 py-2 ring-0 border-0 text-white bg-primary`} onClick={handleAPI} autoFocus />
      </div>
    );
  };

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      headerTemplate={headerTemplate}
      contentTemplate={contentTemplate}
      footerTemplate={footerTemplate}
      dialogHeaderClassName={'p-0'}
      dialogClassName={`max-sm:w-full sm:w-9/12 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-5/12 3xl:w-4/12 4xl:w-3/12`}
      dialogContentClassName={'px-[24px] pb-3'}
      dialogFooterClassName={'px-[24px] pb-[20px]'}
    />
  );
};

export default DepartmentManagerModal;
