"use client";

import { useActionState, useRef, useEffect } from "react";
import { createGoal, type CreateGoalState } from "@/actions/goals/create";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

const initialState: CreateGoalState = { error: null };

export default function GoalForm() {
  const [state, formAction, isPending] = useActionState(
    createGoal,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isPending && !state.error) {
      formRef.current?.reset();
    }
  }, [isPending, state.error]);

  return (
    <Card className="max-w-2xl" title="Tambah Goal">
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
          <option value="lose_weight">Lose Weight</option>
          <option value="gain_weight">Gain Weight</option>
          <option value="maintain_weight">Maintain Weight</option>
          <option value="reduce_blood_sugar">Reduce Blood Sugar</option>
          <option value="increase_activity">Increase Activity</option>
          <option value="healthy_eating">Healthy Eating</option>
        </Select>
        <Select
          label="Status"
          id="status"
          name="status"
          required
          defaultValue="active"
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
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
        <div className="sm:col-span-2">
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
            {isPending ? "Menyimpan..." : "Tambah"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
