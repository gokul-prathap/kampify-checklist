import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppStore } from './store';
import { HomePage } from './screens/HomePage';
import { AreaChecklistPage } from './screens/AreaChecklistPage';
import { ChecklistTemplatesPage } from './screens/ChecklistTemplatesPage';
import { TasksPage } from './screens/TasksPage';
import { ReportsPage } from './screens/ReportsPage';
import { SettingsPage } from './screens/SettingsPage';
import { LoginPage } from './screens/LoginPage';
import { ProfilePage } from './screens/ProfilePage';
import { BottomNavigation } from './components/BottomNavigation';
import './App.css';

function App() {
  const { isAuthenticated, token, setUser } = useAppStore();

  useEffect(() => {
    if (token && !isAuthenticated) {
      // Auto-login if token exists
      setUser({ id: '1', name: 'User', email: 'user@kampify.com', role: 'manager', allowedAreas: ['1', '2', '3', '4', '5'] });
    }
  }, [token, isAuthenticated, setUser]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

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
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;