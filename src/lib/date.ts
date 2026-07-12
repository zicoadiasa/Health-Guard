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

export function weekAgoISO(): string {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return weekAgo.toISOString();
}

export function weekAgoDateStr(): string {
  return weekAgoISO().slice(0, 10);
}

export function weekAheadISO(): string {
  const weekAhead = new Date();
  weekAhead.setDate(weekAhead.getDate() + 7);
  return weekAhead.toISOString();
}

export function monthAgoISO(): string {
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  return monthAgo.toISOString();
}
