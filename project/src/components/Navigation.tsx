import React from 'react';
import { Link } from 'react-router-dom';
import { Coins, Map } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TopNavbar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="w-full bg-gray-100 text-gray-700 text-sm flex justify-between items-center px-4 py-2 border-b border-gray-200">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <Coins className="h-8 w-8 text-amber-400 mr-2" />
          <span className="font-serif text-xl font-bold tracking-wide">Byzantine Anatolia</span>
        </Link>
      </div>
      <div className="flex space-x-2">
        <Link to="/about" className="px-3 py-1 rounded hover:bg-gray-200 transition-colors">{t('nav.about')}</Link>
        <Link to="/contact" className="px-3 py-1 rounded hover:bg-gray-200 transition-colors">{t('nav.contact')}</Link>
        <button 
          onClick={() => changeLanguage(i18n.language === 'en' ? 'tr' : 'en')} 
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-200 transition-colors"
        >
          {i18n.language === 'en' ? 'EN | TR' : 'TR | EN'}
        </button>
      </div>
    </div>
  );
};

const Navigation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <TopNavbar />
      <nav className="bg-gray-200 text-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-center flex-1 space-x-4">
              <Link 
                to="/" 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300 hover:text-orange-500 transition-colors"
              >
                <span>{t('nav.home')}</span>
              </Link>
              <Link 
                to="/map" 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300 hover:text-orange-500 transition-colors"
              >
                <Map className="h-5 w-5 mr-1" />
                <span>{t('nav.map')}</span>
              </Link>
              <div className="relative group">
                <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300 hover:text-orange-500 transition-colors focus:outline-none">
                  {t('nav.coins.title')}
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity z-20">
                  <Link to="/coins/gold" className="block px-4 py-2 hover:bg-gray-100">{t('nav.coins.gold')}</Link>
                  <Link to="/coins/silver" className="block px-4 py-2 hover:bg-gray-100">{t('nav.coins.silver')}</Link>
                  <Link to="/coins/bronze" className="block px-4 py-2 hover:bg-gray-100">{t('nav.coins.bronze')}</Link>
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300 hover:text-orange-500 transition-colors focus:outline-none">
                  {t('nav.seals.title')}
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity z-20">
                  <Link to="/seals/lead" className="block px-4 py-2 hover:bg-gray-100">{t('nav.seals.lead')}</Link>
                  <Link to="/seals/other" className="block px-4 py-2 hover:bg-gray-100">{t('nav.seals.other')}</Link>
                </div>
              </div>
              <Link 
                to="/publications" 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300 hover:text-orange-500 transition-colors"
              >
                {t('nav.publications')}
              </Link>
            </div>
            <div className="flex items-center">
              <Link 
                to="/admin" 
                className="px-3 py-2 rounded-md text-sm font-medium bg-orange-500 hover:bg-orange-500 text-white transition-colors"
              >
                {t('nav.admin')}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;