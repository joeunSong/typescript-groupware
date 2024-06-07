import { useEffect, useState } from 'react';
import USER_API from '../../../services/user';
import CustomeDataTable from '../../common/DataTable';
import {
  CustomCommuteAboveWork,
  CustomCommuteEndAt,
  CustomCommuteStartAt,
  CustomRankName,
  CustomStartAt,
  CustomUserName,
  CustomWorkType,
} from './CustomColumns';
import ApprovalDetailModalLayout from './modal/ApprovalDetailModal';
import { useUpdateEffect } from 'react-use';
import _ from 'lodash';
import LoadingLayout from '../../common/Loading';

const ApprovalLayout = (props: any) => {
  const {} = props;

  // * 근무 승인 데이터 및 선택 데이터
  const [pendingApprovalData, setPendingApprovalData] = useState<any>([]);
  const [selectPendingApproval, setSelectPendingApproval] = useState(null);
  // * 모달 Visible
  const [visible, setVisible] = useState(false);
  // * 로딩중
  const [isLoading, setIsLoading] = useState(true);
  // * comlum 정의
  const columnClassName = 'max-w-[0px] p-0';
  const columnPt = { headerCell: { className: 'p-4' } };
  const columns = [
    {
      field: 'requestUser.department.title',
      header: '근무일',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomStartAt(rowData, tableData),
      className: columnClassName,
      pt: columnPt,
      style: { width: '16%' },
    },
    {
      field: 'requestUser.name',
      header: '이름',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomUserName(rowData, tableData),
      className: columnClassName,
      pt: columnPt,
      style: { width: '14%' },
    },
    {
      field: 'requestUser.rank.title',
      header: '직위',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomRankName(rowData, tableData),
      className: columnClassName,
      pt: columnPt,
      style: { width: '14%' },
    },
    {
      field: 'workType.title',
      header: '근무유형',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomWorkType(rowData, tableData),
      className: columnClassName,
      pt: columnPt,
      style: { width: '14%' },
    },
    {
      field: 'commute.startAt',
      header: '출근시간',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomCommuteStartAt(rowData, tableData),
      className: columnClassName,
      pt: columnPt,
      style: { width: '14%' },
    },
    {
      field: 'commute.date',
      header: '퇴근시간',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomCommuteEndAt(rowData, tableData),
      className: columnClassName,
      pt: columnPt,
      style: { width: '14%' },
    },
    {
      field: 'commute.date',
      header: '근태구분',
      sortable: false,
      body: (rowData: any, tableData: any) => CustomCommuteAboveWork(rowData, tableData),
      className: columnClassName,
      pt: columnPt,
      style: { width: '14%' },
    },
  ];

  // * 데이터 선택시 Modal Open
  useUpdateEffect(() => {
    if (!_.isEmpty(selectPendingApproval)) {
      setVisible(true);
    }
  }, [selectPendingApproval]);

  // * 근무 조정 리스트 API 호출
  useEffect(() => {
    const api = async () => {
      try {
        // * API 정의
        const commutePendingApprovalAPI = await USER_API.commute_pendings();
        // API 호출 및 데이터 가공
        const [commutePendingApproval] = await Promise.all([commutePendingApprovalAPI]);

        // 데이터 저장
        setPendingApprovalData(commutePendingApproval.data);
      } catch (e) {
        console.log('e', e);
      } finally {
        setIsLoading(false);
      }
    };
    api();
  }, [visible]);

  return isLoading ? (
    <LoadingLayout />
  ) : (
    <>
      <ApprovalDetailModalLayout visible={visible} setVisible={setVisible} selectData={selectPendingApproval} />
      <div className='flex flex-col w-full p-[10px] gap-5'>
        {/* <div className='flex flex-col w-full py-2 gap-2 bg-white border-solid border-b-[1px] border-[#777777]'>
          <span className='text-[24px] font-bold font-noto-sans'>근무승인</span>
          <span className='text-[18px] text-[#777777] font-noto-sans'>부서원이 보낸 조정요청을 조회, 승인할 수 있습니다.</span>
        </div> */}
        <div className='flex flex-col w-full h-full scrollYWrap overflow-y-auto gap-3'>
          <span className='text-[18px] font-noto-sans'>조정요청 내역</span>
          <CustomeDataTable
            data={pendingApprovalData}
            columns={columns}
            headerTitle={'근태 수정 목록'}
            headerTitleVisible={false}
            selectData={selectPendingApproval}
            setSelectData={setSelectPendingApproval}
            filterVisible={false}
            paginatorVisible={false}
            emptyMessage={'받은 조정 요청이 없습니다.'}
          />
        </div>
      </div>
    </>
  );
};

export default ApprovalLayout;
