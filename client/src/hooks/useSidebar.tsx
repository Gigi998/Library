import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const useSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const width = useMediaQuery({ maxWidth: 1350 });

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return { sidebarOpen, openSidebar, closeSidebar, width };
};

export default useSidebar;
