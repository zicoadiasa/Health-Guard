"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import Input from "@/components/ui/Input";
import {
  searchFoodReference,
  type FoodReferenceItem,
} from "@/lib/nutrition/food-reference";

export type FoodReferenceSearchHandle = {
  reset: () => void;
};

type FoodReferenceSearchProps = {
  id: string;
  name: string;
  onSelect: (item: FoodReferenceItem) => void;
};

const FoodReferenceSearch = forwardRef<FoodReferenceSearchHandle, FoodReferenceSearchProps>(
  function FoodReferenceSearch({ id, name, onSelect }, ref) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      reset: () => setQuery(""),
    }));

    const results = query.trim().length >= 2 ? searchFoodReference(query) : [];

    return (
      <div className="relative">
        <Input
          label="Nama Makanan"
          id={id}
          name={name}
          required
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        />
        {isOpen && results.length > 0 && (
          <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
            {results.map((item) => (
              <li key={item.name}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50"
                  onMouseDown={() => {
                    setQuery(item.name);
                    onSelect(item);
                    setIsOpen(false);
                  }}
                >
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.calories} kkal</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default FoodReferenceSearch;
