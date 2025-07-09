import type { LucideIcon } from "lucide-react";
import { useRef, useEffect, useState } from "react";

type StatCardProps = {
  title: string;
  count: string | number;
  icon: LucideIcon;
  backgroundColor: string;
  onClick?: () => void;
  selected?: boolean;
};

// Category Card component with Counter
const StatCard: React.FC<StatCardProps> = ({
  title,
  count,
  icon: Icon,
  backgroundColor,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  // Set minimum width to disply title fo category and icon, otherwise only numbers with colored background
  const [showDetails, setShowDetails] = useState(true);

  // On mount, observe the card element's size and toggle UI details based on its width.
  // This enables responsive behavior (hiding title and icon).
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      // Show details only if card is wider than 100px
      setShowDetails(width > 100);
    });

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`
        rounded-xl shadow p-4 h-24 flex items-stretch transition-all duration-200
        ${showDetails ? "justify-between" : "justify-center"}
        ${backgroundColor}
        cursor-pointer hover:brightness-110
      `}
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
