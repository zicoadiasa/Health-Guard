import Badge from "@/components/ui/Badge";
import {
  glycemicIndexVariant,
  isRiskyForDiabetes,
  getHealthierAlternatives,
  type FoodReferenceItem,
} from "@/lib/nutrition/food-reference";

type FoodReferenceInfoProps = {
  item: FoodReferenceItem;
  onSelectAlternative?: (item: FoodReferenceItem) => void;
};

export default function FoodReferenceInfo({ item, onSelectAlternative }: FoodReferenceInfoProps) {
  const isForbidden = item.diabetesSuitability.includes("DILARANG");
  const alternatives = isRiskyForDiabetes(item) ? getHealthierAlternatives(item) : [];

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

      {alternatives.length > 0 && (
        <div className="mt-2 border-t border-red-100 pt-2">
          <p className="text-xs font-medium text-gray-600">Alternatif yang lebih sehat:</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {alternatives.map((alt) => (
              <button
                key={alt.name}
                type="button"
                onClick={() => onSelectAlternative?.(alt)}
                className="rounded-full border border-green-300 bg-white px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-50"
              >
                {alt.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
