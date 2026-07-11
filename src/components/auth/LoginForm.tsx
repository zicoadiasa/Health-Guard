"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type LoginState } from "@/actions/auth/login";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

const initialState: LoginState = { error: null };

export default function LoginForm({ registered }: { registered: boolean }) {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <Card className="w-full max-w-sm">
      <form action={formAction} className="space-y-4">
        <h1 className="text-xl font-semibold text-gray-900">Masuk</h1>

        {registered && (
          <Alert variant="success">
            Registrasi berhasil! Silakan cek email Anda untuk konfirmasi akun
            sebelum masuk.
          </Alert>
        )}

        {state.error && <Alert variant="error">{state.error}</Alert>}

        <Input label="Email" id="email" name="email" type="email" required />

        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          required
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Memproses..." : "Masuk"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link href="/register" className="text-red-600 hover:underline">
            Daftar
          </Link>
        </p>
      </form>
    </Card>
  );
}
