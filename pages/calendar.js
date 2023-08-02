import React from 'react';
import { Righteous } from 'next/font/google';
import Calendar from '@component/components/Calendar';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const CalendarPage = () => {
  return <Calendar />;
};

export default CalendarPage;
