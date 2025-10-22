import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card } from './Card';
import { Icon } from './Icon';
import { RecentActivity as RecentActivityType } from '../types';
import './RecentActivity.css';

interface RecentActivityProps {
  activities: RecentActivityType[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  if (activities.length === 0) {
    return (
      <Card className="recent-activity__empty" padding="lg">
        <div className="recent-activity__empty-content">
          <Icon name="info" size={24} color="var(--color-muted)" />
          <p>No recent activity</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="recent-activity">
      {activities.map((activity) => (
        <Card key={activity.id} className="recent-activity__item" padding="md" shadow="sm">
          <div className="recent-activity__content">
            <div className="recent-activity__avatar">
              {activity.userAvatar ? (
                <img src={activity.userAvatar} alt={activity.userName} />
              ) : (
                <Icon name="user" size={16} />
              )}
            </div>
            <div className="recent-activity__info">
              <p className="recent-activity__text">
                <strong>{activity.userName}</strong> {activity.action} "{activity.taskTitle}"
              </p>
              <span className="recent-activity__time">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};