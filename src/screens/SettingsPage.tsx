import React from 'react';
import { useAppStore } from '../store';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';
import { Button } from '../components/Button';

export const SettingsPage: React.FC = () => {
  const { user } = useAppStore();

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { label: 'Profile', icon: 'user', action: () => console.log('Profile') },
        { label: 'Notifications', icon: 'bell', action: () => console.log('Notifications') },
      ]
    },
    {
      title: 'App',
      items: [
        { label: 'Offline Sync', icon: 'sync', action: () => console.log('Sync') },
        { label: 'Theme', icon: 'settings', action: () => console.log('Theme') },
      ]
    },
    {
      title: 'Management',
      items: [
        { label: 'Users & Roles', icon: 'users', action: () => console.log('Users') },
        { label: 'Areas', icon: 'home', action: () => console.log('Areas') },
      ]
    }
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Settings</h1>
      
      {user && (
        <Card padding="lg" shadow="md" className="mb-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-gray-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon name="user" size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0 }}>{user.name}</h3>
              <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-muted)' }}>{user.email}</p>
              <span style={{
                display: 'inline-block',
                padding: '0.25rem 0.5rem',
                backgroundColor: 'var(--color-success)',
                color: 'white',
                borderRadius: '0.5rem',
                fontSize: '12px',
                marginTop: '0.5rem',
              }}>
                {user.role.toUpperCase()}
              </span>
            </div>
          </div>
        </Card>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {settingsSections.map((section) => (
          <div key={section.title}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--color-muted)' }}>
              {section.title}
            </h2>
            <Card padding="sm" shadow="sm">
              {section.items.map((item, index) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  fullWidth
                  onClick={item.action}
                  style={{
                    justifyContent: 'flex-start',
                    padding: '1rem',
                    borderBottom: index < section.items.length - 1 ? '1px solid var(--color-gray-200)' : 'none',
                    borderRadius: 0,
                  }}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                  <div style={{ marginLeft: 'auto' }}>
                    <Icon name="arrow-right" size={16} />
                  </div>
                </Button>
              ))}
            </Card>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--color-muted)' }}>
        <p>Resort Checklist v1.0.0</p>
      </div>
    </div>
  );
};