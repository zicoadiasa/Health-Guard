"use client";

import { useActionState, useRef, useEffect } from "react";
import {
  createMealPlan,
  type CreateMealPlanState,
} from "@/actions/meal-plan/create";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

const initialState: CreateMealPlanState = { error: null };

export default function MealPlanForm() {
  const [state, formAction, isPending] = useActionState(
    createMealPlan,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isPending && !state.error) {
      formRef.current?.reset();
    }
  }, [isPending, state.error]);

  return (
    <Card className="max-w-xl" title="Tambah Meal Plan">
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
          label="Total Kalori"
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
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </Select>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
            {isPending ? "Menyimpan..." : "Tambah"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
