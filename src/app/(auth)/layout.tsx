import Logo from "@/components/ui/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-4">
      <div className="flex items-center gap-2">
        <Logo className="h-9 w-9 text-red-600" />
        <span className="text-lg font-semibold text-gray-900">
          HealthGuard
        </span>
      </div>
      {children}
    </main>
  );
}