"use client";

import { useActionState, useRef, useEffect, useState } from "react";
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
import Icon from "@/components/ui/Icon";

const initialState: CreateReminderState = { error: null };

export default function ReminderForm() {
  const [state, formAction, isPending] = useActionState(
    createReminder,
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
        Tambah Reminder
      </Button>
    );
  }

  return (
    <Card className="max-w-xl" title="Reminder Baru">
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
          <option value="meal">Makan</option>
          <option value="exercise">Olahraga</option>
          <option value="blood_sugar">Cek Gula Darah</option>
          <option value="medication">Minum Obat</option>
          <option value="weight">Cek Berat Badan</option>
          <option value="custom">Lainnya</option>
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
        <div className="flex gap-3 sm:col-span-2">
          <Button type="submit" disabled={isPending} className="flex-1 sm:flex-none">
            {isPending ? "Menyimpan..." : "Tambah"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
            Tutup
          </Button>
        </div>
      </form>
    </Card>
  );
}
