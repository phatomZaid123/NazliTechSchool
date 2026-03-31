import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff } from "lucide-react";

interface VisibilityPillProps {
  visible: boolean;
}

export function VisibilityPill({ visible }: VisibilityPillProps) {
  return (
    <Badge
      variant="outline"
      className={`border-border/30 gap-1 ${
        visible
          ? "bg-emerald-500/10 text-emerald-300"
          : "bg-gray-500/10 text-gray-300"
      }`}
    >
      {visible ? (
        <>
          <Eye className="h-3 w-3" />
          Visible
        </>
      ) : (
        <>
          <EyeOff className="h-3 w-3" />
          Hidden
        </>
      )}
    </Badge>
  );
}
