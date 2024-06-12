// * basic
import { useEffect, useState } from 'react';
// * install libraries
import _ from 'lodash';
import moment from 'moment';
// * components
import { CustomButton } from '../../../common/Components';
import CustomeDataTable from '../../../common/DataTable';
import DepartmentManagerModal from '../modal/DepartmentManagerModal';
import { CustomDepartmentAuth, CustomDepartmentID, CustomDepartmentName, CustomDepartmentPostion } from './CustomColumns';
import { MiniOrganizationIcon } from '../../../common/JiranIcon';
import { Button } from 'primereact/button';
// * constants
// * apis

const ContentLayout = (props: any) => {
  const { getOrganization, selectDepartment, selectUser, setSelectUser, departmentLeader } = props;
  // * 근태 관리자 설정 모달
  const [managerVisible, setManagerVisible] = useState(false);
  // * comlum 정의
  const columns = [
    {
      field: 'name',
      header: '이름',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomDepartmentName(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
    {
      field: 'rank.title',
      header: '직위',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomDepartmentPostion(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
    {
      field: 'email',
      header: '아이디',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomDepartmentID(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '40%' },
    },
    {
      field: 'is_admin',
      header: '권한',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomDepartmentAuth(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '20%' },
    },
  ];

  // * 근태 관리자 설정 모달 Open
  const handleDepartmentManager = () => {
    setManagerVisible(true);
  };

  return (
    <>
      {/* 근태 관리자 수정 모달 */}
      <DepartmentManagerModal
        visible={managerVisible}
        setVisible={setManagerVisible}
        selectDepartment={selectDepartment}
        columns={columns}
        getOrganization={getOrganization}
      />
      {/* 부서 정보 내용 */}
      <div className='flex flex-col w-full h-full gap-5 overflow-hidden'>
        {selectDepartment?.company_id === undefined || selectDepartment?.company_id === null ? (
          <div className='flex w-full h-full justify-center items-center'>
            <span className='text-2xl font-bold'>부서를 선택해주세요</span>
          </div>
        ) : (
          <>
            <div className='flex w-full'>
              <div className='flex min-w-[150px]'>
                <span className='text-[18px]'>부서명(한글)</span>
              </div>
              <div className='flex w-full'>
                <span>{_.isEmpty(selectDepartment?.label) ? '부서를 선택해주세요' : selectDepartment?.label} </span>
              </div>
            </div>
            <div className='flex w-full items-center'>
              <div className='flex min-w-[150px]'>
                <span className='text-[18px]'>근태 관리자</span>
              </div>
              <div className='flex w-full'>
                <Button
                  className='flex items-center w-[200px] py-2 px-4 bg-white border-solid border-2 border-gray-300 ring-0'
                  onClick={handleDepartmentManager}
                >
                  <div className='flex  w-full items-center justify-between'>
                    <span className='text-black'>{_.isEmpty(departmentLeader?.label) ? '근태 관리자 설정' : departmentLeader?.label}</span>
                    <MiniOrganizationIcon width={25} height={25} />
                  </div>
                </Button>
              </div>
            </div>

            <div className='flex flex-col w-full h-full gap-3 overflow-hidden'>
              <span className='text-[18px]'>부서원 목록</span>
              <div className='flex w-full scrollYWrap overflow-y-auto'>
                <CustomeDataTable
                  data={selectDepartment?.users}
                  columns={columns}
                  headerTitle={'부서원 목록'}
                  headerTitleVisible={false}
                  selectData={selectUser}
                  setSelectData={setSelectUser}
                  filterVisible={false}
                  paginatorVisible={true}
                  emptyMessage={'부서원을 추가해주세요'}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ContentLayout;
