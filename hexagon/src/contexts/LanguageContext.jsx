import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Try to get language from localStorage, default to 'vi'
  const [currentLang, setCurrentLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('site_language');
      // Convert legacy 'vn' to 'vi'
      if (saved === 'vn') return 'vi';
      return saved || 'vi';
    }
    return 'vi';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('site_language', currentLang);
    }
  }, [currentLang]);

  const switchLanguage = (lang) => {
    // Convert 'vn' to 'vi' just in case
    setCurrentLang(lang === 'vn' ? 'vi' : lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLang, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export const LanguageFilter = ({ lang, children }) => {
  const { currentLang } = useLanguage();
  
  if (lang && lang !== 'all' && lang !== currentLang) {
    return null;
  }
  
  return children;
};
