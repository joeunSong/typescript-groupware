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
// * constants
// * apis

const ContentLayout = (props: any) => {
  const { getOrganization, selectDepartment, selectUser, setSelectUser, departmentLeader } = props;
  // * 근태 관리자 설정 모달
  const [managerVisible, setManagerVisible] = useState(false);
  // * 사용자 상세 정보 모달
  // const [userDetailVisible, setUserDetailVisible] = useState(false);
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
    if (_.isEmpty(selectDepartment?.users)) {
      return;
    }
    setManagerVisible(true);
  };

  // useUpdateEffect(() => {
  //   if (!_.isEmpty(selectUser)) {
  //     setUserDetailVisible(true);
  //   }
  // }, [selectUser]);

  return (
    <>
      {/* <AccountDetail isAccountDetailOpen={userDetailVisible} setIsAccountDetailOpen={setUserDetailVisible} accountId={selectUser?.id} /> */}
      {/* 근태 관리자 수정 모달 */}
      <DepartmentManagerModal
        visible={managerVisible}
        setVisible={setManagerVisible}
        selectDepartment={selectDepartment}
        columns={columns}
        getOrganization={getOrganization}
      />
      {/* 부서 정보 내용 */}
      <div className='flex flex-col w-full gap-5 overflow-hidden'>
        {/* 부서명 */}
        <div className='flex w-full'>
          <div className='flex min-w-[150px]'>
            <span className='text-[18px]'>부서명(한글)</span>
          </div>
          <div className='flex w-full'>
            <span>{selectDepartment?.label} </span>
          </div>
        </div>
        {/* 부서 생성일  */}
        <div className='flex w-full'>
          <div className='flex min-w-[150px]'>
            <span className='text-[18px]'>부서 생성일</span>
          </div>
          <div className='flex w-full'>
            <span>
              {_.isEmpty(selectDepartment?.created_at)
                ? moment().format('YYYY-MM-DD hh:mm:ss')
                : moment(selectDepartment?.created_at).format('YYYY-MM-DD hh:mm:ss')}
            </span>
          </div>
        </div>
        {/* 부서 근태관리자  */}
        <div className='flex w-full items-center'>
          <div className='flex min-w-[150px]'>
            <span className='text-[18px]'>근태 관리자</span>
          </div>
          <div className='flex w-full'>
            <CustomButton variant='contained' color='secondary' size='md' onClick={handleDepartmentManager}>
              <div className='flex w-full justify-between'>
                <span>{_.isEmpty(departmentLeader?.label) ? '근태 관리자 설정' : departmentLeader?.label}</span>
                <MiniOrganizationIcon width={25} height={25} />
              </div>
            </CustomButton>
          </div>
        </div>

        {/* 부서원 목록  */}
        <div className='flex flex-col w-full h-full gap-3 overflow-hidden'>
          {_.isEmpty(selectDepartment?.users) ? (
            <></>
          ) : (
            <>
              <span className='text-[18px]'>부서원 목록</span>
              <div className='flex w-full h-full scrollYWrap overflow-y-auto'>
                <CustomeDataTable
                  data={selectDepartment?.users}
                  columns={columns}
                  headerTitle={'부서원 목록'}
                  headerTitleVisible={false}
                  selectData={selectUser}
                  setSelectData={setSelectUser}
                  filterVisible={false}
                  paginatorVisible={false}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ContentLayout;
