import { Briefcase } from "lucide-react";

const BrandLogo = ({ variant = "dark" }: { variant?: "dark" | "light" }) => {
  return (
    <div className="flex items-center gap-2">
      <Briefcase className={variant === "light" ? "text-primary-foreground" : "text-primary"} size={24} />
      <span className={`text-xl font-bold ${variant === "light" ? "text-primary-foreground" : "gradient-brand-text"}`}>
        Hire-a-Helper
      </span>
    </div>
  );
};

export default BrandLogo;
