import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './fullCalendar.css';
import moment from 'moment';
import USER_API from '../../../services/user';
import { EventContentArg } from '@fullcalendar/core';
import { useHoliday } from '../../../hooks/useHoliday';

const MyFullCalendar = () => {
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

  // 날짜 클릭 시 모달 열기
  const handleDateClick = (arg: any) => {};

  //다음 달 클릭시
  function handleNextMonth() {
    const calendarApi = calendarRef.current!.getApi();
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
    const calendarApi = calendarRef.current!.getApi();
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  function dayCellContent(info: any) {
    // Check if the date is a holiday

    const isHoliday = holidayList.find((holiday) => moment(holiday.date).isSame(info.date, 'date'));
    console.log();
    return <div className={`fc-daygrid-day-number ${isHoliday ? 'holiday-date' : ''}`}>{info.dayNumberText}</div>;
  }

  useEffect(() => {
    //현재 달에 대한 정보 받아오기
    getMonthWorkInfo(currentMonth.start, currentMonth.end);
  }, [currentMonth]);

  console.log(holidayList);

  return (
    <div className='w-full h-full'>
      <FullCalendar
        ref={calendarRef}
        locale='kr'
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        dateClick={handleDateClick}
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
        firstDay={1}
        height={'80vh'}
        // aspectRatio={1.8}

        //이벤트 정보 커스텀
        events={[
          //근태정보 리스트
          ...monthWorkInfo.map((_it: any) => {
            return {
              title: `${moment(_it?.startAt).format('HH:mm')} ~ ${moment(_it?.endAt).format('HH:mm')}`,
              date: _it?.startAt,
              extendedProps: {
                workType: _it?.workType?.title,
              },
            };
          }),
          //공휴일 리스트
          ...holidayList.map((_it: any) => {
            return {
              title: _it.name,
              date: _it.date,
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
  return (
    <div className={`fc-event ${eventInfo.event.extendedProps.isHoliday ? 'holiday-event' : ''}`}>
      <div>{eventInfo.event.extendedProps?.type}</div>
      <div>{eventInfo.event.extendedProps?.workType}</div>
      {eventInfo.event.title}
    </div>
  );
};
export default MyFullCalendar;
