"use client";

import { useActionState, useState } from "react";
import {
  updateHealthProfile,
  type UpdateHealthProfileState,
} from "@/actions/health-profile/update";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import IconChip from "@/components/ui/IconChip";
import {
  calculateBMI,
  getBMICategory,
  calculateIdealWeightRange,
  getHealthSummarySentence,
} from "@/lib/health-metrics";
import {
  translateGender,
  translateActivityLevel,
  translateDiabetesType,
} from "@/lib/labels";

const initialState: UpdateHealthProfileState = { error: null, success: false };

type HealthProfileFormProps = {
  gender: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  diabetes_type: string | null;
  activity_level: string | null;
  updated_at: string | null;
};

export default function HealthProfileForm({
  gender,
  height_cm,
  weight_kg,
  diabetes_type,
  activity_level,
  updated_at,
}: HealthProfileFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateHealthProfile,
    initialState
  );
  const [isEditing, setIsEditing] = useState(false);

  const bmi = calculateBMI(weight_kg, height_cm);
  const bmiCategory = getBMICategory(bmi);
  const idealWeight = calculateIdealWeightRange(height_cm);
  const summarySentence = getHealthSummarySentence(bmiCategory, activity_level);

  return (
    <Card>
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h2 className="text-lg font-semibold text-gray-900">Informasi Kesehatan</h2>
        <Button
          type="button"
          variant="secondary"
          className="gap-2"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? (
            "Batal"
          ) : (
            <>
              <Icon name="pencil" className="h-4 w-4" />
              Edit
            </>
          )}
        </Button>
      </div>

      {!isEditing ? (
        <div className="pt-4">
          <p className="mb-5 text-sm text-gray-700">{summarySentence}</p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">BMI Kamu</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{bmi ?? "-"}</p>
            </div>
            {bmi !== null && <Badge variant={bmiCategory.variant}>{bmiCategory.label}</Badge>}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <IconChip name="ruler" bg="bg-blue-50" color="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Tinggi</p>
                <p className="font-medium text-gray-900">
                  {height_cm ? `${height_cm} cm` : "-"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IconChip name="scale" bg="bg-blue-50" color="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Berat</p>
                <p className="font-medium text-gray-900">
                  {weight_kg ? `${weight_kg} kg` : "-"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IconChip name="target" bg="bg-purple-50" color="text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Berat Ideal</p>
                <p className="font-medium text-gray-900">
                  {idealWeight ? `${idealWeight.min}-${idealWeight.max} kg` : "-"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IconChip name="check" bg="bg-gray-100" color="text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium text-gray-900">{translateGender(gender)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IconChip name="activity" bg="bg-green-50" color="text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Aktivitas</p>
                <p className="font-medium text-gray-900">
                  {translateActivityLevel(activity_level)}
                </p>
              </div>
            </div>

            {diabetes_type && (
              <div className="flex items-center gap-3">
                <IconChip name="droplet" bg="bg-red-50" color="text-red-600" />
                <div>
                  <p className="text-sm text-gray-500">Tipe Diabetes</p>
                  <p className="font-medium text-gray-900">
                    {translateDiabetesType(diabetes_type)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {updated_at && (
            <p className="mt-6 text-xs text-gray-400">
              Terakhir diperbarui:{" "}
              {new Date(updated_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      ) : (
        <form action={formAction} className="space-y-4 pt-4">
          {state.success && (
            <Alert variant="success">Informasi kesehatan berhasil diperbarui.</Alert>
          )}
          {state.error && <Alert variant="error">{state.error}</Alert>}

          <Select
            label="Gender"
            id="gender"
            name="gender"
            defaultValue={gender ?? ""}
            required
          >
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
          </Select>

          <Input
            label="Tinggi (cm)"
            id="height_cm"
            name="height_cm"
            type="number"
            step="0.1"
            min="0"
            defaultValue={height_cm ?? ""}
          />

          <Input
            label="Berat (kg)"
            id="weight_kg"
            name="weight_kg"
            type="number"
            step="0.1"
            min="0"
            defaultValue={weight_kg ?? ""}
          />

          <Select
            label="Tipe Diabetes"
            id="diabetes_type"
            name="diabetes_type"
            defaultValue={diabetes_type ?? ""}
          >
            <option value="">-</option>
            <option value="type_1">Tipe 1</option>
            <option value="type_2">Tipe 2</option>
            <option value="prediabetes">Prediabetes</option>
            <option value="gestational">Diabetes Gestasional</option>
          </Select>

          <Select
            label="Tingkat Aktivitas"
            id="activity_level"
            name="activity_level"
            defaultValue={activity_level ?? ""}
            required
          >
            <option value="sedentary">Tidak Aktif</option>
            <option value="light">Ringan</option>
            <option value="moderate">Sedang</option>
            <option value="active">Aktif</option>
            <option value="very_active">Sangat Aktif</option>
          </Select>

          <div className="flex gap-3">
            <Button type="submit" disabled={isPending} className="flex-1">
              {isPending ? "Menyimpan..." : "Simpan"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
              {state.success ? "Selesai" : "Batal"}
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
}
