"use client";

import { useActionState, useRef, useEffect, useState } from "react";
import {
  createActivityLog,
  type CreateActivityLogState,
} from "@/actions/activity-log/create";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Icon from "@/components/ui/Icon";

const initialState: CreateActivityLogState = { error: null };

export default function ActivityLogForm() {
  const [state, formAction, isPending] = useActionState(
    createActivityLog,
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
        Tambah Aktivitas
      </Button>
    );
  }

  return (
    <Card className="max-w-xl" title="Tambah Aktivitas">
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
        <Select
          label="Jenis Aktivitas"
          id="activity_type"
          name="activity_type"
          required
          defaultValue="walking"
        >
          <option value="walking">Jalan Kaki</option>
          <option value="running">Lari</option>
          <option value="cycling">Bersepeda</option>
          <option value="swimming">Berenang</option>
          <option value="workout">Latihan</option>
          <option value="yoga">Yoga</option>
          <option value="other">Lainnya</option>
        </Select>
        <Input
          label="Tanggal"
          id="activity_date"
          name="activity_date"
          type="date"
          required
        />
        <Input
          label="Durasi (menit)"
          id="duration_minutes"
          name="duration_minutes"
          type="number"
          min="0"
        />
        <Input
          label="Kalori Terbakar"
          id="calories_burned"
          name="calories_burned"
          type="number"
          min="0"
        />
        <div className="sm:col-span-2">
          <Textarea label="Catatan" id="notes" name="notes" rows={2} />
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
