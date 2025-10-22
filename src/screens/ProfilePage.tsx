import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';

export const ProfilePage: React.FC = () => {
  const { user } = useAppStore();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Button
          variant="ghost"
          icon={<Icon name="arrow-left" />}
          onClick={() => navigate('/')}
          aria-label="Go back"
        />
        <h1>Profile</h1>
      </div>

      <Card padding="lg" shadow="md">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-gray-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icon name="user" size={32} />
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{user?.name}</h2>
            <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-muted)' }}>{user?.email}</p>
            <span style={{
              display: 'inline-block',
              padding: '0.25rem 0.5rem',
              backgroundColor: 'var(--color-success)',
              color: 'white',
              borderRadius: '0.5rem',
              fontSize: '12px',
              marginTop: '0.5rem',
            }}>
              {user?.role.toUpperCase()}
            </span>
          </div>
        </div>

        <div>
          <h3>Allowed Areas</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
            {user?.allowedAreas.map((areaId) => (
              <span
                key={areaId}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--color-gray-100)',
                  borderRadius: '0.5rem',
                  fontSize: '14px',
                }}
              >
                Area {areaId}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};