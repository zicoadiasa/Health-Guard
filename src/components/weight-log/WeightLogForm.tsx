"use client";

import { useActionState, useRef, useEffect, useState } from "react";
import {
  createWeightLog,
  type CreateWeightLogState,
} from "@/actions/weight-log/create";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Icon from "@/components/ui/Icon";

const initialState: CreateWeightLogState = { error: null };

function nowForDateTimeLocal() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

export default function WeightLogForm() {
  const [state, formAction, isPending] = useActionState(
    createWeightLog,
    initialState
  );
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isPending && !state.error) {
      formRef.current?.reset();
    }
  }, [isPending, state.error]);

  if (!isOpen) {
    return (
      <Button
        type="button"
        variant="secondary"
        className="w-full gap-2 sm:w-auto"
        onClick={() => setIsOpen(true)}
      >
        <Icon name="plus" className="h-4 w-4" />
        Catat Berat Badan
      </Button>
    );
  }

  return (
    <Card className="max-w-md" title="Catat Berat Badan">
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
          defaultValue={nowForDateTimeLocal()}
        />
        <Textarea label="Catatan" id="notes" name="notes" rows={2} />
        <div className="flex gap-3">
          <Button type="submit" disabled={isPending} className="flex-1">
            {isPending ? "Menyimpan..." : "Simpan"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
            Tutup
          </Button>
        </div>
      </form>
    </Card>
  );
}
