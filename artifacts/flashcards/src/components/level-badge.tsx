import { cn } from "@/lib/utils";
import type { FlashcardLevel } from "@workspace/api-client-react/src/generated/api.schemas";

export function LevelBadge({ level, className }: { level: FlashcardLevel | string; className?: string }) {
  const styles = {
    A1: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
    A2: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
    B1: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
    B2: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
    C1: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800",
  };

  const levelStr = level as keyof typeof styles;
  const badgeStyle = styles[levelStr] || "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border",
        badgeStyle,
        className
      )}
    >
      {level}
    </span>
  );
}
