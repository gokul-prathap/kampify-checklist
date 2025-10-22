import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Button } from './Button';
import { Icon } from './Icon';
import { Priority, TaskInstance } from '../types';
import './AddTaskModal.css';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const { areas, selectedDate, addTask, user } = useAppStore();
  const [formData, setFormData] = useState({
    areaId: '',
    title: '',
    description: '',
    priority: 'medium' as Priority,
    category: '',
    saveAsTemplate: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.areaId) {
      return;
    }

    const newTask: TaskInstance = {
      id: Date.now().toString(),
      areaId: formData.areaId,
      title: formData.title.trim(),
      description: formData.description.trim(),
      date: selectedDate,
      status: 'pending',
      priority: formData.priority,
      assigneeId: user?.id,
      notes: [],
      attachments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addTask(newTask);
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="add-task-modal" onClick={onClose}>
      <div className="add-task-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="add-task-modal__header">
          <h2>Add New Task</h2>
          <Button
            variant="ghost"
            size="sm"
            icon={<Icon name="x" />}
            onClick={onClose}
            aria-label="Close modal"
          />
        </div>

        <form onSubmit={handleSubmit} className="add-task-modal__form">
          <div className="form-field">
            <label htmlFor="area">Area *</label>
            <select
              id="area"
              value={formData.areaId}
              onChange={(e) => handleInputChange('areaId', e.target.value)}
              required
            >
              <option value="">Select an area</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="title">Task Title *</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              placeholder="e.g., Cleaning, Maintenance, etc."
            />
          </div>

          <div className="form-field">
            <label>Priority</label>
            <div className="priority-chips">
              {(['low', 'medium', 'high'] as Priority[]).map((priority) => (
                <button
                  key={priority}
                  type="button"
                  className={`priority-chip priority-chip--${priority} ${
                    formData.priority === priority ? 'priority-chip--selected' : ''
                  }`}
                  onClick={() => handleInputChange('priority', priority)}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="form-field">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.saveAsTemplate}
                onChange={(e) => handleInputChange('saveAsTemplate', e.target.checked)}
              />
              Save as template
            </label>
          </div>

          <div className="add-task-modal__actions">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};