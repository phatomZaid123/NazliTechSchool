import { Badge } from "@/components/ui/badge";

type Status = "live" | "scheduled" | "draft" | "sent";

const statusStyles: Record<Status, { bg: string; text: string }> = {
  live: { bg: "bg-green-500/10", text: "text-green-300" },
  scheduled: { bg: "bg-blue-500/10", text: "text-blue-300" },
  draft: { bg: "bg-gray-500/10", text: "text-gray-300" },
  sent: { bg: "bg-emerald-500/10", text: "text-emerald-300" },
};

const statusLabels: Record<Status, string> = {
  live: "Live",
  scheduled: "Scheduled",
  draft: "Draft",
  sent: "Sent",
};

interface StatusPillProps {
  status: Status;
}

export function StatusPill({ status }: StatusPillProps) {
  const styles = statusStyles[status];
  const label = statusLabels[status];

  return (
    <Badge
      variant="outline"
      className={`border-border/30 ${styles.bg} ${styles.text}`}
    >
      {label}
    </Badge>
  );
}
