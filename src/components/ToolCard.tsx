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
    <div 
      className={`tool-card group ${comingSoon ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={!comingSoon ? onClick : undefined}
    >
      {/* Decorative gradient orb */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="icon-glass w-fit mb-4">
          <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
        </div>
        
        {/* Content */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>
        
        {/* Action */}
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium transition-colors duration-300 ${
            comingSoon 
              ? 'text-muted-foreground' 
              : 'text-primary group-hover:text-primary-dark'
          }`}>
            {comingSoon ? "Coming Soon" : "Use Tool →"}
          </span>
          
          {comingSoon && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
              Soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
