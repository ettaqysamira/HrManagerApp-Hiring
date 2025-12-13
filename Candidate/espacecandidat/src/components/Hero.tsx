import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import heroImage from "../assets/téléchargement.png";

export const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-overlay))]/95 via-[hsl(var(--hero-bg))]/90 to-[hsl(var(--hero-bg))]/85" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-block bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Nous recrutons
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Construisez l’avenir du{" "}
          <span className="text-primary">travail</span>
          <br />
          avec nous
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl"
        >
          Rejoignez une équipe de personnes passionnées qui travaillent à résoudre des problèmes complexes. 
          Trouvez votre prochain poste et développez votre carrière.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 max-w-2xl items-center"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher des postes..."
              className="pl-12 h-12 text-base bg-white border-0 shadow-lg"
            />
          </div>
          <Button 
            size="lg" 
            className="h-12 px-8 text-base font-semibold whitespace-nowrap w-full sm:w-auto"
          >
            Rechercher un emploi
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
