import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAppStore } from '../store';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { AppHeader } from '../components/AppHeader';
import { QuickStatsRow } from '../components/QuickStatsRow';
import { AreaGrid } from '../components/AreaGrid';
import { RecentActivity } from '../components/RecentActivity';
import { AddTaskModal } from '../components/AddTaskModal';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedDate, areas, getQuickStats, getRecentActivity, generateTasksFromTemplates, tasks } = useAppStore();
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  
  // Auto-generate tasks for today
  useEffect(() => {
    generateTasksFromTemplates(selectedDate);
  }, []);
  
  const quickStats = getQuickStats();
  const recentActivity = getRecentActivity();

  const handleAreaClick = (areaId: string) => {
    navigate(`/area/${areaId}`);
  };

  const handleStatsCardClick = (type: 'due' | 'completed' | 'pending') => {
    navigate('/tasks', { state: { filter: type } });
  };

  return (
    <div className="home-page">
      <AppHeader />
      
      <div className="home-page__content">
        <QuickStatsRow 
          stats={quickStats}
          onCardClick={handleStatsCardClick}
        />
        
        <section className="home-page__section">
          <h2 className="home-page__section-title">Areas</h2>
          <AreaGrid 
            areas={areas}
            onAreaClick={handleAreaClick}
          />
        </section>

        <section className="home-page__section">
          <h2 className="home-page__section-title">Recent Activity</h2>
          <RecentActivity activities={recentActivity} />
        </section>
      </div>

      {/* Floating Action Button */}
      <Button
        className="home-page__fab"
        variant="primary"
        icon={<Icon name="plus" size={24} />}
        onClick={() => setShowAddTaskModal(true)}
        aria-label="Add new task"
      />

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <AddTaskModal
          isOpen={showAddTaskModal}
          onClose={() => setShowAddTaskModal(false)}
        />
      )}
    </div>
  );
};