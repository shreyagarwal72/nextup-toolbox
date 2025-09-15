import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  comingSoon?: boolean;
}

const ToolCard = ({ title, description, icon: Icon, onClick, comingSoon = false }: ToolCardProps) => {
  return (
    <div className="tool-card group">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <Button 
          onClick={onClick}
          disabled={comingSoon}
          variant={comingSoon ? "secondary" : "default"}
          className="btn-hero flex-1 mr-2"
        >
          {comingSoon ? "Coming Soon" : "Use Tool"}
        </Button>
        {comingSoon && (
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
            Soon
          </span>
        )}
      </div>
    </div>
  );
};

export default ToolCard;