import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="w-full max-w-[420px] rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
      <div className="flex flex-col items-center text-center">
        <svg
          viewBox="0 0 24 24"
          className="h-14 w-14"
          aria-hidden="true"
        >
          <path
            fill="#dc2626"
            d="M12 2C12 2 4.5 11.5 4.5 16a7.5 7.5 0 0 0 15 0C19.5 11.5 12 2 12 2Z"
          />
          <rect x="10.6" y="12.5" width="2.8" height="8" rx="1" fill="white" />
          <rect x="8.1" y="15" width="7.8" height="2.8" rx="1" fill="white" />
        </svg>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">HealthGuard</h1>
        <p className="mt-1 text-sm text-gray-500">Smart Diabetes Management</p>
      </div>

      <form className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="John Doe"
            className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-red-600 hover:text-red-700">
          Login
        </Link>
      </p>
    </div>
  );
}
