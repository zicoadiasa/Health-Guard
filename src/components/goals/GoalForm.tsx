"use client";

import { useActionState, useRef, useEffect, useState } from "react";
import { createGoal, type CreateGoalState } from "@/actions/goals/create";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Icon from "@/components/ui/Icon";

const initialState: CreateGoalState = { error: null };

export default function GoalForm() {
  const [state, formAction, isPending] = useActionState(
    createGoal,
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
        Buat Goal Baru
      </Button>
    );
  }

  return (
    <Card className="max-w-2xl" title="Goal Baru">
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
          label="Jenis Goal"
          id="goal_type"
          name="goal_type"
          required
          defaultValue="lose_weight"
        >
          <option value="lose_weight">Menurunkan Berat Badan</option>
          <option value="gain_weight">Menambah Berat Badan</option>
          <option value="maintain_weight">Menjaga Berat Badan</option>
          <option value="reduce_blood_sugar">Menurunkan Gula Darah</option>
          <option value="increase_activity">Meningkatkan Aktivitas</option>
          <option value="healthy_eating">Pola Makan Sehat</option>
        </Select>
        <Select
          label="Status"
          id="status"
          name="status"
          required
          defaultValue="active"
        >
          <option value="active">Aktif</option>
          <option value="completed">Selesai</option>
          <option value="cancelled">Dibatalkan</option>
        </Select>
        <Input
          label="Target"
          id="target_value"
          name="target_value"
          type="number"
          step="0.1"
        />
        <Input
          label="Progres Saat Ini"
          id="current_value"
          name="current_value"
          type="number"
          step="0.1"
        />
        <Input label="Satuan" id="unit" name="unit" placeholder="kg, langkah/hari, dll" />
        <Input label="Tanggal Mulai" id="start_date" name="start_date" type="date" />
        <Input label="Target Tanggal" id="target_date" name="target_date" type="date" />
        <div className="sm:col-span-2">
          <Textarea label="Catatan" id="notes" name="notes" rows={2} />
        </div>
        <div className="flex gap-3 sm:col-span-2">
          <Button type="submit" disabled={isPending} className="flex-1 sm:flex-none">
            {isPending ? "Menyimpan..." : "Buat"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
            Tutup
          </Button>
        </div>
      </form>
    </Card>
  );
}
