import { useLocation } from 'react-router-dom';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isConsultantPage = location.pathname.startsWith('/consultant');

  return (
    <div>
      {isConsultantPage ? <main>{children}</main> : <main>{children}</main>}
    </div>
  );
};

export default Layout;
