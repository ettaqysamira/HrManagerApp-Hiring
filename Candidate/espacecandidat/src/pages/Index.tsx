import { useState, useEffect } from "react";
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
import JobOfferService from "../services/jobOffer.service";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const responseData = await JobOfferService.getAll();
        console.log("Fetched jobs:", responseData);

        const rawData = Array.isArray(responseData) ? responseData : (responseData?.value || responseData?.data || []);

        const formattedJobs = rawData
          .filter((offer: any) => {
            const status = (offer.status || offer.Status || '').toLowerCase();
            return ['open', 'ouverte', 'ouvert'].includes(status);
          })
          .map((offer: any) => ({
            id: offer.id,
            category: "General",
            title: offer.title,
            description: offer.description,
            location: offer.location,
            type: "Temps plein",
            posted: new Date(offer.postedDate).toLocaleDateString(),
            requirements: offer.requirements
          }));

        setJobs(formattedJobs);
      } catch (error) {
        console.error("Failed to load jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const handleApply = (job: any) => {
    setSelectedJobId(job.id);
    setSelectedJobTitle(job.title);
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
            <h2 className="text-3xl md:text-4xl font-bold">Postes ouverts</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">Chargement des offres...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">Aucun poste ouvert pour le moment.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <JobCard
                  key={job.id}
                  category={job.category}
                  title={job.title}
                  description={job.description}
                  location={job.location}
                  type={job.type}
                  postedAt={job.posted}
                  index={index}
                  onApply={() => handleApply(job)}
                />
              ))}
            </div>
          )}
        </section>
      </Animation>

      <Animation><OurValues /></Animation>
      <Animation><Testimonials /></Animation>
      <Animation><FAQ /></Animation>
      <Animation><Footer /></Animation>

      <ApplicationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        jobTitle={selectedJobTitle}
        jobId={selectedJobId}
      />
    </div>
  );
};

export default Index;
