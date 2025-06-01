import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Navbar />
        <motion.main 
          className="flex-1 overflow-auto sentinel-scrollbar p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}

export default Layout