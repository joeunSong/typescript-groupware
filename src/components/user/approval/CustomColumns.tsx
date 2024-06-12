import moment from 'moment';
import 'moment/locale/ko';
import findWorkStatus from '../../../utils/findWorkStatus';

export const CustomStartAt = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-[16px] border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{moment(rowData?.commute?.startAt).format('YYYY-MM-DD(ddd)')}</span>
    </div>
  );
};

export const CustomUserName = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-[16px] border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData?.requestUser?.name}</span>
    </div>
  );
};

export const CustomRankName = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-[16px] border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData?.requestUser?.rank?.title}</span>
    </div>
  );
};

export const CustomWorkType = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-[16px] border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData?.workType?.title}</span>
    </div>
  );
};

export const CustomCommuteStartAt = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-[16px] border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{moment(rowData?.commute?.startAt).format('HH:mm')}</span>
    </div>
  );
};

export const CustomCommuteEndAt = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-[16px] border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{moment(rowData?.commute?.endAt).format('HH:mm')}</span>
    </div>
  );
};

// isBreak, isLate, isNormal, isOver의 정의를 들어야 변경될듯?
export const CustomCommuteAboveWork = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-[16px] border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{findWorkStatus(rowData.commute)}</span>
    </div>
  );
};

