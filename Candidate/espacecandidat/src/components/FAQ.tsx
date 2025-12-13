import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    question: "Proposez-vous des stages ?",
    answer: "Oui ! Nous proposons des programmes de stage tout au long de l’année pour les étudiants et les jeunes diplômés. Les stages durent généralement de 3 à 6 mois et offrent une expérience pratique sur de vrais projets."
  },
  {
    question: "Quelle est votre politique de travail à distance ?",
    answer: "Nous offrons des options de travail à distance flexibles. De nombreux postes sont entièrement à distance, tandis que d’autres sont en mode hybride. Nous croyons qu’il faut offrir à notre équipe la flexibilité de travailler là où elle est la plus productive."
  },
  {
    question: "Combien de temps dure le processus de recrutement ?",
    answer: "Notre processus de recrutement dure généralement de 2 à 3 semaines, de la candidature initiale à l’offre finale. Nous avançons rapidement afin de respecter votre temps tout en garantissant une évaluation approfondie."
  },
  {
    question: "Parrainez-vous les visas de travail ?",
    answer: "Oui, nous parrainons les visas de travail pour les candidats qualifiés. Notre équipe RH vous accompagnera tout au long du processus si vous avez besoin d’un parrainage de visa."
  },
  {
    question: "Quels avantages proposez-vous ?",
    answer: "Nous proposons des avantages complets incluant l’assurance santé, des plans de retraite, un budget de formation, des congés payés flexibles, un congé parental et des programmes de bien-être. Les avantages varient selon le lieu et le niveau du poste."
  },
  {
    question: "Puis-je postuler à plusieurs postes ?",
    answer: "Absolument ! Si vous avez des compétences et des intérêts variés, n’hésitez pas à postuler à plusieurs postes correspondant à votre profil. Assurez-vous simplement d’adapter chaque candidature."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Questions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Vous avez des questions ? Nous avons les réponses.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
