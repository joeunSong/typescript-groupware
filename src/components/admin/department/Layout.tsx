import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { CustomButton } from '../../common/Components';
import { MiniOrganizationIcon } from '../../common/JiranIcon';
import { COMPANY_ID } from '../../../constants/constant';
import React from 'react';
import ADMIN_API from '../../../services/admin';
import CustomeDataTable from '../../common/DataTable';
import { CustomDepartmentID, CustomDepartmentName, CustomDepartmentPostion } from './CustomColumns';
import { PlusIcon } from '@heroicons/react/24/outline';
import DepartmentCreateModal from './modal/DepartmentCreateModal';
import { Button } from 'primereact/button';
import DepartmentManagerModal from './modal/DepartmentManagerModal';
import Organzation from '../../common/Organzation';

const DepartmentLayout = (props: any) => {
  const {} = props;
  // * 조직도
  const [organization, setOrganization]: any = useState([]);
  // * 부서 추가 모달
  const [createVisible, setCreateVisible] = useState(false);
  // * 근태 관리자 설정 모달
  const [managerVisible, setManagerVisible] = useState(false);
  // * 선택된 회사, 사용자
  const [selectDepartment, setSelectDepartment]: any = useState(null);
  const [departmentLeader, setDepartmentLeader]: any = useState(null);
  const [selectUser, setSelectUser]: any = useState(null);
  // * 선택된 테이블 Row
  const [selectRow, setSelectRow] = useState([]);
  // * comlum 정의
  const columns = [
    {
      field: 'name',
      header: '이름',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomDepartmentName(rowData, tableData),
      className: 'max-w-[0px] p-0',
      style: { width: '30%' },
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
      style: { width: '50%' },
    },
  ];

  // * 회사 클릭
  const handleDepartmentClick = (_department: any) => {
    setSelectDepartment(_department);
    setDepartmentLeader((prev: any) => {
      let leader = null;
      _.map(_department?.users, (user: any) => {
        if (user?.is_leader === true) {
          leader = user;
          return;
        }
      });
      return leader;
    });
    setSelectUser(null);
    setSelectRow([]);
  };

  // * 사용자 클릭
  const handleUserClick = (_department: any, _user: any) => {
    console.log('zz');
    setSelectDepartment(_department);
    setDepartmentLeader((prev: any) => {
      let leader = null;
      _.map(_department?.users, (user: any) => {
        if (user?.is_leader === true) {
          leader = user;
          return;
        }
      });
      return leader;
    });
    setSelectUser(_user);
    setSelectRow(_user);
  };

  // * 조직도 호출
  const getOrganization = () => {
    try {
      ADMIN_API.organization(localStorage.getItem(COMPANY_ID)).then((res: any) => {
        setOrganization([res.data.data]);
      });
    } catch (e) {}
  };

  // * 부서 추가 모달 Open
  const handleDepartmentAdd = async () => {
    setCreateVisible(true);
  };

  // * 근태 관리자 설정 모달 Open
  const handleDepartmentManager = () => {
    if (_.isEmpty(selectDepartment?.users)) {
      return;
    }
    setManagerVisible(true);
  };

  // * 초기 세팅
  useEffect(() => {
    getOrganization();
  }, []);

  return (
    <>
      {/* 부서 추가 모달 */}
      <DepartmentCreateModal visible={createVisible} setVisible={setCreateVisible} getOrganization={getOrganization} />
      {/* 근태 관리자 설정 모달 */}
      <DepartmentManagerModal
        visible={managerVisible}
        setVisible={setManagerVisible}
        selectDepartment={selectDepartment}
        setDepartmentLeader={setDepartmentLeader}
        columns={columns}
        getOrganization={getOrganization}
      />
      <div className='flex w-full h-full '>
        {/* 조직도 */}
        <div className='flex flex-col w-[250px] min-w-[250px] h-full px-3 pt-3 bg-white'>
          <span className='text-2xl font-bold'>조직도</span>
          <div className='flex w-full justify-end px-1'>
            {/* 부서 추가 */}
            <div className='flex border-solid border-[1px] rounded-full mb-1 cursor-pointer' onClick={handleDepartmentAdd}>
              <PlusIcon width={20} height={20} />
            </div>
          </div>
          {/* 조직도 내용 */}
          <div className='flex w-full h-full mb-4 border-solid border-2 border-gray-300 rounded-lg'>
            <Organzation organization={organization} handleDepartmentClick={handleDepartmentClick} handleUserClick={handleUserClick} />
          </div>
        </div>
        {/* 내용 */}
        <div className='flex flex-col w-full h-full pt-3 gap-5 bg-white'>
          {/* 부서 정보 */}
          <div className='flex flex-col w-full gap-3'>
            {/* 부서 정보 및 부서원 추가 */}
            <div className='flex w-full justify-between'>
              <span className='text-2xl font-bold'>부서 정보</span>
              <div className='flex px-10'>
                <CustomButton variant='contained' color='secondary' size='auto'>
                  계정 추가
                </CustomButton>
              </div>
            </div>
            {/* 부서 정보 내용 */}
            <div className='flex flex-col w-full gap-5'>
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
                      <span>{_.isEmpty(departmentLeader) ? '근태 관리자 설정' : departmentLeader?.name}</span>
                      <MiniOrganizationIcon width={25} height={25} />
                    </div>
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
          {/* 부서원 목록  */}
          <div className='flex flex-col w-full gap-3'>
            <span className='text-[18px]'>부서원 목록</span>
            {_.isEmpty(selectDepartment?.users) ? (
              <></>
            ) : (
              <>
                <div className='flex w-11/12'>
                  <CustomeDataTable
                    data={selectDepartment?.users}
                    columns={columns}
                    headerTitle={'부서원 목록'}
                    headerTitleVisible={false}
                    selectData={selectRow}
                    setSelectData={setSelectRow}
                    filterVisible={false}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentLayout;
