import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import StoresPage from './pages/StoresPage';
import SKUsPage from './pages/SKUsPage';
import PlanningPage from './pages/PlanningPage';
import ChartPage from './pages/ChartPage';
import Navbar from './components/NavBar';
import { ErrorBoundary } from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <Navbar />
      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Navigate to="/stores" />} />
              <Route path="/stores" element={<StoresPage />} />
              <Route path="/skus" element={<SKUsPage />} />
              <Route path="/planning" element={<PlanningPage />} />
              <Route path="/chart" element={<ChartPage />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default App;
