import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './fullCalendar.css';
import moment from 'moment';
import USER_API from '../../../services/user';
import { EventContentArg } from '@fullcalendar/core';
import { useHoliday } from '../../../hooks/useHoliday';
import findWorkStatus from '../../../utils/findWorkStatus';

interface MyFullCalendarProps {
  onWork?: boolean;
  todayWorkInfo?: any;
  todayWorkInfoList?: any; //오늘근무 정보 리스트
}

const MyFullCalendar = ({ onWork, todayWorkInfo, todayWorkInfoList }: MyFullCalendarProps) => {
  const today = moment();
  const calendarRef = useRef<any>(null);

  //공휴일 받아오기
  const { getHolidayList } = useHoliday();
  const holidayList = getHolidayList();

  const [monthWorkInfo, setMonthWorkInfo] = useState<any>([]);

  const [currentMonth, setCurrentMonth] = useState({
    start: today.startOf('month').startOf('day').toISOString(),
    end: today.endOf('month').endOf('day').toISOString(),
  });

  //다음 달 클릭시
  function handleNextMonth() {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      //달력 이동
      calendarApi.next();
      handleCurrentMonth();
    } else {
      console.error('calendarRef.current is null');
    }
  }

  //이전 달 클릭시
  function handlePrevMonth() {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.prev();
      handleCurrentMonth();
    } else {
      console.error('calendarRef.current is null');
    }
  }

  //달력에 해당하는 달의 첫날, 마지막날 설정
  const handleCurrentMonth = () => {
    const calendarApi = calendarRef.current.getApi();
    const view = calendarApi.view;
    const start = view.currentStart;
    const end = view.currentEnd;

    setCurrentMonth({
      start: start.toISOString(),
      end: end.toISOString(),
    });
  };

  //TODO :한 달 근무 정보 받아오기
  const getMonthWorkInfo = async (startDay: string, endDay: string) => {
    try {
      const response = await USER_API.commute_log(startDay, endDay);
      const data = response.data;

      setMonthWorkInfo(data);
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  function dayCellContent(info: any) {
    // Check if the date is a holiday

    const isHoliday = holidayList.find((holiday) => moment(holiday.date).isSame(info.date, 'date'));

    const isSameDate = (day: string, day2: any) => {
      const currentDate = moment(day2).format('YYYY-MM-DD');
      //console.log(moment(day, 'YYYY.MM.DD').isSame(currentDate, 'day'));
      return moment(day, 'YYYY.MM.DD').isSame(currentDate, 'day');
    };

    const workInfo = monthWorkInfo.find((_it: any) => isSameDate(_it.date, info.date));

    return (
      <div className='fc-daygrid-day-custom flex flex-1 items-center justify-between'>
        <div className={`flex fc-daygrid-day-number ${isHoliday ? 'holiday-date' : ''}`}>{info.dayNumberText}</div>
        {workInfo && (
          <div className='flex w-[60px] h-[20px] rounded-[50px] bg-primary text-white items-center justify-center'>{findWorkStatus(workInfo)}</div>
        )}
      </div>
    );
  }

  useEffect(() => {
    //현재 달에 대한 정보 받아오기
    getMonthWorkInfo(currentMonth.start, currentMonth.end);
  }, [currentMonth, onWork]);

  //console.log(holidayList);

  return (
    <div className='w-full h-full font-noto-sans'>
      {/* <button onClick={handlePrevMonth}>Prev</button>
      <button onClick={handleNextMonth}>Next</button> */}
      <FullCalendar
        ref={calendarRef}
        locale='kr'
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        // dateClick={handleDateClick}
        //커스텀 버튼 생성
        customButtons={{
          customNext: {
            text: '>',
            click: function () {
              handleNextMonth();
            },
          },
          customPrev: {
            text: '<',
            click: function () {
              handlePrevMonth();
            },
          },
        }}
        headerToolbar={{
          start: 'customPrev',
          center: 'title',
          end: 'customNext',
        }}
        // firstDay={1}
        height={'80vh'}
        // aspectRatio={1.8}

        //이벤트 정보 커스텀
        events={[
          //근태정보 리스트
          ...monthWorkInfo.map((_it: any) => {
            return {
              title: `${moment(_it?.startAt).format('HH:mm')} ~ ${moment(_it?.endAt).format('HH:mm')}`,
              date: moment(_it?.date).format('YYYY-MM-DD'),
              extendedProps: {
                workType: _it?.workType?.title,
                workInfo: _it,
              },
            };
          }),
          //공휴일 리스트
          ...holidayList.map((_it: any) => {
            return {
              title: _it?.name,
              date: moment(_it?.date).format('YYYY-MM-DD'),
              extendedProps: {
                isHoliday: true,
              },
            };
          }),
        ]}
        eventContent={renderEventContent}
        dayCellContent={dayCellContent}
      />
    </div>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  if (!eventInfo || !eventInfo.event) return null;

  const isHoliday = eventInfo.event?.extendedProps?.isHoliday;
  const workInfo = eventInfo?.event?.extendedProps?.workInfo;

  const isToday = (day: string) => {
    const currentDate = moment().format('YYYY-MM-DD');
    return moment(day, 'YYYY.MM.DD').isSame(currentDate, 'day');
  };

  function formatTime(time: string) {
    return moment(time).format('HH:mm');
  }

  return isHoliday ? (
    <div className={`holiday-event`}>
      <div>{eventInfo.event?.extendedProps?.workType}</div>
      {eventInfo.event?.title}
    </div>
  ) : (
    workInfo && (
      <>
        {/* //해당 컴포넌트 클릭 시 모달 열리게 설정 */}
        <div className={`work-event`} onClick={() => console.log(workInfo)}>
          {/* <div>{eventInfo.event?.extendedProps?.workType}</div> */}
          {/* <div className='flex justify-end'>
            <div className='flex w-[60px] h-[20px] rounded-[50px] bg-primary text-white items-center justify-center'>{findWorkStatus(workInfo)}</div>
          </div> */}

          <div>{`출근 : ${formatTime(workInfo?.startAt)}`}</div>
          <div>{`퇴근 : ${workInfo?.isNormal ? formatTime(workInfo?.endAt) : isToday(workInfo.date) ? '근무중' : '-'}`}</div>
          {/* {eventInfo.event?.title} */}
        </div>
      </>
    )
  );
};
export default MyFullCalendar;
