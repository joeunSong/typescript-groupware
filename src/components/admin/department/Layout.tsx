// * basic
import { useEffect, useState } from 'react';
//  * install libraries
import _ from 'lodash';
// * components
import OrganizationLayout from './organzation/Layout';
import ContentLayout from './content/Layout';
// * constants
import { COMPANY_ID } from '../../../constants/constant';
// * apis
import ADMIN_API from '../../../services/admin';

const DepartmentLayout = (props: any) => {
  const {} = props;
  // * 조직도
  const [organization, setOrganization]: any = useState([]);
  // * 선택된 회사, 사용자
  const [selectDepartment, setSelectDepartment]: any = useState(null);
  const [departmentLeader, setDepartmentLeader]: any = useState(null);
  const [selectUser, setSelectUser]: any = useState(null);

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
  };

  // * 사용자 클릭
  const handleUserClick = (_department: any, _user: any) => {
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
  };

  // * 조직도 호출
  const getOrganization = async () => {
    try {
      const result: any = await ADMIN_API.organization(localStorage.getItem(COMPANY_ID));
      setOrganization([result.data.data]);

      // 리더 수정
      const _department = _.find(result.data.data.departments, { id: selectDepartment.id });
      if (_.isEmpty(_department) || _department === undefined) {
        setSelectDepartment(null);
        setSelectUser(null);
        setDepartmentLeader(null);
      } else {
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
      }
    } catch (e) {}
  };

  // * 초기 세팅
  useEffect(() => {
    getOrganization();
  }, []);

  return (
    <div className='flex w-full h-full overflow-hidden'>
      {/* 조직도 */}
      <div className='flex flex-col w-[250px] min-w-[250px] h-full px-3 pt-3 gap-3 bg-white '>
        <span className='text-2xl font-bold'>조직도</span>
        <OrganizationLayout
          getOrganization={getOrganization}
          organization={organization}
          selectDepartment={selectDepartment}
          selectUser={selectUser}
          handleDepartmentClick={handleDepartmentClick}
          handleUserClick={handleUserClick}
        />
      </div>
      {/* 내용 */}
      <div className='flex flex-col w-full h-full pt-3 gap-5 bg-white'>
        {/* 부서 정보 */}
        <div className='flex flex-col w-full gap-3 overflow-hidden'>
          {/* 부서 정보 및 부서원 추가 */}
          <div className='flex w-full justify-between'>
            <span className='text-2xl font-bold'>부서 정보</span>
            <div className='flex px-10'></div>
          </div>
          <ContentLayout
            getOrganization={getOrganization}
            selectDepartment={selectDepartment}
            selectUser={selectUser}
            setSelectUser={setSelectUser}
            departmentLeader={departmentLeader}
          />
        </div>
      </div>
    </div>
  );
};

export default DepartmentLayout;
