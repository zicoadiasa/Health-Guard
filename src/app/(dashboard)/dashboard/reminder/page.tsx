import { createClient } from "@/lib/supabase/server";
import ReminderForm from "@/components/reminder/ReminderForm";
import ReminderList from "@/components/reminder/ReminderList";
import Card from "@/components/ui/Card";
import PageHeading from "@/components/ui/PageHeading";
import IconChip from "@/components/ui/IconChip";
import { translateReminderType } from "@/lib/labels";

export default async function ReminderPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: entries } = await supabase
    .from("reminders")
    .select("id, title, reminder_type, reminder_time, status")
    .eq("user_id", user.id)
    .order("reminder_time", { ascending: true });

  const allReminders = entries ?? [];
  const activeReminders = allReminders.filter((entry) => entry.status === "active");

  const now = new Date();
  const nextReminder = activeReminders
    .filter((entry) => new Date(entry.reminder_time) >= now)
    .sort((a, b) => new Date(a.reminder_time).getTime() - new Date(b.reminder_time).getTime())[0];

  const insightSentence = nextReminder
    ? `Reminder berikutnya: ${nextReminder.title} (${translateReminderType(nextReminder.reminder_type)}) pada ${new Date(
        nextReminder.reminder_time
      ).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}.`
    : activeReminders.length > 0
      ? `Kamu punya ${activeReminders.length} reminder aktif.`
      : "Belum ada reminder aktif. Yuk atur pengingat pertamamu.";

  return (
    <div className="space-y-6">
      <PageHeading>Reminder</PageHeading>

      <Card>
        <div className="flex items-center gap-4">
          <IconChip name="bell" bg="bg-purple-50" color="text-purple-600" />
          <p className="text-sm text-gray-700">{insightSentence}</p>
        </div>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Daftar Reminder</h2>
        <ReminderList entries={allReminders} />
      </div>

      <ReminderForm />
    </div>
  );
}
