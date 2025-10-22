import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../store';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Card } from '../components/Card';
import './ChecklistTemplatesPage.css';

export const ChecklistTemplatesPage: React.FC = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const navigate = useNavigate();
  const { areas, getTemplatesByArea, getCategoriesByArea, generateTasksFromTemplates, selectedDate } = useAppStore();
  
  const area = areas.find(a => a.id === areaId);
  const templates = areaId ? getTemplatesByArea(areaId) : [];
  const categories = areaId ? getCategoriesByArea(areaId) : [];
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!area) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Area not found</h2>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  const filteredTemplates = selectedCategory 
    ? templates.filter(t => t.category === selectedCategory)
    : templates;

  const handleGenerateTasks = () => {
    generateTasksFromTemplates(selectedDate);
    navigate(`/area/${areaId}`);
  };

  return (
    <div className="checklist-templates-page">
      <div className="checklist-templates-page__header">
        <Button
          variant="ghost"
          icon={<Icon name="arrow-left" />}
          onClick={() => navigate('/')}
          aria-label="Go back"
        />
        <div className="checklist-templates-page__title">
          <Icon name={area.icon} size={24} />
          <h1>{area.name} Templates</h1>
        </div>
      </div>

      <div className="checklist-templates-page__actions">
        <Button
          variant="secondary"
          icon={<Icon name="arrow-left" />}
          onClick={() => navigate(`/area/${areaId}`)}
        >
          Back to Tasks
        </Button>
      </div>

      <div className="checklist-templates-page__categories">
        <Button
          variant={selectedCategory === null ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          All ({templates.length})
        </Button>
        {categories.map((category) => {
          const count = templates.filter(t => t.category === category).length;
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category} ({count})
            </Button>
          );
        })}
      </div>

      <div className="checklist-templates-page__content">
        {categories.map((category) => {
          if (selectedCategory && selectedCategory !== category) return null;
          
          const categoryTemplates = templates.filter(t => t.category === category);
          
          return (
            <div key={category} className="template-category">
              <h2 className="template-category__title">{category}</h2>
              <div className="template-category__list">
                {categoryTemplates.map((template) => (
                  <Card key={template.id} className="template-card" padding="md" shadow="sm">
                    <div className="template-card__content">
                      <div className="template-card__header">
                        <h3 className="template-card__title">{template.title}</h3>
                        <span className={`template-card__priority template-card__priority--${template.priority}`}>
                          {template.priority}
                        </span>
                      </div>
                      {template.description && (
                        <p className="template-card__description">{template.description}</p>
                      )}
                      <div className="template-card__meta">
                        <span className="template-card__frequency">
                          <Icon name="clock" size={14} />
                          {template.frequency.type}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {filteredTemplates.length === 0 && (
          <Card padding="lg">
            <div style={{ textAlign: 'center', color: 'var(--color-muted)' }}>
              <Icon name="info" size={32} />
              <p>No templates found for this area</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};