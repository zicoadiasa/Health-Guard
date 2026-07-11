"use client";

import { useActionState, useRef, useEffect } from "react";
import {
  createReminder,
  type CreateReminderState,
} from "@/actions/reminder/create";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

const initialState: CreateReminderState = { error: null };

export default function ReminderForm() {
  const [state, formAction, isPending] = useActionState(
    createReminder,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isPending && !state.error) {
      formRef.current?.reset();
    }
  }, [isPending, state.error]);

  return (
    <Card className="max-w-xl" title="Tambah Reminder">
      {state.error && (
        <Alert variant="error" className="mb-4">
          {state.error}
        </Alert>
      )}

      <form
        ref={formRef}
        action={formAction}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <Input label="Judul" id="title" name="title" required />
        </div>
        <Select
          label="Jenis Reminder"
          id="reminder_type"
          name="reminder_type"
          required
          defaultValue="custom"
        >
          <option value="meal">Meal</option>
          <option value="exercise">Exercise</option>
          <option value="blood_sugar">Blood Sugar</option>
          <option value="medication">Medication</option>
          <option value="weight">Weight</option>
          <option value="custom">Custom</option>
        </Select>
        <Input
          label="Waktu"
          id="reminder_time"
          name="reminder_time"
          type="datetime-local"
          required
        />
        <div className="sm:col-span-2">
          <Textarea label="Deskripsi" id="description" name="description" rows={2} />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
            {isPending ? "Menyimpan..." : "Tambah"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
