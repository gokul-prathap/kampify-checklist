import React, { useState } from 'react';
import { format } from 'date-fns';
import { useAppStore } from '../store';
import { Icon } from './Icon';
import { DatePickerModal } from './DatePickerModal';
import { ProfileDropdown } from './ProfileDropdown';
import './AppHeader.css';

export const AppHeader: React.FC = () => {
  const { selectedDate, setSelectedDate } = useAppStore();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formattedDate = format(new Date(selectedDate), 'EEEE, MMM d');

  return (
    <header className="app-header">
      <div className="app-header__left">
        <h1 className="app-header__title">Kampify Checklist</h1>
      </div>
      
      <button 
        className="app-header__date"
        onClick={() => setShowDatePicker(true)}
        aria-label={`Current date: ${formattedDate}. Click to change date.`}
      >
        <Icon name="calendar" size={16} />
        <span>{formattedDate}</span>
      </button>
      
      <div className="app-header__right">
        <ProfileDropdown />
      </div>

      {showDatePicker && (
        <DatePickerModal
          selectedDate={selectedDate}
          onDateSelect={(date) => {
            setSelectedDate(date);
            setShowDatePicker(false);
          }}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </header>
  );
};