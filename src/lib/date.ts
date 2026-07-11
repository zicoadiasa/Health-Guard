export function todayRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return {
    startISO: start.toISOString(),
    endISO: end.toISOString(),
    dateStr: start.toISOString().slice(0, 10),
  };
}
