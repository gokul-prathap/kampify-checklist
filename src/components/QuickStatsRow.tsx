import React from 'react';
import { Card } from './Card';
import { Icon } from './Icon';
import { QuickStats } from '../types';
import './QuickStatsRow.css';

interface QuickStatsRowProps {
  stats: QuickStats;
  onCardClick: (type: 'due' | 'completed' | 'pending') => void;
}

export const QuickStatsRow: React.FC<QuickStatsRowProps> = ({ stats, onCardClick }) => {
  const statsCards = [
    {
      type: 'due' as const,
      label: 'Due Today',
      value: stats.dueToday,
      icon: 'calendar',
      color: 'var(--color-warning)',
    },
    {
      type: 'completed' as const,
      label: 'Completed',
      value: stats.completed,
      icon: 'check',
      color: 'var(--color-success)',
    },
    {
      type: 'pending' as const,
      label: 'Pending',
      value: stats.pending,
      icon: 'clock',
      color: 'var(--color-muted)',
    },
  ];

  return (
    <section className="quick-stats" role="region" aria-label="Task statistics">
      <div className="quick-stats__grid">
        {statsCards.map((card) => (
          <Card
            key={card.type}
            className="quick-stats__card"
            padding="md"
            shadow="sm"
            hoverable
            onClick={() => onCardClick(card.type)}
          >
            <div className="quick-stats__card-content">
              <div className="quick-stats__icon" style={{ color: card.color }}>
                <Icon name={card.icon} size={20} />
              </div>
              <div className="quick-stats__info">
                <div className="quick-stats__value">{card.value}</div>
                <div className="quick-stats__label">{card.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};