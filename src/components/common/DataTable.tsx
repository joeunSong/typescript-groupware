// * basic
import { useState, useEffect, useRef } from 'react';
//  * install libraries
import _ from 'lodash';
// * components
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
// * constants
import { FilterMatchMode } from 'primereact/api';
import { ResetIcon } from './JiranIcon';
// * apis
interface Props {
  data: any; // 사용하는 데이터
  columns: any; // Column 내용
  headerTitle?: any; // Header의 Title
  headerTitleVisible?: any; // Header의 Title
  sortMode?: any; // 데이터테이블 모드
  selectData?: any; // 선택데이터
  setSelectData?: any; // set
  paginatorVisible?: any;
  filterVisible?: any; // 필터 활성화
  filters?: any; // 필터 데이터
  filterDelay?: any; // 필터 딜레이
  globalFilterFields?: any; // 전역 필터
  pt?: any; // 데이터 테이블 pt
  className?: any; // 데이터테이블 className
  tableStyle?: any; // 데이터테이블 style
}

/**
 *
 * @param props
 * @returns
 */

const CustomeDataTable = ({
  data = [],
  columns = [{}],
  headerTitle = '',
  headerTitleVisible = true,
  sortMode = 'multiple',
  filterVisible = true,
  filters = { platform: { value: '', matchMode: FilterMatchMode.EQUALS } },
  filterDelay = 100,
  globalFilterFields = [{}],
  pt = null,
  className = null,
  tableStyle = null,
  selectData,
  setSelectData,
  paginatorVisible = true,
  ...props
}: Props) => {
  // * Ref
  const dataTableRef = useRef(null);
  // * DataTable global Filter
  const [globalFilter, setGlobalFilter] = useState(null);

  // * 테이블 정렬 초기화
  const handleSortClear = () => {
    const current: any = dataTableRef.current;
    if (current) {
      current.reset();
    }
  };

  // * 데이터테이블 Custom Header
  const customHeader = (
    <div className={`flex items-center gap-2 justify-between border-t-[1px] border-b-[1px] rounded-t-xl max-sm:flex-col max-sm:items-start`}>
      {/* 좌측 */}
      {headerTitleVisible ? (
        <div className='flex justify-start'>
          <span className='text-2xl font-bold'>{headerTitle}</span>
        </div>
      ) : (
        <></>
      )}
      {filterVisible ? (
        // {/* 우측 */}
        <div className='flex items-center gap-5 max-sm:gap-3'>
          {/* 리셋버튼 */}
          <button onClick={handleSortClear} className='flex-none px-5 py-2 rounded-full border-transparent bg-gray-200 hover:bg-gray-300 max-sm:px-2'>
            <ResetIcon width={15} height={15} />
          </button>
          {/* 검색 */}
          <div className='flex items-center gap-3 max-sm:gap-1'>
            <i className='pi pi-search' />
            <InputText
              type='search'
              className='p-2'
              onInput={(e: any) => {
                if (e.target.value) {
                  setGlobalFilter(e.target.value);
                } else {
                  // 빠르게 BackSpace시 GlobalFilter가 씹히는 문제
                  setTimeout(() => {
                    setGlobalFilter(null);
                  }, 100);
                }
              }}
              placeholder='Search'
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );

  // * 기본 옵션
  const basicOption = {
    value: data,
    dataKey: 'id',
    paginator: paginatorVisible,
    rows: 5,
    rowsPerPageOptions: [5, 10, 25],
  };

  return (
    <DataTable
      ref={dataTableRef}
      header={customHeader}
      // * mode
      sortMode={sortMode}
      selectionMode={'single'}
      // * Filter
      filters={filters}
      globalFilter={globalFilter}
      filterDelay={_.isEmpty(filterDelay) ? 100 : filterDelay}
      globalFilterFields={_.isEmpty(globalFilterFields) ? [] : globalFilterFields}
      pt={_.isEmpty(pt) ? { header: { className: `p-0` } } : pt}
      // * css
      className={`${className !== null ? className : 'w-full'} `}
      // tableStyle={tableStyle !== null ? tableStyle : { width: '100%' }}
      // * select
      selection={selectData}
      onSelectionChange={(e) => setSelectData(e.value)}
      // * basicOption
      {...basicOption}
    >
      {_.map(columns, (column: any, index: number) => {
        return (
          <Column
            key={index}
            headerStyle={{
              whiteSpace: 'nowrap',
              // overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            pt={column.pt}
            field={column.field}
            header={column.header}
            sortable={column.sortable}
            body={column.body}
            className={column.className}
            style={column.style}
          />
        );
      })}
    </DataTable>
  );
};
export default CustomeDataTable;
