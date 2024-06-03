import moment from 'moment';

export const CustomName = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData.name}</span>
    </div>
  );
};

export const CustomDepartment = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData.department_title}</span>
    </div>
  );
};

export const CustomRank = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData.rank_title}</span>
    </div>
  );
};

export const CustomEmail = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData.email}</span>
    </div>
  );
};

export const CustomIsAdmin = (rowData: any, tableData: any) => {
  const start_at = moment(rowData.start_at);
  const formattedStartTime = start_at.format('HH:mm');

  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData.is_admin}</span>
    </div>
  );
};

export const CustomEnterDate = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData.enter_date}</span>
    </div>
  );
};

export const CustomCreatedDate = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData.created_date}</span>
    </div>
  );
};
