import React, { Suspense, lazy, memo, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";

const Home = lazy(() => import('./components/Home'));
const GitHubProfileGenerator = lazy(() => import('./hooks/GitHubProfileGenerator'));

const MemoizedHome = memo(Home);
const MemoizedGitHubProfileGenerator = memo(GitHubProfileGenerator);

const getNavLinkClass = ({ isActive }) => 
  isActive ? "text-purple-400 font-semibold" : "text-black hover:text-purple-400 transition duration-300";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false; // Default to light mode
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode); // Add or remove dark class
  }, [isDarkMode]);

  return (
    <Router>
      <div className={`min-h-screen transition duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <nav className={`shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
            <Link to="/" className={`text-3xl font-bold ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'} transition duration-300`}>
              READMEasy
            </Link>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="hidden md:flex space-x-6">
                <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
                <NavLink to="/profileGenerator" className={getNavLinkClass}>Profile Generator</NavLink>
              </div>
              <a 
                href="https://github.com/BamaCharanChhandogi/READMEasy"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-gray-300' : 'text-gray-800'} hover:text-purple-400 transition duration-300`}
              >
                <FaGithub className="w-7 h-7" />
              </a>
              {/* Toggle Button */}
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={isDarkMode}
                  onChange={toggleTheme}
                />
                <div className="relative w-11 h-6 bg-gray-400 rounded-full peer transition duration-300">
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${isDarkMode ? 'transform translate-x-full' : ''}`} />
                </div>
              </label>
            </div>
            <div className="md:hidden flex items-center mt-4">
              <button 
                onClick={toggleTheme}
                className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} transition duration-300`}
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-12">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<MemoizedHome />} />
              <Route path="/profileGenerator" element={<MemoizedGitHubProfileGenerator />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
