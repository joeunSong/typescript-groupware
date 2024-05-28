import { Button } from 'primereact/button';
import Modal from '../../../common/Modal';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import USER_API from '../../../../services/user';
import _ from 'lodash';
import moment from 'moment';

const ApprovalDetailModalLayout = (props: any) => {
  const { visible, setVisible, selectData } = props;
  // * modal Visible
  const [value, setValue] = useState('');
  // * form
  const [userDetail, setUserDetil]: any = useState([
    { key: 'requestUser.name', title: '이름', value: '' },
    { key: 'requestUser.email', title: '아이디', value: '' },
    { key: 'requestUser.department.title', title: '부서', value: '' },
    { key: 'requestUser.rank.title', title: '직위', value: '' },
    { key: 'workType.title', title: '근태구분', value: '' },
  ]);
  const [approvalDetail, setApprovalDetail]: any = useState([
    { key: 'commute.workType.title|commute.startAt|commute.endAt', title: '기존에 등록한 일정', value: '' },
    { key: 'workType.title|startAt|endAt', title: '조정 요청 일정', value: '' },
  ]);

  // * 헤더 템플렛
  const headerTemplate = () => {
    return (
      <div className='flex w-full justify-between p-5'>
        <span className='text-xl font-bold'>근무 조정 상세</span>
      </div>
    );
  };
  // * 콘텐츠 템플렛
  const contentTemplate = () => {
    return (
      <div className='flex flex-col w-full bg-white gap-5'>
        <div className='flex flex-col w-full gap-5 border-solid border-b-[1px] border-secondary-600 pb-5'>
          {_.map(userDetail, (detail: any) => {
            return (
              <div className='flex w-full gap-5'>
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
              <div className='flex w-full gap-5'>
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
      <div className='flex w-full justify-center px-3 pb-2'>
        <Button
          label='반려'
          className={`w-[100px] px-2 py-1 ring-0 border-0 text-black bg-secondary-500`}
          onClick={() => setVisible(false)}
          autoFocus
        />
        <Button label='승인' className={`w-[100px] px-5 py-2 ring-0 border-0 text-white bg-primary`} autoFocus />
      </div>
    );
  };

  // * 근무 조정 리스트 API 호출
  useEffect(() => {
    if (!_.isEmpty(selectData)) {
      const api = async () => {
        try {
          // * API 정의
          const commutePendingApprovalAPI = await USER_API.commute_pending_detail(selectData?.id);

          // API 호출 및 데이터 가공
          const [commutePendingApproval]: any = await Promise.all([commutePendingApprovalAPI]);
          const data = commutePendingApproval?.data[0];

          // 데이터 저장
          setUserDetil((prevs: any) => {
            return _.map(prevs, (prev: any) => {
              return { ...prev, value: _.get(data, prev.key) };
            });
          });
          setApprovalDetail((prevs: any) => {
            return _.map(prevs, (prev: any) => {
              let values: any = [];
              const paths = _.split(prev?.key, '|');
              _.map(paths, (path: any) => {
                if (_.includes(path, 'title')) {
                  values.push(_.get(data, path));
                } else {
                  // UTC +9해야하는지 시간 물어보기
                  values.push(moment(_.get(data, path)).format('hh:mm:ss'));
                }
              });
              return { ...prev, value: values };
            });
          });
        } catch (e) {
          console.log('e', e);
        }
      };
      api();
    }
  }, [selectData]);

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
