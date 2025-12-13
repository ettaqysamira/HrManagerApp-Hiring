import { useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { JobCard } from "../components/JobCard";
import { ApplicationDialog } from "../components/ApplicationDialog";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import OurValues from "../components/OurValues";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import { Animation } from "../components/ui/animation";


const jobs = [
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



const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");

  const handleApply = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      <Animation>
        <section id="positions" className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Open Positions</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <JobCard
                key={job.id}
                {...job}
                index={index}
                onApply={() => handleApply(job.title)}
              />
            ))}
          </div>
        </section>
      </Animation>

      <Animation><OurValues /></Animation>
      <Animation><Testimonials /></Animation>
      <Animation><FAQ /></Animation>
      <Animation><Footer /></Animation>

      <ApplicationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        jobTitle={selectedJob}
      />
    </div>
  );
};

export default Index;
