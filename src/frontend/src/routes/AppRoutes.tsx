import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RecordManagementPage from '../pages/RecordManagementPage';
import AnalysisPage from '../pages/AnalysisPage';
import SettingsPage from '../pages/SettingsPage';
import AddRecordPage from '../pages/AddRecordPage';
import EditRecordPage from '../pages/EditRecordPage';
import Navbar from '../components/Navbar';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/records" element={<RecordManagementPage />} />
            <Route path="/records/add" element={<AddRecordPage />} />
            <Route path="/records/edit/:id" element={<EditRecordPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default AppRoutes;
