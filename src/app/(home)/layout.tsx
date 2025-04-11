import { SidenavLayout } from '@/layouts';

export default function HomeLayout({
  children,
  subcategoryModal,
  categoryModal,
}: Readonly<{
  children: React.ReactNode;
  subcategoryModal: React.ReactNode;
  categoryModal: React.ReactNode;
}>) {
  return (
    <SidenavLayout>
      {children}
      {subcategoryModal}
      {categoryModal}
    </SidenavLayout>
  );
}
