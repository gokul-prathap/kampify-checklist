import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from './Icon';
import './BottomNavigation.css';

const navItems = [
  { path: '/', icon: 'home', label: 'Home' },
  { path: '/tasks', icon: 'check', label: 'Tasks' },
  { path: '/reports', icon: 'chart', label: 'Reports' },
  { path: '/settings', icon: 'settings', label: 'Settings' },
];

export const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <button
            key={item.path}
            className={`bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon name={item.icon} size={20} />
            <span className="bottom-nav__label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};