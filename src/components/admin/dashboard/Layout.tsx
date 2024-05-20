import { useEffect, useState } from 'react';
import { CHART_COLORS } from '../../../constants/constant';
import _ from 'lodash';

const DashBoardLayout = (props: any) => {
  const [ranks, setRanks] = useState([
    {
      type: 'overtimeWork',
      color: CHART_COLORS[0],
      title: '초과 근무를 많이 한 사용자',
      ranking: [
        { label: '김준석', value: '50h' },
        { label: '유남균', value: '47h' },
        { label: '박윤환', value: '41h' },
        { label: '송조은', value: '32h' },
        { label: '황채림', value: '28h' },
      ],
    },
    {
      type: 'late',
      color: CHART_COLORS[1],
      title: '지각을 많이 한 사용자',
      ranking: [
        { label: '김준석', value: '5회' },
        { label: '송조은', value: '4회' },
        { label: '황채림', value: '3회' },
        { label: '유남균', value: '2회' },
        { label: '박윤환', value: '1회' },
      ],
    },
    {
      type: 'weirdWork',
      color: CHART_COLORS[2],
      title: '이상 근무를 가장 많이 한 사용자',
      ranking: [
        { label: '유남균', value: '20번' },
        { label: '김준석', value: '10번' },
        { label: '황채림', value: '5번' },
        { label: '송조은', value: '3번' },
        { label: '박윤환', value: '1번' },
      ],
    },
  ]);

  // * 초기화
  useEffect(() => {}, []);

  return (
    <div className='flex flex-col w-full h-full bg-white p-3 gap-14'>
      {/* 차트 */}
      <div className='flex w-full gap-10'>
        {/* 부서별 평균 근무 시간 (Bar) */}
        <div className='flex flex-col w-full gap-2'>
          <span className='px-2'>부서별 평균 근무 시간</span>
          <div className='flex flex-col w-full border-solid border-[3px] border-gray-200 rounded-3xl p-2'>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
            <span>asdasda</span>
          </div>
        </div>
        {/* 부서별 한달 근무 유형 (Pie) */}
        <div className='flex flex-col w-full gap-2'>
          <span className='px-2'>부서별 한달 근무 유형</span>
          <div className='flex flex-col w-full border-solid border-[3px] border-gray-200 rounded-3xl p-2'>zzz</div>
        </div>
      </div>
      {/* TOP 5 */}
      <div className='flex w-full gap-10'>
        {_.map(ranks, (rank: any, rankIndex: number) => {
          return (
            <div className='flex flex-col w-1/3 justify-center' key={rankIndex}>
              {/* Top 5 제목 */}
              <div className={`flex w-full h-14 items-center px-3`} style={{ backgroundColor: rank.color }}>
                <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis'>{rank.title}</span>
              </div>
              {/* 랭킹 */}
              {_.map(rank?.ranking, (ranking: any, rankingIndex: number) => {
                return (
                  <div className='flex w-full' key={rankingIndex}>
                    {/* 회사 제목 */}
                    <div className='w-1/2 p-3'>
                      <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis'>{ranking?.label}</span>
                    </div>
                    {/* 값 */}
                    <div className='w-1/2 p-3'>
                      <span className='block whitespace-nowrap overflow-hidden overflow-ellipsis'>{ranking?.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashBoardLayout;
