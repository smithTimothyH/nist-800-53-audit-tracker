import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ControlsProvider } from './context/ControlsContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ControlsPage from './pages/ControlsPage';
import ControlDetailsPage from './pages/ControlDetailsPage';
import UsersPage from './pages/UsersPage';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/LoginPage';
import UserGuidePage from './pages/UserGuidePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ControlsProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="controls" element={<ControlsPage />} />
              <Route path="controls/:id" element={<ControlDetailsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="guide" element={<UserGuidePage />} />
            </Route>
          </Routes>
        </ControlsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;