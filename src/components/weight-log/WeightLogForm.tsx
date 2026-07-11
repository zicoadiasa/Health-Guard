"use client";

import { useActionState, useRef, useEffect } from "react";
import {
  createWeightLog,
  type CreateWeightLogState,
} from "@/actions/weight-log/create";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

const initialState: CreateWeightLogState = { error: null };

export default function WeightLogForm() {
  const [state, formAction, isPending] = useActionState(
    createWeightLog,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isPending && !state.error) {
      formRef.current?.reset();
    }
  }, [isPending, state.error]);

  return (
    <Card className="max-w-md" title="Tambah Catatan Berat Badan">
      {state.error && (
        <Alert variant="error" className="mb-4">
          {state.error}
        </Alert>
      )}

      <form ref={formRef} action={formAction} className="space-y-4">
        <Input
          label="Berat Badan (kg)"
          id="weight_kg"
          name="weight_kg"
          type="number"
          step="0.1"
          min="0"
          required
        />
        <Input
          label="Waktu Pencatatan"
          id="recorded_at"
          name="recorded_at"
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
