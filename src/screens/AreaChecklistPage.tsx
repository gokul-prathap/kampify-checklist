import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Card } from '../components/Card';
import './AreaChecklistPage.css';

export const AreaChecklistPage: React.FC = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const navigate = useNavigate();
  const { 
    areas, 
    getTasksByArea, 
    getCategoriesByArea,
    toggleTaskStatus, 
    generateTasksFromTemplates, 
    selectedDate,
    templates,
    downloadTasksAsJSON
  } = useAppStore();
  
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'completed'>('all');
  
  const area = areas.find(a => a.id === areaId);
  const allTasks = areaId ? getTasksByArea(areaId) : [];
  const categories = areaId ? getCategoriesByArea(areaId) : [];
  
  const filteredTasks = allTasks.filter(task => {
    if (selectedTab === 'pending') return task.status === 'pending';
    if (selectedTab === 'completed') return task.status === 'completed';
    return true;
  });
  
  // Auto-generate tasks from templates when entering area
  useEffect(() => {
    if (areaId) {
      generateTasksFromTemplates(selectedDate);
    }
  }, [areaId, selectedDate, generateTasksFromTemplates]);

  if (!area) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Area not found</h2>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  const getTasksByCategory = (category: string) => {
    return filteredTasks.filter(task => {
      if (task.templateId) {
        const template = templates.find(t => t.id === task.templateId);
        return template?.category === category;
      }
      return false;
    });
  };

  const renderTaskCard = (task: any) => (
    <Card key={task.id} className="task-card" padding="md" shadow="sm">
      <div className="task-card__content">
        <button
          className={`task-checkbox ${task.status === 'completed' ? 'task-checkbox--completed' : ''}`}
          onClick={() => toggleTaskStatus(task.id)}
          aria-label={`Mark ${task.title} as ${task.status === 'completed' ? 'pending' : 'completed'}`}
        >
          {task.status === 'completed' && <Icon name="check" size={12} color="white" />}
        </button>
        <div className="task-card__info">
          <h3 className={`task-card__title ${task.status === 'completed' ? 'task-card__title--completed' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="task-card__description">{task.description}</p>
          )}
        </div>
        <span className={`task-card__priority task-card__priority--${task.priority}`}>
          {task.priority}
        </span>
      </div>
    </Card>
  );

  return (
    <div className="area-checklist-page">
      <div className="area-checklist-page__header">
        <Button
          variant="ghost"
          icon={<Icon name="arrow-left" />}
          onClick={() => navigate('/')}
          aria-label="Go back"
        />
        <div className="area-checklist-page__title">
          <Icon name={area.icon} size={24} />
          <h1>{area.name}</h1>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={<Icon name="download" />}
          onClick={() => downloadTasksAsJSON(selectedDate)}
        >
          Export
        </Button>

      </div>

      <div className="area-checklist-page__tabs">
        {(['all', 'pending', 'completed'] as const).map((tab) => {
          const count = tab === 'all' ? allTasks.length : 
                      tab === 'pending' ? allTasks.filter(t => t.status === 'pending').length :
                      allTasks.filter(t => t.status === 'completed').length;
          
          return (
            <button
              key={tab}
              className={`tab-button ${selectedTab === tab ? 'tab-button--active' : ''}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({count})
            </button>
          );
        })}
      </div>

      <div className="area-checklist-page__content">
        {filteredTasks.length === 0 ? (
          <Card padding="lg">
            <div className="empty-state">
              <Icon name="info" size={32} />
              <p>No tasks found</p>
              <Button
                variant="primary"
                onClick={() => {
                  generateTasksFromTemplates(selectedDate);
                  window.location.reload();
                }}
              >
                Generate Tasks
              </Button>
            </div>
          </Card>
        ) : (
          categories.map((category) => {
            const categoryTasks = getTasksByCategory(category);
            if (categoryTasks.length === 0) return null;
            
            return (
              <div key={category} className="task-category">
                <h2 className="task-category__title">{category}</h2>
                <div className="task-category__list">
                  {categoryTasks.map(renderTaskCard)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};