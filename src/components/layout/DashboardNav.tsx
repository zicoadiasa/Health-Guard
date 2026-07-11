"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/health-profile", label: "Health Profile" },
  { href: "/dashboard/food-log", label: "Food Log" },
  { href: "/dashboard/meal-plan", label: "Meal Plan" },
  { href: "/dashboard/activity-log", label: "Activity Log" },
  { href: "/dashboard/blood-sugar-log", label: "Blood Sugar Log" },
  { href: "/dashboard/weight-log", label: "Weight Log" },
  { href: "/dashboard/goals", label: "Goals" },
  { href: "/dashboard/reminder", label: "Reminder" },
  { href: "/dashboard/notifications", label: "Notifications" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 border-b border-gray-100 px-4 py-4"
      >
        <Logo className="h-8 w-8 text-red-600" />
        <span className="text-lg font-semibold text-gray-900">HealthGuard</span>
      </Link>

      <div className="flex gap-1 overflow-x-auto px-3 py-3 md:flex-col md:overflow-visible">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-xl px-4 py-3 text-base font-medium whitespace-nowrap ${
                isActive
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
