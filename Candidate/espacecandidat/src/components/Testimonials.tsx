import { Card } from "../components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah ETTAQY",
    role: "Ingénieure Logicielle Senior",
    image: "https://marketplace.canva.com/gJly0/MAGDkMgJly0/1/tl/canva-user-profile-icon-vector.-avatar-or-person-icon.-profile-picture%2C-portrait-symbol.-MAGDkMgJly0.png",
    quote: "La meilleure décision de carrière que j’aie jamais prise. L’équipe est incroyablement solidaire et les projets sont stimulants de la meilleure façon possible."
  },
  {
    name: "Mohammed Tazi",
    role: "Designer Produit",
    image: "https://marketplace.canva.com/gJly0/MAGDkMgJly0/1/tl/canva-user-profile-icon-vector.-avatar-or-person-icon.-profile-picture%2C-portrait-symbol.-MAGDkMgJly0.png",
    quote: "La culture ici est incroyable. Tout le monde est passionné par ce qu’il fait et il y a un véritable esprit de collaboration entre toutes les équipes."
  },
  {
    name: "Sanae Kamal",
    role: "Responsable Marketing",
    image: "https://marketplace.canva.com/gJly0/MAGDkMgJly0/1/tl/canva-user-profile-icon-vector.-avatar-or-person-icon.-profile-picture%2C-portrait-symbol.-MAGDkMgJly0.png",
    quote: "J’ai énormément évolué dans mon rôle ici. L’entreprise investit dans votre développement et vous offre des opportunités pour diriger des projets porteurs de sens."
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Ce que dit notre équipe</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez les témoignages des personnes qui font la réussite de notre entreprise.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 relative">
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
