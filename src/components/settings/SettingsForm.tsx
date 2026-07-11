"use client";

import { useActionState } from "react";
import {
  updateSettings,
  type UpdateSettingsState,
} from "@/actions/settings/update";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

const initialState: UpdateSettingsState = { error: null, success: false };

type SettingsFormProps = {
  fullName: string;
  email: string;
  avatarUrl: string | null;
};

export default function SettingsForm({
  fullName,
  email,
  avatarUrl,
}: SettingsFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateSettings,
    initialState
  );

  return (
    <Card className="max-w-md" title="Akun">
      {state.success && (
        <Alert variant="success" className="mb-4">
          Perubahan disimpan.
        </Alert>
      )}

      {state.error && (
        <Alert variant="error" className="mb-4">
          {state.error}
        </Alert>
      )}

      <form action={formAction} className="space-y-4">
        <Input
          label="Nama Lengkap"
          id="full_name"
          name="full_name"
          defaultValue={fullName}
          required
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <p className="rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500">
            {email}
          </p>
        </div>

        <Input
          label="Avatar URL"
          id="avatar_url"
          name="avatar_url"
          defaultValue={avatarUrl ?? ""}
          placeholder="https://..."
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </Card>
  );
}
