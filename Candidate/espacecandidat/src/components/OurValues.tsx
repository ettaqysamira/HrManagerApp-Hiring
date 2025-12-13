import { Target, Lightbulb, HandshakeIcon, Sparkles } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Guidé par la mission",
    description: "Chaque décision que nous prenons est guidée par notre mission d’autonomiser les personnes grâce à la technologie. Nous mesurons le succès non seulement en chiffres, mais aussi par l’impact positif que nous créons."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Nous encourageons les idées audacieuses et la pensée créative. L’échec fait partie de l’apprentissage, et nous célébrons le courage d’essayer de nouvelles approches et de remettre en question le statu quo."
  },
  {
    icon: HandshakeIcon,
    title: "Collaboration",
    description: "Nous croyons que les meilleures solutions naissent de perspectives diverses. Nous favorisons un environnement inclusif où la voix de chacun est entendue et valorisée."
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description: "Nous nous engageons à offrir une qualité exceptionnelle dans tout ce que nous faisons. Nous sommes fiers de notre travail et nous nous efforçons continuellement d’élever le niveau."
  }
];

const OurValues = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Nos valeurs fondamentales</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ces principes guident tout ce que nous faisons et façonnent notre culture d’entreprise.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
