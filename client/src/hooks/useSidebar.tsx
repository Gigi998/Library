import React, { useState } from "react";

const useSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return { sidebarOpen, openSidebar, closeSidebar };
};

export default useSidebar;
