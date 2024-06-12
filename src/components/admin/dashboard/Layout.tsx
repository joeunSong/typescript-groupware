import { useEffect, useState } from 'react';
import { COMPANY_ID } from '../../../constants/constant';
import ADMIN_API from '../../../services/admin';
import _ from 'lodash';
import BarChartLayout from './charts/BarChart';
import { Dropdown } from 'primereact/dropdown';
import { useUpdateEffect } from 'react-use';
import PieChartLayout from './charts/PieChart';
import Top5Layout from './charts/Top5';
import { InformationIcon } from '../../common/JiranIcon';
import { Tooltip } from 'primereact/tooltip';

const DashBoardLayout = (props: any) => {
  // * 회사 데이터
  const [departments, setDepartments] = useState<any>([]);
  const [departmentLabels, setDepartmentLabels] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState<any>({
    company_id: null,
    department_id: null,
    label: '전체 보기',
  });
  // * 차트 데이터
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  // * 랭크 데이터
  const [rankData, setRankData] = useState<any>([]);

  // * DropDown 아이템 템플릿
  const dropdownItemTemplate = (data: any) => {
    return (
      <div title={data} className='flex w-full max-w-[0px]'>
        {data?.label}
      </div>
    );
  };

  // * 근무 현황 업데이트시 Pie API 새로 호출
  useUpdateEffect(() => {
    const pieApi = async () => {
      // 필요한 API 정의 (부서 근무 타입)
      const statisticsDepartmentWorkTypeAPI = ADMIN_API.statistics_department_workType(
        localStorage.getItem(COMPANY_ID),
        selectDepartment?.department_id === null ? 'company' : 'department',
        selectDepartment?.department_id === null ? 0 : selectDepartment?.department_id,
      );

      // API 호출 및 데이터 가공
      const [statisticsDepartmentWorkType] = await Promise.all([statisticsDepartmentWorkTypeAPI]);

      // 데이터 저장
      setPieData(statisticsDepartmentWorkType.data.data);
    };
    pieApi();
  }, [selectDepartment]);

  // * 초기화
  useEffect(() => {
    const api = async () => {
      try {
        // 필요한 API 정의 (조직도, 부서 평균 근무 시간, 부서 근무 타입, 부서별 특정 데이터 랭킹)
        const organizationAPI = ADMIN_API.organization(localStorage.getItem(COMPANY_ID));
        const statisticsDepartmentAPI = ADMIN_API.statistics_department(localStorage.getItem(COMPANY_ID));
        const statisticsDepartmentWorkTypeAPI = ADMIN_API.statistics_department_workType(localStorage.getItem(COMPANY_ID), 'company', 0);
        const statisticsRankingAPI = ADMIN_API.statistics_ranking(localStorage.getItem(COMPANY_ID));

        // API 호출 및 데이터 가공
        const [organization, statisticsDepartment, statisticsDepartmentWorkType, statisticsRanking] = await Promise.all([
          organizationAPI,
          statisticsDepartmentAPI,
          statisticsDepartmentWorkTypeAPI,
          statisticsRankingAPI,
        ]);
        // 부서 데이터 가공
        const _departments: any = _.map(organization.data.data?.departments, (department: any) => {
          return { company_id: department?.company_id, department_id: department?.id, label: department?.label };
        });
        // 부서 제목 데이터 가공
        const _departmentLabels: any = _.map(organization.data.data?.departments, (department: any) => {
          return department?.label;
        });

        // 데이터 저장
        setDepartments([{ company_id: null, department_id: null, label: '전체 보기' }, ..._departments]);
        setDepartmentLabels(_departmentLabels);
        setBarData(statisticsDepartment.data.data);
        setPieData(statisticsDepartmentWorkType.data.data);
        setRankData(statisticsRanking.data.data);
      } catch (e: any) {
        console.log('AdminDashboard error', e);
      }
    };

    api();
  }, []);

  return (
    <div className='flex flex-col w-full h-full bg-white p-3 gap-3'>
      <div className='flex w-full justify-end px-8 py-1'>
        <button className='border-solid border-[2px] border-gray-200 rounded-md drop-shadow-md  px-4 py-2' disabled>
          <span className='text-lg font-bold'>오피스 노트로 내보내기</span>
        </button>
      </div>
      {/* 차트 */}
      <div className='flex w-full gap-10 pb-14'>
        {/* 부서별 평균 근무 시간 (Bar) */}
        <div className='flex flex-col w-2/3 gap-2'>
          <div className='flex w-full h-14 items-center gap-2'>
            <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis text-2xl font-bold pl-2'>부서별 평균 근무 시간(5개월)</span>
            <InformationIcon
              className='departmentBarChart'
              width={25}
              height={25}
              dataPrTooltip='이번달 기준 직전 5개월 평균근무시간을 조회'
              dataPrPosition='top'
              id='info-icon'
            />
            <Tooltip target='#info-icon' mouseTrack mouseTrackLeft={10} />
          </div>
          <div className='flex flex-col w-full border-solid border-[3px] border-gray-200 rounded-3xl p-5'>
            <BarChartLayout originData={barData} departmentLabels={departmentLabels} />
          </div>
        </div>
        {/* 부서별 한달 근무 유형 (Pie) */}
        <div className='flex flex-col w-1/3 gap-2'>
          <div className='flex w-full h-14 items-center gap-2'>
            <Dropdown
              value={selectDepartment || null}
              onChange={(e: any) => {
                setSelectDepartment(e.target.value);
              }}
              itemTemplate={dropdownItemTemplate}
              options={departments}
              optionLabel={'label'}
              className='w-[150px] border-solid border-2 border-gray-200 ring-0'
              pt={{
                item: (context: any) => {
                  return `${context.context.selected ? 'bg-gray-100 text-gray-900' : ''} hover:bg-gary-100`;
                },
              }}
            />
            <div className='flex items-center'>
              <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis text-2xl font-bold px-2'>근무 현황</span>
              <InformationIcon
                className='departmentBarChart'
                width={25}
                height={25}
                dataPrTooltip='이번달 근무현황 조회'
                dataPrPosition='top'
                id='info-icon'
              />
              <Tooltip target='#info-icon' mouseTrack mouseTrackLeft={10} />
            </div>
          </div>
          <div className='flex flex-col w-full items-center justify-center border-solid border-[3px] border-gray-200 rounded-3xl p-5'>
            <PieChartLayout originData={pieData} />
          </div>
        </div>
      </div>
      {/* TOP 5 */}
      <div className='flex w-full gap-10 px-5'>
        <Top5Layout originData={rankData} />
      </div>
    </div>
  );
};

export default DashBoardLayout;
