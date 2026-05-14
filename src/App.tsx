/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import TalentExplorer from './pages/TalentExplorer';
import CandidateDetails from './pages/CandidateDetails';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import Pricing from './pages/Pricing';
import AIMatch from './pages/AIMatch';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="explorer" element={<TalentExplorer />} />
            <Route path="talent/:id" element={<CandidateDetails />} />
            <Route path="recruiter" element={<RecruiterDashboard />} />
            <Route path="candidate" element={<CandidateDashboard />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="ai-match" element={<AIMatch />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
