"use client";

import { useMemo, useState } from "react";
import { deleteFoodLog } from "@/actions/food-log/delete";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import IconChip from "@/components/ui/IconChip";
import EmptyState from "@/components/ui/EmptyState";
import { translateMealType } from "@/lib/labels";

type FoodLogEntry = {
  id: string;
  food_name: string;
  meal_type: string;
  calories: number | null;
  consumed_at: string;
};

type FoodLogListProps = {
  entries: FoodLogEntry[];
};

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDateHeading(dateKey: string) {
  const date = new Date(dateKey);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return "Hari Ini";
  if (isSameDay(date, yesterday)) return "Kemarin";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function FoodLogList({ entries }: FoodLogListProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return entries;
    const query = search.toLowerCase();
    return entries.filter((entry) => entry.food_name.toLowerCase().includes(query));
  }, [entries, search]);

  const grouped = useMemo(() => {
    const groups = new Map<string, FoodLogEntry[]>();
    for (const entry of filtered) {
      const dateKey = entry.consumed_at.slice(0, 10);
      const list = groups.get(dateKey) ?? [];
      list.push(entry);
      groups.set(dateKey, list);
    }
    return Array.from(groups.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [filtered]);

  return (
    <div className="space-y-4">
      <Input
        label="Cari Makanan"
        id="search_food"
        name="search_food"
        placeholder="Ketik nama makanan..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {grouped.length === 0 ? (
        <Card>
          <EmptyState
            message={
              search ? "Tidak ada makanan yang cocok." : "Belum ada catatan makan."
            }
            icon="flame"
          />
        </Card>
      ) : (
        grouped.map(([dateKey, dayEntries]) => (
          <div key={dateKey}>
            <h3 className="mb-2 text-sm font-semibold text-gray-600">
              {formatDateHeading(dateKey)}
            </h3>
            <div className="space-y-2">
              {dayEntries.map((entry) => (
                <Card key={entry.id} className="flex items-center gap-3 py-3">
                  <IconChip
                    name="flame"
                    bg="bg-orange-50"
                    color="text-orange-600"
                    size="h-10 w-10"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{entry.food_name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="neutral">{translateMealType(entry.meal_type)}</Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(entry.consumed_at).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {entry.calories ?? "-"} kkal
                  </p>
                  <form action={deleteFoodLog.bind(null, entry.id)}>
                    <button type="submit" className="text-sm text-red-600 hover:underline">
                      Hapus
                    </button>
                  </form>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
