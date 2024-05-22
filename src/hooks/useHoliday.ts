// useHoliday.ts
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

type RawData = {
  // 달력에 표시되는 휴일 이름
  summary: string;
  start: {
    date: string;
  };
};

type Holiday = {
  name: string;
  date: Date;
};

type StorageHoliday = {
  name: string;
  date: string;
};

type Return = {
  getMatchedHoliday: (date: Date) => Holiday | null;
  getHolidayList: () => Holiday[] | [];
};

export const useHoliday = (): Return => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const storageKey = '__holidays';

  useEffect(() => {
    const storageHolidays = localStorage.getItem(storageKey);
    if (storageHolidays) {
      /** localStorage에 저장되어 있다면 그 값을 사용 */
      const newHolidays = JSON.parse(storageHolidays).map((holiday: StorageHoliday) => ({
        ...holiday,
        date: new Date(holiday.date),
      }));
      setHolidays(newHolidays);
    } else {
      /** localStorage에 값이 없다면 Google Calendar API 호출 */
      const calendarId = 'ko.south_korea.official%23holiday%40group.v.calendar.google.com';
      //const apiKey = 'AIzaSyDmgrNumY3R_rMUJYVaOj7wgyK3NlBfBe0';
      const apiKey = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
      const startDate = new Date('2024-01-01').toISOString();
      const endDate = new Date('2024-12-31').toISOString();
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&orderBy=startTime&singleEvents=true&timeMin=${startDate}&timeMax=${endDate}`,
      ).then((response) => {
        response.json().then((result) => {
          const newHolidays = result.items.map((item: RawData) => ({
            name: item.summary,
            date: new Date(item.start.date),
          }));
          setHolidays(newHolidays);
          localStorage.setItem(storageKey, JSON.stringify(newHolidays));
        });
      });
    }
  }, []);

  const getMatchedHoliday = (date: Date): Holiday | null => {
    return holidays.find((holiday) => dayjs(holiday.date).isSame(date, 'date')) ?? null;
  };

  const getHolidayList = (): Holiday[] | [] => {
    return holidays;
  };

  return { getMatchedHoliday, getHolidayList };
};
