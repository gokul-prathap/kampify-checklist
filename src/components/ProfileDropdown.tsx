import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { Icon } from './Icon';
import './ProfileDropdown.css';

export const ProfileDropdown: React.FC = () => {
  const { user, logout } = useAppStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleProfile = () => {
    navigate('/profile');
    setIsOpen(false);
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button 
        className="profile-dropdown__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Profile: ${user?.name || 'User'}`}
      >
        {user?.avatarUrl ? (
          <img 
            src={user.avatarUrl} 
            alt={user.name}
            className="profile-dropdown__avatar"
          />
        ) : (
          <Icon name="user" size={24} />
        )}
      </button>

      {isOpen && (
        <div className="profile-dropdown__menu">
          <div className="profile-dropdown__header">
            <div className="profile-dropdown__user-info">
              <div className="profile-dropdown__name">{user?.name}</div>
              <div className="profile-dropdown__email">{user?.email}</div>
            </div>
          </div>
          
          <div className="profile-dropdown__divider" />
          
          <button 
            className="profile-dropdown__item"
            onClick={handleProfile}
          >
            <Icon name="user" size={16} />
            Profile
          </button>
          
          <button 
            className="profile-dropdown__item profile-dropdown__item--danger"
            onClick={handleLogout}
          >
            <Icon name="logout" size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};