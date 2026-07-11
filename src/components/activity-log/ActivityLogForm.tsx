"use client";

import { useActionState, useRef, useEffect } from "react";
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

const initialState: CreateActivityLogState = { error: null };

export default function ActivityLogForm() {
  const [state, formAction, isPending] = useActionState(
    createActivityLog,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isPending && !state.error) {
      formRef.current?.reset();
    }
  }, [isPending, state.error]);

  return (
    <Card className="max-w-xl" title="Tambah Activity Log">
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
          <option value="walking">Walking</option>
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
          <option value="swimming">Swimming</option>
          <option value="workout">Workout</option>
          <option value="yoga">Yoga</option>
          <option value="other">Other</option>
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
        <div className="sm:col-span-2">
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
            {isPending ? "Menyimpan..." : "Tambah"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
