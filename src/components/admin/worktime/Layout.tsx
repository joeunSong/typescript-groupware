import { Fragment, useEffect, useState } from 'react';
import ADMIN_API from '../../../services/admin';
import { COMPANY_ID } from '../../../constants/constant';
import _ from 'lodash';
import 'moment/locale/ko';
import moment from 'moment';
import LoadingLayout from '../../common/Loading';

const WorkTimeLayout = (props: any) => {
  const {} = props;

  const [loading, setLoading] = useState(true);
  const [workSystemData, setWorkSystemData] = useState<any>([]);
  const [weekDays, setWeekDays] = useState<any>([]);
  // * 기본 근무 시스템 조회
  useEffect(() => {
    const api = async () => {
      try {
        // 필요한 API 정의 (조직도, 부서 평균 근무 시간, 부서 근무 타입, 부서별 특정 데이터 랭킹)
        const workSystemAPI = ADMIN_API.worksystem(localStorage.getItem(COMPANY_ID));
        // API 호출 및 데이터 가공
        const [workSystem] = await Promise.all([workSystemAPI]);

        let _weekdays = [];
        for (let i = 1; i <= 7; i++) {
          let day = moment()
            .day(i === 7 ? 0 : i)
            .format('dd');
          _weekdays.push(day);
        }

        // 데이터 저장
        setWeekDays(_weekdays);
        setWorkSystemData(workSystem.data.data[0]);
      } catch (err: any) {
        console.log('err', err);
      } finally {
        setLoading(false);
      }
    };
    api();
  }, []);

  return (
    <div className='flex flex-col w-full h-full bg-white px-10 py-5 gap-3'>
      {/* 근무 요일 */}
      <div className='flex flex-col w-full'>
        <div className='flex w-full justify-between items-center'>
          <div className='flex items-center gap-10'>
            <span className='text-[18px] font-bold'>근무요일</span>
            <span className='text-[13px] text-gray-400'>*근무 요일 외에는 출근이 불가합니다. 공휴일, 주말 출근불가</span>
          </div>
          <div className='flex'>
            <button className='w-[120px] px-4 py-2 border-solid border-[1px] rounded-md' disabled={true}>
              근무시간 수정
            </button>
          </div>
        </div>
        <div className='flex px-5 py-3'>
          {_.map(weekDays, (day: any) => {
            if (day === '토' || day === '일') {
              return <div className='flex px-5 py-2 border-solid border-[1.5px] border-gray-500'>{day}</div>;
            }
            return <div className='flex px-5 py-2 border-solid border-[1.5px] border-primary'>{day}</div>;
          })}
        </div>
      </div>
      {loading ? (
        <div className='flex w-full items-center justify-center'>
          <LoadingLayout />
        </div>
      ) : (
        <div className='flex flex-col w-full'>
          {/* 근무 시간 */}
          <span className='text-[18px] font-bold'>근무시간</span>
          {/* 업무 */}
          <div className='flex w-full items-center px-5 py-3 gap-4'>
            {/* 업무 시작 시간 */}
            <div className='flex items-center gap-3'>
              <span className='text-[18px]'>업무시작</span>
              <div className='flex items-center gap-2'>
                {_.map(_.split(workSystemData?.work_start_at, ':'), (time: any, index: number) => {
                  return (
                    <Fragment key={index}>
                      <div className='border-solid border-[1px] px-4 py-1.5'>{time}</div>
                      {_.split(workSystemData?.work_start_at, ':').length === index + 1 ? null : <span>:</span>}
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <span className='text-lg font-bold'>~</span>
            {/* 업무 종료 시간 */}
            <div className='flex items-center gap-3'>
              <span className='text-[18px]'>업무종료</span>
              <div className='flex items-center gap-2'>
                {_.map(_.split(workSystemData?.work_end_at, ':'), (time: any, index: number) => {
                  return (
                    <Fragment key={index}>
                      <div className='border-solid border-[1px] px-4 py-1.5'>{time}</div>
                      {_.split(workSystemData?.work_end_at, ':').length === index + 1 ? null : <span>:</span>}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          {/* 휴게 */}
          <div className='flex w-full items-center px-5 py-3 gap-4'>
            {/* 시작 시간 */}
            <div className='flex items-center gap-3'>
              <span className='text-[18px]'>휴게시간</span>
              <div className='flex items-center gap-2'>
                {_.map(_.split(workSystemData?.break_start_at, ':'), (time: any, index: number) => {
                  return (
                    <Fragment key={index}>
                      <div className='border-solid border-[1px] px-4 py-1.5'>{time}</div>
                      {_.split(workSystemData?.break_start_at, ':').length === index + 1 ? null : <span>:</span>}
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <span className='text-lg font-bold'>:</span>
            {/* 종료 시간 */}
            <div className='flex items-center'>
              <div className='flex items-center gap-2'>
                {_.map(_.split(workSystemData?.break_end_at, ':'), (time: any, index: number) => {
                  return (
                    <Fragment key={index}>
                      <div className='border-solid border-[1px] px-4 py-1.5'>{time}</div>
                      {_.split(workSystemData?.break_end_at, ':').length === index + 1 ? null : <span>:</span>}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          {/* 출근불가 */}
          <div className='flex w-full items-center px-5 py-3 gap-4'>
            {/* 출근 불가 시작 시간 */}
            <div className='flex items-center gap-3'>
              <span className='text-[18px]'>*출근불가 시간</span>
              <div className='flex items-center gap-2'>
                {_.map(_.split('00:00:00', ':'), (time: any, index: number) => {
                  return (
                    <Fragment key={index}>
                      <div className='border-solid border-[1px] px-4 py-1.5'>{time}</div>
                      {_.split('00:00:00', ':').length === index + 1 ? null : <span>:</span>}
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <span className='text-lg font-bold'>:</span>
            {/* 출근 불가 종료 시간 */}
            <div className='flex items-center'>
              <div className='flex items-center gap-2'>
                {_.map(_.split('04:00:00', ':'), (time: any, index: number) => {
                  return (
                    <Fragment key={index}>
                      <div className='border-solid border-[1px] px-4 py-1.5'>{time}</div>
                      {_.split('04:00:00', ':').length === index + 1 ? null : <span>:</span>}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkTimeLayout;
