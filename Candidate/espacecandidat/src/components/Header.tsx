import { Button } from "../components/ui/button";
import { Briefcase } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
         
          <span className="text-xl font-bold">RH Flow</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#positions" className="text-sm font-medium hover:text-primary transition-colors">
            Postes ouverts
           
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
             Mes candidatures
          </a>
        </nav>

        <Button variant="default" className="font-semibold">
          Créer un profil
        </Button>
      </div>
    </header>
  );
};
