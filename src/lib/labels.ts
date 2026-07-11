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

const statusLabels: Record<string, string> = {
  active: "Aktif",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

const activityTypeLabels: Record<string, string> = {
  walking: "Jalan Kaki",
  running: "Lari",
  cycling: "Bersepeda",
  swimming: "Berenang",
  workout: "Latihan",
  yoga: "Yoga",
  other: "Lainnya",
};

const goalTypeLabels: Record<string, string> = {
  lose_weight: "Menurunkan Berat Badan",
  gain_weight: "Menambah Berat Badan",
  maintain_weight: "Menjaga Berat Badan",
  reduce_blood_sugar: "Menurunkan Gula Darah",
  increase_activity: "Meningkatkan Aktivitas",
  healthy_eating: "Pola Makan Sehat",
};

const reminderTypeLabels: Record<string, string> = {
  meal: "Makan",
  exercise: "Olahraga",
  blood_sugar: "Cek Gula Darah",
  medication: "Minum Obat",
  weight: "Cek Berat Badan",
  custom: "Lainnya",
};

const notificationTypeLabels: Record<string, string> = {
  reminder: "Reminder",
  ai_insight: "Insight AI",
  weekly_report: "Laporan Mingguan",
  achievement: "Pencapaian",
  system: "Sistem",
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

export function translateStatus(value: string | null): string {
  if (!value) return "-";
  return statusLabels[value] ?? value;
}

export function translateActivityType(value: string | null): string {
  if (!value) return "-";
  return activityTypeLabels[value] ?? value;
}

export function translateGoalType(value: string | null): string {
  if (!value) return "-";
  return goalTypeLabels[value] ?? value;
}

export function translateReminderType(value: string | null): string {
  if (!value) return "-";
  return reminderTypeLabels[value] ?? value;
}

export function translateNotificationType(value: string | null): string {
  if (!value) return "-";
  return notificationTypeLabels[value] ?? value;
}
