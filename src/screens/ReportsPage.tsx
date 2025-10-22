import React from 'react';
import { useAppStore } from '../store';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';

export const ReportsPage: React.FC = () => {
  const { tasks, areas } = useAppStore();
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const tasksByArea = areas.map(area => ({
    area: area.name,
    total: tasks.filter(t => t.areaId === area.id).length,
    completed: tasks.filter(t => t.areaId === area.id && t.status === 'completed').length,
  }));

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Reports</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <Card padding="lg" shadow="md">
          <div style={{ textAlign: 'center' }}>
            <Icon name="chart" size={32} color="var(--color-success)" />
            <h3 style={{ margin: '0.5rem 0', fontSize: '2rem' }}>{completionRate}%</h3>
            <p style={{ margin: 0, color: 'var(--color-muted)' }}>Completion Rate</p>
          </div>
        </Card>
        
        <Card padding="lg" shadow="md">
          <div style={{ textAlign: 'center' }}>
            <Icon name="check" size={32} color="var(--color-success)" />
            <h3 style={{ margin: '0.5rem 0', fontSize: '2rem' }}>{completedTasks}</h3>
            <p style={{ margin: 0, color: 'var(--color-muted)' }}>Completed Tasks</p>
          </div>
        </Card>
        
        <Card padding="lg" shadow="md">
          <div style={{ textAlign: 'center' }}>
            <Icon name="calendar" size={32} color="var(--color-warning)" />
            <h3 style={{ margin: '0.5rem 0', fontSize: '2rem' }}>{totalTasks}</h3>
            <p style={{ margin: 0, color: 'var(--color-muted)' }}>Total Tasks</p>
          </div>
        </Card>
      </div>

      <Card padding="lg" shadow="md">
        <h2 style={{ marginBottom: '1rem' }}>Tasks by Area</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tasksByArea.map((item) => (
            <div key={item.area} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{item.area}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '14px', color: 'var(--color-muted)' }}>
                  {item.completed}/{item.total}
                </span>
                <div style={{
                  width: '100px',
                  height: '8px',
                  backgroundColor: 'var(--color-gray-200)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${item.total > 0 ? (item.completed / item.total) * 100 : 0}%`,
                    height: '100%',
                    backgroundColor: 'var(--color-success)',
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};