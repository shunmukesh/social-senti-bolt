import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome, FiSearch, FiAlertTriangle, FiSettings, FiMenu, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen)
  }

  const navItems = [
    { to: '/', icon: <FiHome className="w-5 h-5" />, label: 'Dashboard' },
    { to: '/detection', icon: <FiSearch className="w-5 h-5" />, label: 'Detection' },
    { to: '/reporting', icon: <FiAlertTriangle className="w-5 h-5" />, label: 'Reporting' },
    { to: '/settings', icon: <FiSettings className="w-5 h-5" />, label: 'Settings' }
  ]

  const sidebarVariants = {
    expanded: { width: '240px' },
    collapsed: { width: '72px' }
  }

  const mobileSidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 }
  }

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <button 
        className="fixed z-30 bottom-4 right-4 md:hidden bg-primary-600 text-white p-3 rounded-full shadow-lg"
        onClick={toggleMobileSidebar}
      >
        {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
      </button>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 bg-neutral-900/50 z-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            className="fixed top-0 left-0 h-screen z-30 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 md:hidden w-64"
            variants={mobileSidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-primary-600 flex items-center justify-center">
                  <span className="text-white font-bold">SS</span>
                </div>
                <h1 className="text-lg font-bold">Social Sentinel</h1>
              </div>
              <button onClick={toggleMobileSidebar}>
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => 
                    `flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium' 
                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        className="hidden md:block h-screen bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 z-10"
        variants={sidebarVariants}
        initial={collapsed ? 'collapsed' : 'expanded'}
        animate={collapsed ? 'collapsed' : 'expanded'}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="h-16 flex items-center px-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className="w-8 h-8 rounded bg-primary-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">SS</span>
            </div>
            {!collapsed && (
              <motion.h1 
                className="text-lg font-bold whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Social Sentinel
              </motion.h1>
            )}
          </div>
          <button 
            className="ml-auto text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            onClick={toggleSidebar}
          >
            <FiMenu className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 
                `flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-3 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium' 
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50'
                }`
              }
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </motion.aside>
    </>
  )
}

export default Sidebar