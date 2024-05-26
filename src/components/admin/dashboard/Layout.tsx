import { useEffect, useState } from 'react';
import { CHART_COLORS, COMPANY_ID, RANK_LABELS } from '../../../constants/constant';
import ADMIN_API from '../../../services/admin';
import _ from 'lodash';
import BarChartLayout from './charts/BarChart';
import moment from 'moment';
import { Dropdown } from 'primereact/dropdown';
import { useUpdateEffect } from 'react-use';
import PieChartLayout from './charts/PieChart';

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
  useUpdateEffect(() => {}, [selectDepartment]);

  // * 초기화
  useEffect(() => {
    const api = async () => {
      try {
        // 필요한 API 정의
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
        const _departments: any = _.map(organization.data.data?.departments, (department: any) => {
          return { company_id: department?.company_id, department_id: department?.id, label: department?.label };
        });
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

  console.log('rankData', rankData);
  return (
    <div className='flex flex-col w-full h-full bg-white p-3 gap-14'>
      {/* 차트 */}
      <div className='flex w-full gap-10'>
        {/* 부서별 평균 근무 시간 (Bar) */}
        <div className='flex flex-col w-full gap-2'>
          <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis text-2xl font-bold px-2'>부서별 평균 근무 시간(5개월)</span>
          <div className='flex flex-col w-full border-solid border-[3px] border-gray-200 rounded-3xl p-5'>
            <BarChartLayout originData={barData} departmentLabels={departmentLabels} />
          </div>
        </div>
        {/* 부서별 한달 근무 유형 (Pie) */}
        <div className='flex flex-col w-full gap-2'>
          <div className='flex w-full items-center gap-2'>
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
                  return `${context.context.selected ? 'bg-gray-100 text-gray-900' : ''} hover:bg-indigo-100`;
                },
              }}
            />
            <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis text-2xl font-bold px-2'>근무 현황</span>
          </div>
          <div className='flex flex-col w-full border-solid border-[3px] border-gray-200 rounded-3xl p-5'>
            <PieChartLayout originData={pieData} />
          </div>
        </div>
      </div>
      {/* TOP 5 */}
      <div className='flex w-full gap-10 px-5'>
        {_.map(Object.keys(rankData), (rankKey: any, index: number) => {
          const _label = RANK_LABELS[rankKey];
          const _data = rankData[rankKey];
          return (
            <div className='flex flex-col w-full gap-3' key={index}>
              {/* 제목 */}
              <div className={`flex w-full items-center px-3`}>
                <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis text-2xl font-bold'>{_label}</span>
              </div>
              <div className='flex flex-col w-full justify-center border-solid border-[3px] border-gray-200  rounded-3xl p-2'>
                <div className='flex w-full p-2 border-solid border-b-[1px] border-gray-300 gap-2'>
                  {/* 순위 */}
                  <div className='flex w-1/4 justify-center'>
                    <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis text-sm text-[#718EBF]'>NO</span>
                  </div>
                  {/* 이름 */}
                  <div className='flex w-1/4 justify-center'>
                    <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis text-sm text-[#718EBF]'>이름</span>
                  </div>
                  {/* 부서 이름 */}
                  <div className='flex w-1/4 justify-center'>
                    <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis text-sm text-[#718EBF]'>부서</span>
                  </div>
                  {/* 값 */}
                  <div className='flex w-1/4 justify-center'>
                    <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis text-sm text-[#718EBF]'>
                      {_label === '근무시간' ? '시간' : '횟수'}
                    </span>
                  </div>
                </div>
                {/* 랭킹 */}
                {_.map(_data, (ranking: any, rankingIndex: number) => {
                  return (
                    <div className='flex w-full p-2 gap-2' key={rankingIndex}>
                      {/* 순위 */}
                      <div className='flex w-1/4 justify-center'>
                        <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis text-sm'>0{ranking?.ranking}.</span>
                      </div>
                      {/* 이름 */}
                      <div className='flex w-1/4 justify-center'>
                        <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis text-sm'>{ranking?.name}</span>
                      </div>
                      {/* 부서 이름 */}
                      <div className='flex w-1/4 justify-center'>
                        <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis text-sm'>{ranking?.department_title}</span>
                      </div>
                      {/* 값 */}
                      <div className='flex w-1/4 justify-center'>
                        <span
                          className={`block whitespace-nowrap overflow-hidden overflow-ellipsis text-sm
                          ${_.has(ranking, 'hours') ? (ranking?.hours > 52 ? 'text-[#FE5C73]' : null) : null}
                          ${_.has(ranking, 'late_count') ? (ranking?.late_count > 3 ? 'text-[#FE5C73]' : null) : null}
                          ${_.has(ranking, 'not_normal_count') ? (ranking?.not_normal_count > 3 ? 'text-[#FE5C73]' : null) : null}`}
                        >
                          {_.has(ranking, 'hours')
                            ? ranking?.hours + '시간'
                            : _.has(ranking, 'late_count')
                              ? ranking?.late_count + '회'
                              : _.has(ranking, 'not_normal_count')
                                ? ranking?.not_normal_count + '회'
                                : null}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashBoardLayout;
