export type FoodReferenceItem = {
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  sugar: number;
  glycemicIndex: string;
  diabetesSuitability: string;
};

// Sumber: Kemenkes RI / PERKENI, dikurasi manual oleh pengguna aplikasi.
export const foodReferenceData: FoodReferenceItem[] = [
  { name: "Nasi Putih", calories: 180, protein: 3.0, carbohydrates: 39.8, fat: 0.3, sugar: 0.1, glycemicIndex: "Tinggi", diabetesSuitability: "Tipe 1 (Wajib Insulin) / Batasi Tipe 2" },
  { name: "Beras Merah Matang", calories: 149, protein: 2.8, carbohydrates: 32.5, fat: 0.4, sugar: 0.0, glycemicIndex: "Rendah", diabetesSuitability: "Sangat Baik untuk Semua Tipe" },
  { name: "Oatmeal Bubur", calories: 68, protein: 2.4, carbohydrates: 12.0, fat: 1.4, sugar: 0.2, glycemicIndex: "Rendah", diabetesSuitability: "Sangat Baik untuk Semua Tipe" },
  { name: "Jagung Rebus", calories: 108, protein: 3.3, carbohydrates: 25.0, fat: 1.3, sugar: 3.4, glycemicIndex: "Sedang", diabetesSuitability: "Baik (Perhatikan Porsi)" },
  { name: "Roti Gandum", calories: 247, protein: 9.1, carbohydrates: 41.3, fat: 4.2, sugar: 4.3, glycemicIndex: "Sedang", diabetesSuitability: "Baik untuk Semua Tipe" },
  { name: "Roti Putih", calories: 265, protein: 9.0, carbohydrates: 49.0, fat: 3.2, sugar: 5.0, glycemicIndex: "Tinggi", diabetesSuitability: "Batasi untuk Semua Tipe" },
  { name: "Tempe Rebus", calories: 150, protein: 14.0, carbohydrates: 9.1, fat: 7.7, sugar: 0.0, glycemicIndex: "Rendah", diabetesSuitability: "Sangat Baik untuk Semua Tipe" },
  { name: "Tempe Goreng", calories: 210, protein: 12.5, carbohydrates: 11.0, fat: 15.2, sugar: 0.0, glycemicIndex: "Rendah", diabetesSuitability: "Baik (Batasi karena Minyak)" },
  { name: "Tahu Putih", calories: 76, protein: 8.1, carbohydrates: 1.9, fat: 4.8, sugar: 0.0, glycemicIndex: "Rendah", diabetesSuitability: "Sangat Baik untuk Semua Tipe" },
  { name: "Dada Ayam Rebus", calories: 150, protein: 31.0, carbohydrates: 0.0, fat: 3.2, sugar: 0.0, glycemicIndex: "Rendah (0)", diabetesSuitability: "Sangat Baik (Sumber Protein)" },
  { name: "Telur Rebus", calories: 155, protein: 12.6, carbohydrates: 1.1, fat: 10.6, sugar: 1.1, glycemicIndex: "Rendah (0)", diabetesSuitability: "Sangat Baik untuk Semua Tipe" },
  { name: "Ikan Kembung Bakar", calories: 164, protein: 22.0, carbohydrates: 0.0, fat: 8.0, sugar: 0.0, glycemicIndex: "Rendah (0)", diabetesSuitability: "Sangat Baik (Tinggi Omega-3)" },
  { name: "Daging Sapi Tanpa Lemak", calories: 250, protein: 26.0, carbohydrates: 0.0, fat: 15.0, sugar: 0.0, glycemicIndex: "Rendah (0)", diabetesSuitability: "Baik (Konsumsi Secukupnya)" },
  { name: "Bayam Rebus", calories: 23, protein: 3.0, carbohydrates: 4.0, fat: 0.4, sugar: 0.4, glycemicIndex: "Rendah", diabetesSuitability: "Sangat Bebas Konsumsi" },
  { name: "Brokoli Kukus", calories: 35, protein: 2.4, carbohydrates: 7.0, fat: 0.4, sugar: 1.7, glycemicIndex: "Rendah", diabetesSuitability: "Sangat Bebas Konsumsi" },
  { name: "Buncis Rebus", calories: 35, protein: 1.9, carbohydrates: 7.9, fat: 0.1, sugar: 3.3, glycemicIndex: "Rendah", diabetesSuitability: "Sangat Baik untuk Tipe 2" },
  { name: "Wortel Rebus", calories: 35, protein: 0.8, carbohydrates: 8.3, fat: 0.2, sugar: 3.5, glycemicIndex: "Sedang", diabetesSuitability: "Baik untuk Semua Tipe" },
  { name: "Apel Fuji (dengan kulit)", calories: 52, protein: 0.3, carbohydrates: 13.8, fat: 0.2, sugar: 10.4, glycemicIndex: "Rendah", diabetesSuitability: "Baik (Maksimal 1 Buah)" },
  { name: "Alpukat", calories: 160, protein: 2.0, carbohydrates: 8.5, fat: 14.7, sugar: 0.7, glycemicIndex: "Rendah", diabetesSuitability: "Sangat Baik (Lemak Sehat)" },
  { name: "Pisang Ambon", calories: 92, protein: 1.0, carbohydrates: 25.8, fat: 0.3, sugar: 12.2, glycemicIndex: "Sedang", diabetesSuitability: "Batasi Porsi (Maksimal 1/2 Buah)" },
  { name: "Pepaya", calories: 43, protein: 0.5, carbohydrates: 10.8, fat: 0.3, sugar: 7.8, glycemicIndex: "Sedang", diabetesSuitability: "Baik (Porsi Sedang)" },
  { name: "Susu Sapi Low Fat", calories: 42, protein: 3.4, carbohydrates: 5.0, fat: 1.0, sugar: 5.0, glycemicIndex: "Rendah", diabetesSuitability: "Baik untuk Semua Tipe" },
  { name: "Susu Kental Manis", calories: 321, protein: 8.0, carbohydrates: 55.0, fat: 10.0, sugar: 54.0, glycemicIndex: "Tinggi", diabetesSuitability: "DILARANG untuk Diabetes" },
  { name: "Minyak Zaitun", calories: 884, protein: 0.0, carbohydrates: 0.0, fat: 100.0, sugar: 0.0, glycemicIndex: "Rendah (0)", diabetesSuitability: "Sangat Baik untuk Sensitivitas Insulin" },
];

export function searchFoodReference(query: string, limit = 8): FoodReferenceItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return foodReferenceData
    .filter((item) => item.name.toLowerCase().includes(q))
    .slice(0, limit);
}

export function glycemicIndexVariant(value: string): "success" | "warning" | "danger" {
  if (value.includes("Tinggi")) return "danger";
  if (value.includes("Sedang")) return "warning";
  return "success";
}
