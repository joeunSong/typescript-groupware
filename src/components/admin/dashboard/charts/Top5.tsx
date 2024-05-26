// * basic
//  * install libraries
// * recoil state
// * components
// * constants

import _ from 'lodash';
import { RANK_LABELS } from '../../../../constants/constant';

const Top5Layout = (props: any) => {
  const { originData } = props;
  return (
    <>
      {_.map(Object.keys(originData), (rankKey: any, index: number) => {
        const _label = RANK_LABELS[rankKey];
        const _data = originData[rankKey];
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
    </>
  );
};

export default Top5Layout;
