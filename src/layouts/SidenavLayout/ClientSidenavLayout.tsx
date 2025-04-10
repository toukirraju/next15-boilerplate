'use client';
import { AppShell, ScrollArea } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { SidenavProvider } from './SidenavLayoutContext';
import ClientTopNav from './ClientTopNav';

interface ClientSidenavLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  navbar: React.ReactNode;
  footer?: React.ReactNode;
}

const ClientSidenavLayout = ({
  children,
  header,
  navbar,
  footer,
}: ClientSidenavLayoutProps) => {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <SidenavProvider toggle={toggle} opened={opened}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 250,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        {...(footer && isMobile && { footer: { height: 40 } })}
      >
        {/* top nav  */}
        <AppShell.Header>
          <ClientTopNav sidebarOpened={opened} toggle={toggle}>
            {header}
          </ClientTopNav>
        </AppShell.Header>
        {/* side nav  */}
        <AppShell.Navbar p="md">{navbar}</AppShell.Navbar>
        {/* main content  */}
        <AppShell.Main>
          <ScrollArea className="h-[calc(100dvh-100px)]">{children}</ScrollArea>
        </AppShell.Main>
        {/* footer  */}
        {footer && <AppShell.Footer>{footer}</AppShell.Footer>}
      </AppShell>
    </SidenavProvider>
  );
};

export default ClientSidenavLayout;
