import { useState } from 'react';
import moment from 'moment';
import { Tooltip } from '@mui/material';
import CommuteEditModal from '../CommuteEdit/CommuteEditModal';
import DisabledEditModal from '../CommuteEdit/DisabledEditModal';
import USER_API from '../../../services/user';
import { WorkRecord } from '../../../types/interface';
import getEditable from '../../../utils/getEditable';

interface workBarProps {
  workInfo: WorkRecord;
}

function WorkBar({ workInfo }: workBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

  // 출근 시간과 퇴근 시간
  const startTime = moment(workInfo?.startAt);
  const endTime = moment(workInfo?.endAt);

  // 출근부터 퇴근까지의 시간 계산
  let workTime = moment.duration(endTime.diff(startTime)).asMinutes();
  workTime = Math.floor(workTime);

  // 하루 시작부터 출근까지의 시간 계산
  const startOfDay = startTime.clone().startOf('day');
  const startPlace = startTime.diff(startOfDay, 'minutes');

  // 근무 시간 구하기
  const getWorkTime = (diff: number) => {
    if (diff >= 60) {
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;
      return `${hours}시간 ${minutes}분`;
    } else {
      return `${diff}분`;
    }
  };
  console.log(workInfo);

  const handleModalOpen = async () => {
    try {
      // 조정 요청 가능한지 조회
      const editable = await getEditable(workInfo.id);
      if (editable) {
        setIsEditable(true);
      } else {
        setIsEditable(false);
      }
      setIsModalOpen(true);
    } catch (error) {
      alert('네트워크 에러. 잠시 후 다시 시도해주세요.');
      setIsModalOpen(false);
    }
  };

  return workInfo?.startAt && workInfo?.endAt ? (
    // <Tooltip title={getWorkTime(workTime)} placement='top'>
    // <Tooltip title={`${workInfo?.workType?.title} : ${moment(startTime).format('HH:mm')} - ${moment(endTime).format('HH:mm')}`} placement='top'>
    <>
      <Tooltip
        title={`${workInfo?.workType?.title} : ${moment(startTime).format('HH:mm')} - ${workInfo.isNormal ? moment(endTime).format('HH:mm') : '퇴근 미등록'}`}
        placement='top'
      >
        <div
          className={`${workInfo.isNormal ? 'bg-primary' : 'bg-red-500'} w-0 h-[50px] absolute rounded-[5px] cursor-pointer`}
          // className={`bg-red-500 w-0 h-[30px] absolute`}
          style={{
            marginLeft: `calc(100%/1440 * ${startPlace})`,
            width: `calc(100%/1440 * ${workTime})`,
            transition: 'all 0.5s ease',
            minWidth: 1,
          }}
          onClick={handleModalOpen}
        >
          {workTime >= 120 && (
            <div className='p-[5px] text-[12px] text-white'>
              <div>{workInfo.workType?.title}</div>
              <div>
                {`${moment(workInfo.startAt).format('HH:mm')} - ${workInfo.isNormal ? moment(workInfo.endAt).format('HH:mm') : '퇴근 미등록'}`}
              </div>
            </div>
          )}
        </div>
      </Tooltip>
      {isModalOpen &&
        (isEditable ? (
          <CommuteEditModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} work={workInfo} />
        ) : (
          <DisabledEditModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        ))}
    </>
  ) : (
    <></>
  );
}

export default WorkBar;
