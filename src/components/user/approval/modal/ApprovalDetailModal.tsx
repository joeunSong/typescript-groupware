import { Button } from 'primereact/button';
import Modal from '../../../common/Modal';
import USER_API from '../../../../services/user';
import _ from 'lodash';
import dayjs from 'dayjs';
import findWorkStatus from '../../../../utils/findWorkStatus';

const ApprovalDetailModalLayout = (props: any) => {
  const { visible, setVisible, selectData } = props;
  const userDetail = [
    { key: 'requestUser.name', title: '이름', value: selectData?.requestUser.name },
    { key: 'requestUser.email', title: '아이디', value: selectData?.requestUser.email },
    { key: 'requestUser.department.title', title: '부서', value: selectData?.requestUser.department.title },
    { key: 'requestUser.rank.title', title: '직위', value: selectData?.requestUser.rank.title },
    { key: 'workType.title', title: '근태구분', value: selectData && findWorkStatus(selectData?.commute) },
  ];

  const approvalDetail = [
    {
      key: 'commute.workType.title|commute.startAt|commute.endAt',
      title: '기존에 등록한 일정',
      value: [
        selectData?.commute.workType.title,
        dayjs(selectData?.commute.startAt).format('YYYY-MM-DD HH:mm'),
        '-',
        dayjs(selectData?.commute.endAt).format('YYYY-MM-DD HH:mm'),
      ],
    },
    {
      key: 'workType.title|startAt|endAt',
      title: '조정 요청 일정',
      value: [
        selectData?.workType.title,
        dayjs(selectData?.startAt).format('YYYY-MM-DD HH:mm'),
        '-',
        dayjs(selectData?.endAt).format('YYYY-MM-DD HH:mm'),
      ],
    },
  ];

  // * 헤더 템플렛
  const headerTemplate = () => {
    return (
      <div className='flex w-full justify-between pb-5 px-7 pt-7'>
        <span className='text-xl font-bold'>근무 조정 상세</span>
      </div>
    );
  };
  // * 콘텐츠 템플렛
  const contentTemplate = () => {
    return (
      <div className='flex flex-col w-full bg-white gap-5 px-3'>
        <div className='flex flex-col w-full gap-5 border-solid border-b-[1px] border-secondary-600 pb-5'>
          {_.map(userDetail, (detail: any) => {
            return (
              <div className='flex w-full gap-5' key={detail?.title}>
                <div className='flex w-[80px] min-w-[80px]'>
                  <span className='text-[15px] font-noto-sans-kr'>{detail?.title}</span>
                </div>
                <div className='flex w-full'>
                  <span className='text-[15px] font-noto-sans-kr'>{detail?.value}</span>
                </div>
              </div>
            );
          })}
        </div>{' '}
        <div className='flex flex-col w-full gap-5'>
          {_.map(approvalDetail, (detail: any) => {
            return (
              <div className='flex w-full gap-5' key={detail?.title}>
                <div className='flex w-[150px] min-w-[150px] justify-between'>
                  <span className='text-[15px] font-noto-sans-kr'>{detail?.title}</span>
                  <span className='text-[15px] font-noto-sans-kr'>:</span>
                </div>
                <div className='flex w-full gap-3'>
                  {_.map(detail?.value, (value: any) => {
                    return (
                      <>
                        <span className='text-[15px] font-noto-sans-kr'>{value}</span>
                      </>
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

  // * 바닥 템플렛
  const footerTemplate = () => {
    return (
      <div className='flex w-full justify-center px-3 pb-7'>
        <Button
          label='반려'
          className={`w-[100px] px-2 py-1 ring-0 border-0 text-black bg-secondary-500`}
          onClick={async () => {
            await USER_API.edit_rejected(selectData?.id);
            setVisible(false);
          }}
          autoFocus
        />
        <Button
          label='승인'
          className={`w-[100px] px-5 py-2 ring-0 border-0 text-white bg-primary`}
          onClick={async () => {
            await USER_API.edit_approved(selectData?.id);
            setVisible(false);
          }}
          autoFocus
        />
      </div>
    );
  };

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      headerTemplate={headerTemplate}
      contentTemplate={contentTemplate}
      footerTemplate={footerTemplate}
      dialogHeaderClassName={'p-0'}
      dialogClassName={`max-sm:w-full sm:w-9/12 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-5/12 3xl:w-4/12 4xl:w-3/12`}
    />
  );
};

export default ApprovalDetailModalLayout;
