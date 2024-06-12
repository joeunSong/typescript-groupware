import moment from 'moment';

export const CustomDate = (rowData: any, tableData: any) => {
  const getDayOfWeek = (date: Date) => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = week[new Date(date).getDay()];

    return dayOfWeek;
  };
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{`${rowData.date}(${getDayOfWeek(rowData.date)})`}</span>
    </div>
  );
};

export const CustomUserName = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData.user_name}</span>
    </div>
  );
};

export const CustomDepartmentTitle = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData.department_title}</span>
    </div>
  );
};

export const CustomWorkTypeTitle = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData.work_type_title}</span>
    </div>
  );
};

export const CustomStartAt = (rowData: any, tableData: any) => {
  const start_at = moment(rowData.start_at);
  const formattedStartTime = start_at.format('HH:mm');

  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{formattedStartTime}</span>
    </div>
  );
};

export const CustomEndAt = (rowData: any, tableData: any) => {
  const end_at = moment(rowData.end_at);
  // console.log('rowData:',rowData)
  const formattedEndTime = rowData.is_normal ? end_at.format('HH:mm'): '\u00A0';

  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{formattedEndTime}</span>
    </div>
  );
};

export const CustomStatus = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData.status}</span>
    </div>
  );
};
