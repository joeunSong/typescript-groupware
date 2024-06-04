// * basic
import { useState } from 'react';
//  * install libraries
// * components
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Modal from '../../../common/Modal';
// * constants
import { COMPANY_ID } from '../../../../constants/constant';
// * apis
import ADMIN_API from '../../../../services/admin';

const DepartmentCreateModal = (props: any) => {
  const { visible, setVisible, getOrganization } = props;

  const [value, setValue] = useState('');

  // * 부서 추가
  const handleAPI = async () => {
    try {
      await ADMIN_API.department_create(localStorage.getItem(COMPANY_ID), value);
      setVisible(false);
      getOrganization();
    } catch (error: any) {}
  };

  // * 헤더 템플렛
  const headerTemplate = () => {
    return (
      <div className='flex w-full p-3'>
        <span className='text-xl font-bold'>부서 등록</span>
      </div>
    );
  };
  // * 콘텐츠 템플렛
  const contentTemplate = () => {
    return (
      <div className='flex w-full items-center bg-white gap-5 p-5'>
        <div className='flex w-[70px] min-w-[70px]'>
          <span>부서 이름</span>
        </div>
        <InputText value={value} onChange={(e) => setValue(e.target.value)} className=' w-full ring-0 border-gray-300' />
      </div>
    );
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
    <Modal
      visible={visible}
      setVisible={setVisible}
      headerTemplate={headerTemplate}
      contentTemplate={contentTemplate}
      footerTemplate={footerTemplate}
      dialogHeaderClassName={'p-0'}
      dialogClassName={`max-sm:w-full sm:w-9/12 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-5/12 3xl:w-4/12 4xl:w-3/12`}
    />
  );
};

export default DepartmentCreateModal;
