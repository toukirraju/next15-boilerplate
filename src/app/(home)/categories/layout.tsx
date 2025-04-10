export default function CategoryLayout({
  children,
  categoryModal,
}: Readonly<{
  children: React.ReactNode;
  categoryModal: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      {categoryModal}
    </div>
  );
}
