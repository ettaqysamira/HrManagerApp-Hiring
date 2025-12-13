import { Briefcase, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Carrières</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecter les talents aux opportunités. Nous vous aidons à trouver l’emploi de vos rêves et à construire la carrière que vous méritez.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Plateforme</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Parcourir les offres
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Profil candidat
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Mes candidatures
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  À propos de nous
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Notre équipe
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Carrières
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Réseaux</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Careers Inc. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Conditions d’utilisation
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Politique des cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
