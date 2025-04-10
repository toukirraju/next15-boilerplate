import { SidenavLayout } from '@/layouts';

export default function HomeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidenavLayout>
      {children}
    </SidenavLayout>
  );
}
