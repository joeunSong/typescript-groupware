import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { CustomButton } from '../../common/Components';
import { MiniOrganizationIcon } from '../../common/JiranIcon';
import { API_ORGANIZATION } from '../../../services/organzation';
import { COMPANY_ID } from '../../../constants/constant';
import { DataGrid, GridColumnHeaderParams, GridRowSelectionModel, useGridApiContext, useGridApiRef } from '@mui/x-data-grid';
import { useUpdateEffect } from 'react-use';
import React from 'react';

const DepartmentLayout = (props: any) => {
  const {} = props;
  // * 조직도
  const [organization, setOrganization]: any = useState([]);
  // * 선택된 회사, 사용자
  const [selectDepartment, setSelectDepartment]: any = useState(null);
  const [selectUser, setSelectUser]: any = useState(null);
  // * 선택된 Row
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);
  // * DataGrid 컬럼 정의
  const [columns, setColumns] = useState([
    { field: 'name', headerClassName: 'bg-[#DDDDDD] text-lg', headerName: '이름', width: 150, disableReorder: true },
    {
      field: 'rank',
      headerClassName: 'bg-[#DDDDDD] text-lg',
      headerName: '이름',
      width: 150,
      valueGetter: (params: any) => params.title,
    },
    {
      field: 'email',
      headerClassName: 'bg-[#DDDDDD] text-lg',
      headerName: 'ID',
      width: 150,
      disableReorder: true,
    },
  ]);

  // * 회사 클릭
  const handleDepartmentClick = (_department: any) => {
    setSelectDepartment(_department);
    setSelectUser(null);
    setRowSelectionModel([]);
  };

  // * 사용자 클릭
  const handleUserClick = (_department: any, _user: any) => {
    setSelectDepartment(_department);
    setSelectUser(_user);
  };

  // * 초기 세팅
  useEffect(() => {
    try {
      API_ORGANIZATION(localStorage.getItem(COMPANY_ID)).then((res: any) => {
        setOrganization([res.data.data]);
      });
    } catch (e) {}
  }, []);

  return (
    <div className='flex w-full h-full '>
      {/* 조직도 */}
      <div className='flex flex-col w-[250px] min-w-[250px] h-full px-3 pt-3 gap-3 bg-white'>
        {/* 조직도 제목 */}
        <span className='text-lg font-medium'>조직도</span>
        {/* 조직도 내용 */}
        <div className='flex flex-col'>
          {/* 조직도 상단 기능 목록 */}
          <div className='flex border-solid border-b-[1px] pb-1'>
            <span className='text-sm'>부서</span>
          </div>
          {/* 실제 조직도 */}
          <div className='flex w-full h-full '>
            <Box component='div' sx={{ width: '100%', height: '45rem', overflowY: 'auto' }} className='scrollYWrap'>
              <SimpleTreeView sx={{ height: '100%' }}>
                {/* 트리 순회 */}
                {_.map(organization, (treeItem: any) => {
                  // 회사별 순회
                  return (
                    <TreeItem itemId={treeItem?.label} label={treeItem?.label} key={treeItem?.label} onClick={() => handleDepartmentClick(treeItem)}>
                      {/* 회사 */}
                      {_.map(treeItem?.departments, (departments: any) => {
                        return (
                          <TreeItem
                            itemId={departments?.label}
                            label={departments?.label}
                            key={departments?.label}
                            onClick={() => handleDepartmentClick(departments)}
                          >
                            {/* 부서 */}
                            {_.map(departments?.departments, (department: any) => {
                              return (
                                <TreeItem
                                  itemId={department?.label}
                                  label={department?.label}
                                  key={department?.label}
                                  onClick={() => handleDepartmentClick(department)}
                                ></TreeItem>
                              );
                            })}
                            {/* 부서 내 사용자 */}
                            {_.map(departments?.users, (user: any) => {
                              return (
                                <TreeItem
                                  itemId={user?.label}
                                  label={user?.label}
                                  key={user?.label}
                                  onClick={() => handleUserClick(departments, user)}
                                ></TreeItem>
                              );
                            })}
                          </TreeItem>
                        );
                      })}
                      {/* 회사 내 사용자 */}
                      {_.map(treeItem?.users, (users: any) => {
                        return (
                          <TreeItem
                            itemId={users?.label}
                            label={users?.label}
                            key={users?.label}
                            onClick={() => {
                              handleUserClick(treeItem, users);
                            }}
                          ></TreeItem>
                        );
                      })}
                    </TreeItem>
                  );
                })}
              </SimpleTreeView>
            </Box>
          </div>
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
                <span className='text-[18px]'>부서 근태관리자</span>
              </div>
              <div className='flex w-full'>
                <CustomButton variant='contained' color='secondary' size='md'>
                  <div className='flex w-full justify-between'>
                    <span>근태 관리자 선택</span>
                    <MiniOrganizationIcon width={25} height={25} />
                  </div>
                </CustomButton>
              </div>
            </div>
          </div>
        </div>

        {/* 부서원 목록  */}
        <div className='flex flex-col w-full gap-3'>
          {_.isEmpty(selectDepartment?.users) ? (
            <span className='text-2xl font-bold'>부서원 없음</span>
          ) : (
            <>
              <span className='text-2xl font-bold'>부서원 목록</span>
              <div className='flex w-11/12'>
                <DataGrid
                  rows={selectDepartment?.users}
                  columns={columns}
                  // * 선택 Row
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                  }}
                  rowSelectionModel={rowSelectionModel}
                  // * Row 클릭 이벤트
                  onRowClick={(data: any) => {}}
                  // * 페이지네이션
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  // * 헤더 메뉴 비활성화
                  disableColumnMenu
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentLayout;
