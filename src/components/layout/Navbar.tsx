import React from 'react'
import { useLocation } from 'react-router-dom'
import { FiMoon, FiSun, FiBell, FiUser } from 'react-icons/fi'
import { useTheme } from '../../contexts/ThemeContext'
import { motion } from 'framer-motion'

const Navbar: React.FC = () => {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard'
      case '/detection':
        return 'Detection & Analysis'
      case '/reporting':
        return 'Reporting & Action Management'
      case '/settings':
        return 'Settings & Configuration'
      default:
        return 'Social Sentinel'
    }
  }

  return (
    <motion.nav 
      className="sticky top-0 z-10 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 h-16 flex items-center px-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1">
        <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <motion.button
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiBell className="w-5 h-5" />
        </motion.button>
        
        <motion.button
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </motion.button>
        
        <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-700"></div>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
            <FiUser className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium hidden sm:inline">Central Agency</span>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar