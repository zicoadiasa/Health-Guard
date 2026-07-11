import DashboardNav from "@/components/layout/DashboardNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      <DashboardNav />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}