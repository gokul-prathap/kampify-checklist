import React, { useState } from 'react';
import { format } from 'date-fns';
import { useAppStore } from '../store';
import { Icon } from './Icon';
import { DatePickerModal } from './DatePickerModal';
import './AppHeader.css';

export const AppHeader: React.FC = () => {
  const { user, selectedDate, setSelectedDate } = useAppStore();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formattedDate = format(new Date(selectedDate), 'EEEE, MMM d');

  return (
    <header className="app-header">
      <div className="app-header__left">
        <h1 className="app-header__title">Resort Checklist</h1>
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
        <button 
          className="app-header__profile"
          aria-label={`Profile: ${user?.name || 'User'}`}
        >
          {user?.avatarUrl ? (
            <img 
              src={user.avatarUrl} 
              alt={user.name}
              className="app-header__avatar"
            />
          ) : (
            <Icon name="user" size={24} />
          )}
        </button>
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