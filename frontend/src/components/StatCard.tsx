import type { LucideIcon } from "lucide-react";
import { useRef, useEffect, useState } from "react";

type StatCardProps = {
  title: string;
  count: string | number;
  icon: LucideIcon;
  backgroundColor: string;
  onClick?: () => void;
};

// Stat Card with Counter
const StatCard: React.FC<StatCardProps> = ({
  title,
  count,
  icon: Icon,
  backgroundColor,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setShowDetails(width > 100);
    });

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      onClick={onClick}
      ref={cardRef}
      className={`rounded-xl shadow p-4 h-24 flex items-stretch ${showDetails ? "justify-between" : "justify-center"
        } ${backgroundColor}`}
    >
      {showDetails && (
        <div className="flex flex-col justify-center gap-2 text-white">
          <Icon className="w-8 h-8" />
          <span className="text-sm">{title}</span>
        </div>
      )}

      <div
        className={`flex items-center text-white font-semibold text-[5rem] h-full ${showDetails ? "ml-auto" : ""
          }`}
      >
        {count}
      </div>
    </div>
  );
};

export default StatCard;