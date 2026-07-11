"use client";

import { useActionState, useRef, useEffect, useState } from "react";
import {
  createMealPlan,
  type CreateMealPlanState,
} from "@/actions/meal-plan/create";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Icon from "@/components/ui/Icon";

const initialState: CreateMealPlanState = { error: null };

export default function MealPlanForm() {
  const [state, formAction, isPending] = useActionState(
    createMealPlan,
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
        Buat Rencana Makan
      </Button>
    );
  }

  return (
    <Card className="max-w-xl" title="Rencana Makan Baru">
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
        <Input
          label="Tanggal"
          id="plan_date"
          name="plan_date"
          type="date"
          required
        />
        <Input
          label="Target Kalori"
          id="total_calories"
          name="total_calories"
          type="number"
          min="0"
        />
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
