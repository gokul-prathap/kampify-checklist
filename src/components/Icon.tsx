import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

// Simple icon component using Unicode symbols and basic shapes
export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = 'currentColor',
  className = '' 
}) => {
  const getIconContent = (iconName: string) => {
    switch (iconName) {
      case 'home': return '🏠';
      case 'bed': return '🛏️';
      case 'users': return '👥';
      case 'utensils': return '🍽️';
      case 'shower': return '🚿';
      case 'plus': return '+';
      case 'check': return '✓';
      case 'x': return '×';
      case 'calendar': return '📅';
      case 'user': return '👤';
      case 'settings': return '⚙️';
      case 'menu': return '☰';
      case 'search': return '🔍';
      case 'filter': return '🔽';
      case 'edit': return '✏️';
      case 'delete': return '🗑️';
      case 'more': return '⋯';
      case 'arrow-left': return '←';
      case 'arrow-right': return '→';
      case 'chevron-down': return '⌄';
      case 'chevron-up': return '⌃';
      case 'bell': return '🔔';
      case 'chart': return '📊';
      case 'download': return '⬇️';
      case 'upload': return '⬆️';
      case 'camera': return '📷';
      case 'attachment': return '📎';
      case 'sync': return '🔄';
      case 'offline': return '📴';
      case 'online': return '🟢';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      case 'clock': return '🕐';
      default: return '?';
    }
  };

  return (
    <span 
      className={`icon ${className}`}
      style={{ 
        fontSize: size,
        color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
      }}
      role="img"
      aria-label={name}
    >
      {getIconContent(name)}
    </span>
  );
};