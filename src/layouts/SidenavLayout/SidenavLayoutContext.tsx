'use client';
import React, { createContext, useContext, ReactNode } from 'react';

interface SidenavLayoutContextType {
  toggle: () => void;
  opened: boolean;
}

const SidenavContext = createContext<SidenavLayoutContextType | undefined>(
  undefined
);

export const useSidenavLayout = (): SidenavLayoutContextType => {
  const context = useContext(SidenavContext);
  if (!context) {
    throw new Error('useSidenavLayout must be used within a SidenavProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
  toggle: () => void;
  opened: boolean;
}

export const SidenavProvider: React.FC<SidebarProviderProps> = ({
  children,
  toggle,
  opened,
}) => {
  return (
    <SidenavContext.Provider value={{ toggle, opened }}>
      {children}
    </SidenavContext.Provider>
  );
};
