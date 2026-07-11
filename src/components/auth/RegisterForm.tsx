"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register, type RegisterState } from "@/actions/auth/register";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

const initialState: RegisterState = { error: null };

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    register,
    initialState
  );

  return (
    <Card className="w-full max-w-sm">
      <form action={formAction} className="space-y-4">
        <h1 className="text-xl font-semibold text-gray-900">Daftar Akun</h1>

        {state.error && <Alert variant="error">{state.error}</Alert>}

        <Input
          label="Nama Lengkap"
          id="fullName"
          name="fullName"
          type="text"
          required
        />

        <Input label="Email" id="email" name="email" type="email" required />

        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
        />

        <Input
          label="Konfirmasi Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Mendaftarkan..." : "Daftar"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-red-600 hover:underline">
            Masuk
          </Link>
        </p>
      </form>
    </Card>
  );
}
