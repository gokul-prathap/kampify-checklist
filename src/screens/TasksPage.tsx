import React from 'react';
import { useAppStore } from '../store';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';

export const TasksPage: React.FC = () => {
  const { tasks, areas, toggleTaskStatus } = useAppStore();

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>All Tasks</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {tasks.length === 0 ? (
          <Card padding="lg">
            <div style={{ textAlign: 'center', color: 'var(--color-muted)' }}>
              <Icon name="info" size={32} />
              <p>No tasks available</p>
            </div>
          </Card>
        ) : (
          tasks.map((task) => {
            const area = areas.find(a => a.id === task.areaId);
            return (
              <Card key={task.id} padding="md" shadow="sm">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: '2px solid var(--color-gray-400)',
                      background: task.status === 'completed' ? 'var(--color-success)' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {task.status === 'completed' && <Icon name="check" size={12} color="white" />}
                  </button>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      margin: 0, 
                      textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                      opacity: task.status === 'completed' ? 0.6 : 1,
                    }}>
                      {task.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <Icon name={area?.icon || 'home'} size={14} />
                      <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
                        {area?.name}
                      </span>
                    </div>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    backgroundColor: 
                      task.priority === 'high' ? 'var(--color-danger)' :
                      task.priority === 'medium' ? 'var(--color-warning)' : 'var(--color-success)',
                    color: 'white',
                  }}>
                    {task.priority}
                  </span>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};