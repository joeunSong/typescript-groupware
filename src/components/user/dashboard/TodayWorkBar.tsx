import { useEffect, useState } from 'react';
import moment from 'moment';
import { Tooltip } from '@mui/material';
import CommuteEditModal from '../CommuteEdit/CommuteEditModal';
import DisabledEditModal from '../CommuteEdit/DisabledEditModal';
import { WorkRecord } from '../../../types/interface';
import getEditable from '../../../utils/getEditable';

interface TodayWorkBarProps {
  todayWorkInfo: WorkRecord;
}

function TodayWorkBar({ todayWorkInfo }: TodayWorkBarProps) {
  const [workTime, setWorkTime] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    //작업 시간 업데이트
    const updateWorkTime = () => {
      const start = moment(todayWorkInfo.startAt);
      //const end = todayWorkInfo.endAt ? moment(todayWorkInfo.endAt) : moment();
      const end = todayWorkInfo.isNormal ? moment(todayWorkInfo.endAt) : moment();
      const diff = moment.duration(end.diff(start)).asMinutes();

      setWorkTime(Math.floor(diff));
    };

    //if (todayWorkInfo.startAt && !todayWorkInfo.endAt) {
    if (todayWorkInfo.startAt && !todayWorkInfo.isNormal) {
      updateWorkTime(); // 초기 작업 시간 업데이트
      intervalId = setInterval(updateWorkTime, 6000); // endTime이 없을 때만 반복
    } else if (todayWorkInfo.endAt) {
      updateWorkTime(); // endTime이 있을 경우 최종 작업 시간 업데이트
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [todayWorkInfo.startAt, todayWorkInfo.endAt]);

  //TodayWorkBar 위치 조정

  const startPlace = todayWorkInfo.startAt
    ? moment(moment(todayWorkInfo.startAt).toLocaleString()).diff(
        moment(moment(todayWorkInfo.startAt).toLocaleString()).clone().startOf('day'),
        'minutes',
      )
    : 0;

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

  const handleModalOpen = async () => {
    if (todayWorkInfo.isNormal) {
      try {
        // 조정 요청 가능한지 조회
        const editable = await getEditable(todayWorkInfo.id);

        if (editable) {
          setIsEditable(true);
        } else {
          setIsEditable(false);
        }
        setIsModalOpen(true);
      } catch (error) {
        console.log(error);
        setIsModalOpen(false);
      }
    }
  };
  return todayWorkInfo.startAt ? (
    <>
      <Tooltip
        //title={`${todayWorkInfo.workType?.title} : ${moment(todayWorkInfo.startAt).format('HH:mm')} - ${todayWorkInfo.endTime ? moment(todayWorkInfo.endTime).format('HH:mm') : '진행중'}`}
        title={`${todayWorkInfo.workType?.title} : ${moment(todayWorkInfo.startAt).format('HH:mm')} - ${todayWorkInfo.isNormal ? moment(todayWorkInfo.endAt).format('HH:mm') : '진행중'}`}
        placement='top'
      >
        <div
          className={`bg-primary w-0 min-h-[40px] absolute rounded-[10px] ${todayWorkInfo.isNormal ? 'cursor-pointer' : ''}`}
          style={{
            marginLeft: `calc(100%/1440 * ${startPlace})`,
            width: `calc(100%/1440 * ${workTime})`,
            minWidth: 1,
            //transition: 'all 0.5s ease',
          }}
          onClick={handleModalOpen}
        >
          {workTime >= 120 && (
            <div className='p-[5px] text-[12px] text-white'>
              <div>{todayWorkInfo.workType?.title}</div>
              <div>
                {`${moment(todayWorkInfo.startAt).format('HH:mm')} - ${todayWorkInfo.isNormal ? moment(todayWorkInfo.endAt).format('HH:mm') : '진행중'}`}
              </div>
            </div>
          )}
        </div>
      </Tooltip>
      {isModalOpen &&
        (isEditable ? (
          <CommuteEditModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} work={todayWorkInfo} />
        ) : (
          <DisabledEditModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        ))}
    </>
  ) : (
    <></>
  );
}

export default TodayWorkBar;
