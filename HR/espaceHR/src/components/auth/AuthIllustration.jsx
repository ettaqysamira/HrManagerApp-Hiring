import { Users, Building2, FileText, CalendarDays, BarChart3 } from "lucide-react";

const AuthIllustration = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-hr-teal-light blur-3xl" />
        <div className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-hr-teal blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-primary-foreground blur-2xl" />
      </div>

      <div className="relative z-10">
        <div className="relative">
          <div className="w-40 h-40 rounded-3xl gradient-hr shadow-glow flex items-center justify-center animate-float">
            <Users className="w-20 h-20 text-primary-foreground" strokeWidth={1.5} />
          </div>
          
          <div className="absolute -top-8 -right-12 w-16 h-16 rounded-2xl bg-card shadow-soft flex items-center justify-center animate-float" style={{ animationDelay: "0.5s" }}>
            <Building2 className="w-8 h-8 text-hr-teal" strokeWidth={1.5} />
          </div>
          
          <div className="absolute -bottom-6 -left-14 w-14 h-14 rounded-xl bg-card shadow-soft flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
            <FileText className="w-7 h-7 text-hr-navy" strokeWidth={1.5} />
          </div>
          
          <div className="absolute top-1/2 -right-20 w-12 h-12 rounded-lg bg-card shadow-soft flex items-center justify-center animate-float" style={{ animationDelay: "1.5s" }}>
            <CalendarDays className="w-6 h-6 text-hr-teal" strokeWidth={1.5} />
          </div>
          
          <div className="absolute -top-4 -left-16 w-10 h-10 rounded-lg bg-hr-teal shadow-soft flex items-center justify-center animate-float" style={{ animationDelay: "2s" }}>
            <BarChart3 className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      
      <div className="absolute bottom-16 left-0 right-0 text-center px-8">
        <h2 className="text-3xl font-heading font-semibold text-primary-foreground mb-3 animate-fade-in">
          HR Dashboard
        </h2>
        <p className="text-primary-foreground/80 font-body text-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Gérez vos ressources humaines efficacement
        </p>
      </div>

     
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-foreground" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default AuthIllustration;
