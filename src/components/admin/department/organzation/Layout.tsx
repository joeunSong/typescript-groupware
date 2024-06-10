// * basic
import { useState } from 'react';
// * install libraries
import _ from 'lodash';
// * components
import Organzation from '../../../common/Organzation';
import DepartmentDeleteModal from '../modal/DepartmentDelete';
import DepartmentCreateModal from '../modal/DepartmentCreateModal';
import { XIcon } from '../../../common/JiranIcon';
import { PlusIcon } from '@heroicons/react/24/outline';
// * constants
// * apis

const OrganizationLayout = (props: any) => {
  const { getOrganization, organization, selectDepartment, selectUser, handleDepartmentClick, handleUserClick } = props;

  // * 부서 추가 모달
  const [createVisible, setCreateVisible] = useState(false);
  const [deleteVisible, setdeleteVisible] = useState(false);

  // * 부서 추가 모달 Open
  const handleDepartmentAdd = () => {
    setCreateVisible(true);
  };

  // * 부서 추가 모달 Open
  const handleDepartmentDelete = () => {
    setdeleteVisible(true);
  };

  return (
    <div className='flex flex-col w-full h-full gap-2 pb-3 overflow-hidden'>
      {/* 부서 추가 모달 */}
      <DepartmentCreateModal visible={createVisible} setVisible={setCreateVisible} getOrganization={getOrganization} />
      {/* 부서 삭제 모달 */}
      <DepartmentDeleteModal
        visible={deleteVisible}
        setVisible={setdeleteVisible}
        selectDepartment={selectDepartment}
        getOrganization={getOrganization}
      />
      <div className='flex w-full items-center px-1 py-2 gap-2 border-solid border-b-[1px] border-gray-300 '>
        <span>부서</span>
        {/* 부서 추가 버튼 */}
        <button className='flex px-2 py-0.5 bg-[##f3f3f3] border-solid border-0 rounded-md cursor-pointer' onClick={handleDepartmentAdd}>
          <PlusIcon width={20} height={20} />
        </button>
        {/* 부서 삭제 버튼 */}

        {selectDepartment?.company_id === undefined ? (
          <></>
        ) : (
          <button
            className='flex px-2 py-0.5 bg-[##f3f3f3] border-solid border-0 rounded-md cursor-pointer'
            onClick={() => {
              if (!_.isEmpty(selectDepartment) && selectDepartment?.label !== 'JIRAN') {
                handleDepartmentDelete();
              }
            }}
          >
            <XIcon width={20} height={20} />
          </button>
        )}
      </div>
      {/* 조직도 내용 */}
      <div className='flex w-full h-full border-solid border-2 border-gray-300 rounded-lg overflow-y-auto scrollYWrap'>
        <Organzation
          organization={organization}
          selectDepartment={selectDepartment}
          selectUser={selectUser}
          handleDepartmentClick={handleDepartmentClick}
          handleUserClick={handleUserClick}
          handleDepartmentAdd={handleDepartmentAdd}
        />
      </div>
    </div>
  );
};

export default OrganizationLayout;
