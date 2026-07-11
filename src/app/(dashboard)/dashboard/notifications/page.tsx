import { createClient } from "@/lib/supabase/server";
import { markNotificationAsRead } from "@/actions/notifications/mark-as-read";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import PageHeading from "@/components/ui/PageHeading";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";

export default async function NotificationsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: entries } = user
    ? await supabase
        .from("notifications")
        .select("id, notification_type, title, message, status, sent_at")
        .eq("user_id", user.id)
        .order("sent_at", { ascending: false })
    : { data: [] };

  const unreadCount =
    entries?.filter((entry) => entry.status === "unread").length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <PageHeading>Notifications</PageHeading>
        {unreadCount > 0 && (
          <Badge variant="danger">{unreadCount} baru</Badge>
        )}
      </div>

      <div className="max-w-2xl space-y-3">
        {!entries || entries.length === 0 ? (
          <Card>
            <EmptyState message="Tidak ada notifikasi." />
          </Card>
        ) : (
          entries.map((entry) => (
            <Card
              key={entry.id}
              className={`flex items-start justify-between gap-4 ${
                entry.status === "unread" ? "border-l-4 border-red-600" : ""
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="neutral">
                    {entry.notification_type.replaceAll("_", " ")}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    {entry.sent_at
                      ? new Date(entry.sent_at).toLocaleString("id-ID")
                      : "-"}
                  </span>
                </div>
                <h3 className="mt-1 font-medium text-gray-900">{entry.title}</h3>
                <p className="mt-0.5 text-sm text-gray-600">{entry.message}</p>
              </div>
              {entry.status === "unread" && (
                <form action={markNotificationAsRead.bind(null, entry.id)}>
                  <Button type="submit" variant="secondary">
                    Tandai Dibaca
                  </Button>
                </form>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
