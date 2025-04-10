import React from 'react';
import { BottomNav, SideNav, TopNav } from '@/components';
import ClientSidenavLayout from './ClientSidenavLayout';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <ClientSidenavLayout
      header={<TopNav />}
      navbar={<SideNav />}
      footer={<BottomNav />}
    >
      {children}
    </ClientSidenavLayout>
  );
};

export default DashboardLayout;
