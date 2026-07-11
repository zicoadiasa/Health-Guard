type MetricVariant = "success" | "warning" | "danger" | "neutral";

export function calculateBMI(
  weightKg: number | null,
  heightCm: number | null
): number | null {
  if (!weightKg || !heightCm) return null;
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export function getBMICategory(bmi: number | null): {
  label: string;
  variant: MetricVariant;
} {
  if (bmi === null) return { label: "-", variant: "neutral" };
  if (bmi < 18.5) return { label: "Kurus", variant: "warning" };
  if (bmi < 25) return { label: "Normal", variant: "success" };
  if (bmi < 30) return { label: "Berlebih", variant: "warning" };
  return { label: "Obesitas", variant: "danger" };
}

export function getBloodSugarStatus(level: number | null): {
  label: string;
  variant: MetricVariant;
} {
  if (level === null) return { label: "-", variant: "neutral" };
  if (level < 70) return { label: "Rendah", variant: "warning" };
  if (level <= 140) return { label: "Normal", variant: "success" };
  return { label: "Tinggi", variant: "danger" };
}

export function calculateIdealWeightRange(
  heightCm: number | null
): { min: number; max: number } | null {
  if (!heightCm) return null;
  const heightM = heightCm / 100;
  const min = Math.round(18.5 * heightM * heightM);
  const max = Math.round(24.9 * heightM * heightM);
  return { min, max };
}

export function getHealthSummarySentence(
  bmiCategory: { label: string; variant: MetricVariant },
  activityLevel: string | null
): string {
  const bmiPart =
    bmiCategory.variant === "success"
      ? "BMI kamu berada pada rentang normal."
      : bmiCategory.variant === "warning"
        ? `BMI kamu tergolong ${bmiCategory.label.toLowerCase()}, perlu sedikit perhatian lebih.`
        : bmiCategory.variant === "danger"
          ? `BMI kamu tergolong ${bmiCategory.label.toLowerCase()}, sebaiknya mulai jaga pola makan dan aktivitas.`
          : "Lengkapi tinggi dan berat badan untuk melihat kondisi tubuhmu.";

  const activityPart =
    activityLevel === "sedentary"
      ? "Yuk mulai gerak lebih banyak, minimal jalan kaki 30 menit per hari."
      : "Pertahankan aktivitas fisik minimal 30 menit per hari.";

  return `${bmiPart} ${activityPart}`;
}
