import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { CustomButton } from '../Components';
import ApiClient from '../../../utils/axios';

interface AttendMenuProps {
  userInfo?: any; //유저의 정보
  todayWorkInfo?: any; //당일 출퇴근 정보
  setTodayWorkInfo?: any; //당일 출퇴근 정보 변경 함수
  onWork?: boolean; //출근 여부
  setOnWork?: any; //출근 여부 상태 변경 함수
}

const AttendMenu = ({ userInfo, todayWorkInfo, setTodayWorkInfo, onWork, setOnWork }: AttendMenuProps) => {
  const [startTime, setStartTime] = useState<any>(todayWorkInfo?.startTime);
  const [endTime, setEndTime] = useState<any>(todayWorkInfo?.endTime);
  const { instance } = ApiClient;

  const handleGoWorkClick = () => {
    //출근 기록이 없을 경우 등록
    if (!startTime) {
      let curTime = moment().toISOString();
      //console.log(curTime);
      //출근 시간 등록 API
      const data = {
        startAt: curTime,
        endAt: null,
      };

      //API 통신을 통해서 출근 시간 전송

      const postStartTime = async () => {
        try {
          const response = await instance.post('http://localhost:8080/api/commutes/in', data);

          setStartTime(curTime);
          setTodayWorkInfo({ ...todayWorkInfo, startTime: curTime });
          setOnWork(true);

          // 요청이 성공하면 여기에서 응답 처리
          return response.data; // 예를 들어, 서버에서 반환한 데이터를 반환할 수 있습니다.
        } catch (error) {
          // 요청이 실패하면 여기에서 에러 처리
          console.log(error);
        }
      };

      postStartTime();

      setStartTime(curTime);
      setTodayWorkInfo({ ...todayWorkInfo, startTime: curTime });
      setOnWork(true);
    }
  };

  const handleLeaveWorkClick = () => {
    //퇴근 기록이 없을 경우 등록
    if (!endTime) {
      let curTime = moment().toISOString();
      //퇴근 시간 등록 API
      const data = {
        endAt: curTime,
      };
      //API 통신을 통해서 퇴근 시간 전송
      const postEndTime = async () => {
        try {
          const response = await instance.post('http://localhost:8080/api/commutes/' + todayWorkInfo.id + '/out', data);

          setEndTime(curTime);
          setTodayWorkInfo({ ...todayWorkInfo, endTime: curTime });
          setOnWork(false);
          // 요청이 성공하면 여기에서 응답 처리
          return response.data;
        } catch (error) {
          // 요청이 실패하면 여기에서 에러 처리
          console.log(error);
        }
      };
      if (todayWorkInfo.id) {
        postEndTime();
      }

      setEndTime(curTime);
      setTodayWorkInfo({ ...todayWorkInfo, endTime: curTime });
      setOnWork(false);
    }
  };

  //시간 format 변환
  const formattedTime = (startTime: any) => {
    let time = moment(startTime).format('A hh:mm');
    time = time.replace('AM', '오전').replace('PM', '오후');
    return time;
  };

  // 근무 시간 구하기
  const getWorkTime = () => {
    if (startTime && endTime) {
      let diff = moment.duration(moment(endTime).diff(moment(startTime))).asMinutes();
      diff = Math.floor(diff);

      if (diff >= 60) {
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        return `${hours}시간 ${minutes}분`;
      } else {
        return `${diff}분`;
      }
    }
  };

  useEffect(() => {
    setStartTime(todayWorkInfo.startTime);
    setEndTime(todayWorkInfo.endTime);
  }, [onWork]);

  return (
    <div className='flex w-full justify-center'>
      {/* 근무시간 */}
      {endTime && (
        <div className='flex w-full h-[50px] items-center justify-center bg-white rounded-[5px] text-primary'>{`오늘 한 근무 ${getWorkTime()}`}</div>
      )}
      {startTime && !endTime ? (
        //출근 상태일 경우
        <div className='flex flex-col justify-between w-[250px] h-[153px] p-[10px] rounded-[5px] bg-white border-[1px] border-solid border-primary'>
          <div className='flex justify-between items-center content-between'>
            <span className='font-h2 text-primary'>근무</span>
            <div className='flex w-[60px] h-[20px] rounded-[50px] bg-primary text-white items-center justify-center'>진행중</div>
          </div>
          <div className='font-body1'>{`${formattedTime(startTime)} 부터 진행중`}</div>
          <CustomButton onClick={handleLeaveWorkClick} variant='contained' size='md' color='primary'>
            퇴근하기
          </CustomButton>
        </div>
      ) : (
        !startTime && (
          <CustomButton onClick={handleGoWorkClick} variant='contained' size='md' color='primary'>
            출근하기
          </CustomButton>
        )
      )}
    </div>
  );
};

export default AttendMenu;
