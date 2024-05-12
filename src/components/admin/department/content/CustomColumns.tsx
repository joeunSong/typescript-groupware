export const CustomDepartmentName = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData.name}</span>
    </div>
  );
};

export const CustomDepartmentPostion = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData.rank?.title}</span>
    </div>
  );
};

export const CustomDepartmentID = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData.email}</span>
    </div>
  );
};

export const CustomDepartmentAuth = (rowData: any, tableData: any) => {
  return (
    <div
      title={rowData.id}
      className={`flex w-full items-center h-[50px] p-2 border-solid ${tableData.rowIndex === 0 ? 'border-t-[1px]' : ''} border-b-[1px] border-gray-200`}
    >
      <span className='text-base truncate'>{rowData?.is_admin ? '관리자' : '사용자'}</span>
    </div>
  );
};
