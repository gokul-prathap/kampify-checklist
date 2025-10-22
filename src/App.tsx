import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './screens/HomePage';
import { AreaChecklistPage } from './screens/AreaChecklistPage';
import { ChecklistTemplatesPage } from './screens/ChecklistTemplatesPage';
import { TasksPage } from './screens/TasksPage';
import { ReportsPage } from './screens/ReportsPage';
import { SettingsPage } from './screens/SettingsPage';
import { BottomNavigation } from './components/BottomNavigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <main className="app__main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/area/:areaId" element={<AreaChecklistPage />} />
            <Route path="/area/:areaId/templates" element={<ChecklistTemplatesPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;