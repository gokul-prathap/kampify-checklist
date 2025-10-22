import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns';
import { Button } from './Button';
import { Icon } from './Icon';
import './DatePickerModal.css';

interface DatePickerModalProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  onClose: () => void;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  selectedDate,
  onDateSelect,
  onClose,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
  const selectedDateObj = new Date(selectedDate);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (date: Date) => {
    onDateSelect(format(date, 'yyyy-MM-dd'));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newMonth);
  };

  return (
    <div className="date-picker-modal" onClick={onClose}>
      <div className="date-picker-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="date-picker-modal__header">
          <Button
            variant="ghost"
            size="sm"
            icon={<Icon name="arrow-left" />}
            onClick={() => navigateMonth('prev')}
            aria-label="Previous month"
          />
          <h3 className="date-picker-modal__title">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            icon={<Icon name="arrow-right" />}
            onClick={() => navigateMonth('next')}
            aria-label="Next month"
          />
        </div>

        <div className="date-picker-modal__calendar">
          <div className="date-picker-modal__weekdays">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="date-picker-modal__weekday">
                {day}
              </div>
            ))}
          </div>
          
          <div className="date-picker-modal__days">
            {days.map((day) => {
              const isSelected = isSameDay(day, selectedDateObj);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              
              return (
                <button
                  key={day.toISOString()}
                  className={`date-picker-modal__day ${
                    isSelected ? 'date-picker-modal__day--selected' : ''
                  } ${
                    !isCurrentMonth ? 'date-picker-modal__day--other-month' : ''
                  }`}
                  onClick={() => handleDateClick(day)}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>
        </div>

        <div className="date-picker-modal__actions">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};