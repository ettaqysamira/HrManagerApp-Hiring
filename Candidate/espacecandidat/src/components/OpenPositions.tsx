import { Button } from "../components/ui/button";
import JobCard from "./JobCard";
import { Filter } from "lucide-react";

const positions = [
  {
    category: "Ingénierie",
    title: "Développeur Frontend Senior",
    description: "Nous recherchons un développeur Frontend expérimenté pour diriger nos initiatives UI/UX en utilisant React et Tailwind.",
    location: "Casablanca",
    type: "Temps plein",
    posted: "Il y a 2 jours"
  },
  {
    category: "Design",
    title: "Designer Produit",
    description: "Rejoignez notre équipe de design primée pour créer des expériences utilisateur belles et intuitives.",
    location: "Rabat",
    type: "Temps plein",
    posted: "Il y a 3 jours"
  },
  {
    category: "Ingénierie",
    title: "Ingénieur Backend (.NET)",
    description: "Aidez-nous à faire évoluer notre infrastructure backend et à construire des API robustes pour notre base d’utilisateurs en croissance.",
    location: "Tanger",
    type: "Contrat",
    posted: "Il y a 1 semaine"
  },
  {
    category: "Ressources humaines",
    title: "Spécialiste RH",
    description: "Gérer les processus de recrutement et garantir une excellente expérience candidat pour tous les postulants.",
    location: "Casablanca",
    type: "Temps partiel",
    posted: "Il y a 1 semaine"
  },
  {
    category: "Marketing",
    title: "Responsable Marketing",
    description: "Piloter notre stratégie de croissance et diriger des campagnes marketing globales sur tous les canaux.",
    location: "Salé",
    type: "Temps plein",
    posted: "Il y a 2 semaines"
  },
  {
    category: "Support",
    title: "Responsable de la Réussite Client",
    description: "Assurer la réussite et la croissance de nos clients grands comptes avec notre plateforme.",
    location: "Casablanca",
    type: "Temps plein",
    posted: "À l’instant"
  }
];



const OpenPositions = () => {
  return (
    <section id="positions" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-foreground">Postes ouverts</h2>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.map((position, index) => (
            <JobCard key={index} {...position} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenPositions;
