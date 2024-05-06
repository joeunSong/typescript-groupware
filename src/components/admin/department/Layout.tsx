import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import _ from 'lodash';
import { useState } from 'react';

const DepartmentLayout = (props: any) => {
  const {} = props;
  const [treeItems, setTreeItems] = useState([
    {
      type: 'department',
      label: '지란지교패밀리',
      departments: [
        {
          type: 'department',
          label: '지란지교소프트',
          departments: [],
          users: [
            { type: 'user', label: '소프트1' },
            { type: 'user', label: '소프트2' },
            { type: 'user', label: '소프트3' },
            { type: 'user', label: '소프트4' },
            { type: 'user', label: '소프트5' },
          ],
        },
        {
          type: 'department',
          label: '지란지교데이터',
          departments: [],
          users: [
            { type: 'user', label: '데이터1' },
            { type: 'user', label: '데이터2' },
            { type: 'user', label: '데이터3' },
            { type: 'user', label: '데이터4' },
            { type: 'user', label: '데이터5' },
            { type: 'user', label: '데이터6' },
            { type: 'user', label: '데이터7' },
            { type: 'user', label: '데이터8' },
          ],
        },
        {
          type: 'department',
          label: '지란지교시큐리티',
          departments: [],
          users: [
            { type: 'user', label: '시큐리티1' },
            { type: 'user', label: '시큐리티2' },
            { type: 'user', label: '시큐리티3' },
            { type: 'user', label: '시큐리티4' },
          ],
        },
        {
          type: 'department',
          label: '에스에스알',
          departments: [],
          users: [
            { type: 'user', label: '에스알1' },
            { type: 'user', label: '에스알2' },
            { type: 'user', label: '에스알3' },
          ],
        },
      ],
      users: [
        { type: 'user', label: '테스트1' },
        { type: 'user', label: '테스트2' },
        { type: 'user', label: '테스트3' },
        { type: 'user', label: '테스트4' },
        { type: 'user', label: '테스트5' },
        { type: 'user', label: '테스트6' },
      ],
    },
  ]);
  const [selectDepartment, setSelectDepartment] = useState(null);
  const [selectUser, setSelectUser] = useState(null);

  const handleItemClick = (item: any) => {
    console.log('item', item);
  };

  return (
    <div className='flex w-full h-full gap-3'>
      {/* 조직도 */}
      <div className='flex flex-col w-[250px] min-w-[250px] h-full p-3 gap-3 bg-white'>
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
            {/* // TODO!! Tree overflow 발생하지 않음 수정필요 */}
            <Box component='div' sx={{ width: '100%', height: '100%', overflowY: 'auto' }} className='scrollYWrap'>
              <SimpleTreeView>
                {/* 트리 순회 */}
                {_.map(treeItems, (treeItem: any) => {
                  // 회사별 순회
                  return (
                    <TreeItem itemId={treeItem?.label} label={treeItem?.label} key={treeItem?.label} onClick={() => handleItemClick(treeItem)}>
                      {/* 회사 */}
                      {_.map(treeItem?.departments, (departments: any) => {
                        return (
                          <TreeItem
                            itemId={departments?.label}
                            label={departments?.label}
                            key={departments?.label}
                            onClick={() => handleItemClick(departments)}
                          >
                            {/* 부서 */}
                            {_.map(departments?.departments, (department: any) => {
                              return (
                                <TreeItem
                                  itemId={department?.label}
                                  label={department?.label}
                                  key={department?.label}
                                  onClick={() => handleItemClick(department)}
                                ></TreeItem>
                              );
                            })}
                            {/* 부서 내 사용자 */}
                            {_.map(departments?.users, (user: any) => {
                              return (
                                <TreeItem itemId={user?.label} label={user?.label} key={user?.label} onClick={() => handleItemClick(user)}></TreeItem>
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
                              handleItemClick(users);
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
      <div className='flex w-full h-full bg-white'></div>
    </div>
  );
};

export default DepartmentLayout;
