"use client";

import { useActionState, useRef, useEffect, useState } from "react";
import {
  createFoodLog,
  type CreateFoodLogState,
} from "@/actions/food-log/create";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Icon from "@/components/ui/Icon";

const initialState: CreateFoodLogState = { error: null };

function nowForDateTimeLocal() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

export default function FoodLogForm() {
  const [state, formAction, isPending] = useActionState(
    createFoodLog,
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
        Tambah Makanan
      </Button>
    );
  }

  return (
    <Card className="max-w-2xl" title="Tambah Makanan">
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
        <Input label="Nama Makanan" id="food_name" name="food_name" required />
        <Select
          label="Jenis Makan"
          id="meal_type"
          name="meal_type"
          required
          defaultValue="breakfast"
        >
          <option value="breakfast">Sarapan</option>
          <option value="lunch">Makan Siang</option>
          <option value="dinner">Makan Malam</option>
          <option value="snack">Camilan</option>
        </Select>
        <Input
          label="Porsi (gram)"
          id="serving_size"
          name="serving_size"
          type="number"
          step="0.1"
          min="0"
        />
        <Input label="Kalori" id="calories" name="calories" type="number" min="0" />
        <Input
          label="Protein (g)"
          id="protein"
          name="protein"
          type="number"
          step="0.1"
          min="0"
        />
        <Input
          label="Karbohidrat (g)"
          id="carbohydrates"
          name="carbohydrates"
          type="number"
          step="0.1"
          min="0"
        />
        <Input label="Lemak (g)" id="fat" name="fat" type="number" step="0.1" min="0" />
        <Input
          label="Serat (g)"
          id="fiber"
          name="fiber"
          type="number"
          step="0.1"
          min="0"
        />
        <Input
          label="Gula (g)"
          id="sugar"
          name="sugar"
          type="number"
          step="0.1"
          min="0"
        />
        <Input
          label="Waktu Konsumsi"
          id="consumed_at"
          name="consumed_at"
          type="datetime-local"
          required
          defaultValue={nowForDateTimeLocal()}
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
