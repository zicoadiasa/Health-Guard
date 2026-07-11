"use client";

import { useActionState, useRef, useEffect } from "react";
import {
  createBloodSugarLog,
  type CreateBloodSugarLogState,
} from "@/actions/blood-sugar-log/create";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

const initialState: CreateBloodSugarLogState = { error: null };

export default function BloodSugarLogForm() {
  const [state, formAction, isPending] = useActionState(
    createBloodSugarLog,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isPending && !state.error) {
      formRef.current?.reset();
    }
  }, [isPending, state.error]);

  return (
    <Card className="max-w-md" title="Tambah Catatan Gula Darah">
      {state.error && (
        <Alert variant="error" className="mb-4">
          {state.error}
        </Alert>
      )}

      <form ref={formRef} action={formAction} className="space-y-4">
        <Input
          label="Kadar Gula Darah (mg/dL)"
          id="blood_sugar_level"
          name="blood_sugar_level"
          type="number"
          step="0.1"
          min="0"
          required
        />
        <Input
          label="Waktu Pengukuran"
          id="measured_at"
          name="measured_at"
          type="datetime-local"
          required
        />
        <Textarea label="Catatan" id="notes" name="notes" rows={2} />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Menyimpan..." : "Tambah"}
        </Button>
      </form>
    </Card>
  );
}
