const genderLabels: Record<string, string> = {
  male: "Laki-laki",
  female: "Perempuan",
};

const activityLevelLabels: Record<string, string> = {
  sedentary: "Tidak Aktif",
  light: "Ringan",
  moderate: "Sedang",
  active: "Aktif",
  very_active: "Sangat Aktif",
};

const diabetesTypeLabels: Record<string, string> = {
  type_1: "Tipe 1",
  type_2: "Tipe 2",
  prediabetes: "Prediabetes",
  gestational: "Diabetes Gestasional",
};

const mealTypeLabels: Record<string, string> = {
  breakfast: "Sarapan",
  lunch: "Makan Siang",
  dinner: "Makan Malam",
  snack: "Camilan",
};

export function translateGender(value: string | null): string {
  if (!value) return "-";
  return genderLabels[value] ?? value;
}

export function translateActivityLevel(value: string | null): string {
  if (!value) return "-";
  return activityLevelLabels[value] ?? value;
}

export function translateDiabetesType(value: string | null): string {
  if (!value) return "-";
  return diabetesTypeLabels[value] ?? value;
}

export function translateMealType(value: string | null): string {
  if (!value) return "-";
  return mealTypeLabels[value] ?? value;
}
