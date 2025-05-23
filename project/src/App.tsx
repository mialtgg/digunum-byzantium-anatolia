import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import AdminLogin from './pages/AdminLogin';
import Navigation from './components/Navigation';
import { CoinProvider } from './context/CoinContext';
import { SealProvider } from './context/SealContext';
import { EmperorProvider } from './context/EmperorContext';
import MapPage from './pages/MapPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PublicationsPage from './pages/PublicationsPage';
import GoldCoinsPage from './pages/coins/GoldCoinsPage';
import SilverCoinsPage from './pages/coins/SilverCoinsPage';
import BronzeCoinsPage from './pages/coins/BronzeCoinsPage';
import LeadSealsPage from './pages/seals/LeadSealsPage';
import OtherSealsPage from './pages/seals/OtherSealsPage';
import { PublicationProvider } from './context/PublicationContext';
import './i18n';

function App() {
  return (
    <PublicationProvider>
      <CoinProvider>
        <SealProvider>
          <EmperorProvider>
            <Router>
              <div className="min-h-screen bg-orange-50">
                <Navigation />
                <main>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/publications" element={<PublicationsPage />} />
                    <Route path="/coins/gold" element={<GoldCoinsPage />} />
                    <Route path="/coins/silver" element={<SilverCoinsPage />} />
                    <Route path="/coins/bronze" element={<BronzeCoinsPage />} />
                    <Route path="/seals/lead" element={<LeadSealsPage />} />
                    <Route path="/seals/other" element={<OtherSealsPage />} />
                  </Routes>
                </main>
              </div>
            </Router>
          </EmperorProvider>
        </SealProvider>
      </CoinProvider>
    </PublicationProvider>
  );
}

export default App;