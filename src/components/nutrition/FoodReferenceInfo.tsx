import Badge from "@/components/ui/Badge";
import {
  glycemicIndexVariant,
  type FoodReferenceItem,
} from "@/lib/nutrition/food-reference";

type FoodReferenceInfoProps = {
  item: FoodReferenceItem;
};

export default function FoodReferenceInfo({ item }: FoodReferenceInfoProps) {
  const isForbidden = item.diabetesSuitability.includes("DILARANG");

  return (
    <div
      className={`sm:col-span-2 rounded-lg border px-3 py-2 text-sm ${
        isForbidden ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-gray-600">Indeks Glikemik:</span>
        <Badge variant={glycemicIndexVariant(item.glycemicIndex)}>{item.glycemicIndex}</Badge>
      </div>
      <p className={`mt-1 ${isForbidden ? "font-medium text-red-700" : "text-gray-600"}`}>
        {item.diabetesSuitability}
      </p>
    </div>
  );
}
