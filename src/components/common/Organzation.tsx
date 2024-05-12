import { ChevronDownIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import { Panel } from 'primereact/panel';
import { MiniCompanyIcon, MiniFolderIcon, MiniUserIcon, MiniUserLeaderIcon, PlusIcon, XIcon } from './JiranIcon';

const OrganzationLayout = (props: any) => {
  const { organization, selectDepartment, selectUser, handleDepartmentClick, handleUserClick } = props;

  // * Panel Header 템플렛
  const panelHeaderTemplate = (options: any, type: any, item: any) => {
    return (
      <div
        className={`flex w-full items-center py-1 hover:bg-gray-100 cursor-pointer
        ${item.id === selectDepartment?.id && item.label === selectDepartment?.label ? (!_.isEmpty(selectDepartment) && _.isEmpty(selectUser) ? 'bg-gray-100' : '') : ''}`}
      >
        {/* 본인에게 자식이 더 있다면 아이콘 */}
        <div
          className='flex flex-none items-center w-6 h-6'
          onClick={() => {
            options.onTogglerClick();
          }}
        >
          {!_.isEmpty(item?.users) || !_.isEmpty(item?.departments) ? (
            <div
              className={`flex items-center ${options.collapsed ? '-rotate-90' : ''} origin-center transition-transform duration-300 cursor-pointer`}
            >
              <ChevronDownIcon width={20} height={15} />
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* 아이콘 및 내용 */}
        <div className={`flex w-full items-center gap-1`} onClick={() => handleDepartmentClick(item)}>
          {type === 'company' ? <MiniCompanyIcon width={16} height={16} /> : type === 'department' ? <MiniFolderIcon width={20} height={20} /> : null}
          <span className='noto-sans-kr text-base truncate'>{item?.label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className='flex w-full h-full overflow-x-hidden '>
      {/* 조직도 순회 */}
      {_.map(organization, (company: any, companyIndex: number) => {
        return (
          <div className='flex flex-col w-full h-full ' key={companyIndex}>
            {/* 회사 */}
            <Panel
              className='w-full'
              headerTemplate={(headerProps) => panelHeaderTemplate(headerProps, 'company', company)}
              toggleable={true}
              collapsed={true}
              pt={{ content: { className: 'p-0' } }}
            >
              {/* 회사 내 부서 */}
              {_.map(company?.departments, (department: any, departmentIndex: number) => {
                return (
                  <div className={`flex flex-col w-full pl-3`} key={departmentIndex}>
                    <Panel
                      className='w-full'
                      headerTemplate={(headerProps) => panelHeaderTemplate(headerProps, 'department', department)}
                      toggleable={true}
                      collapsed={true}
                      pt={{ content: { className: 'p-0' } }}
                    >
                      {/* 부서 내 사용자 */}
                      {_.map(department?.users, (user: any, userIndex: number) => {
                        return (
                          <div
                            className={`flex w-full items-center py-1 hover:bg-gray-100
                          ${user.id === selectUser?.id && user.label === selectUser?.label ? (!_.isEmpty(selectDepartment) && !_.isEmpty(selectUser) ? 'bg-gray-100' : '') : ''}
                          `}
                            key={userIndex}
                          >
                            <div className='flex w-full items-center pl-10 cursor-pointer' onClick={() => handleUserClick(department, user)}>
                              {user?.is_leader ? <MiniUserLeaderIcon width={24} height={24} /> : <MiniUserIcon width={24} height={24} />}
                              <span className='noto-sans text-base truncate'>{user?.label}</span>
                            </div>
                          </div>
                        );
                      })}
                    </Panel>
                  </div>
                );
              })}
            </Panel>
          </div>
        );
      })}
    </div>
  );
};

export default OrganzationLayout;
