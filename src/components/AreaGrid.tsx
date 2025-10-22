import React from 'react';
import { Card } from './Card';
import { Icon } from './Icon';
import { Area } from '../types';
import './AreaGrid.css';

interface AreaGridProps {
  areas: Area[];
  onAreaClick: (areaId: string) => void;
}

export const AreaGrid: React.FC<AreaGridProps> = ({ areas, onAreaClick }) => {
  return (
    <div className="area-grid">
      {areas.map((area) => (
        <Card
          key={area.id}
          className="area-grid__card"
          padding="lg"
          shadow="md"
          hoverable
          onClick={() => onAreaClick(area.id)}
        >
          <div className="area-grid__content">
            <div className="area-grid__icon">
              <Icon name={area.icon} size={32} />
            </div>
            <h3 className="area-grid__title">{area.name}</h3>
          </div>
        </Card>
      ))}
    </div>
  );
};