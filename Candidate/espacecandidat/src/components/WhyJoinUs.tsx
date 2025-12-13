import { Heart, Zap, Users, Rocket, Trophy, GraduationCap } from "lucide-react";
import { Card } from "../components/ui/card";

const benefits = [
  {
    icon: Heart,
    title: "Work-Life Balance",
    description: "Flexible hours and remote options to help you maintain a healthy balance"
  },
  {
    icon: Zap,
    title: "Fast Growth",
    description: "Rapid career progression with clear paths and mentorship programs"
  },
  {
    icon: Users,
    title: "Great Team",
    description: "Collaborate with talented professionals from around the world"
  },
  {
    icon: Rocket,
    title: "Innovation First",
    description: "Work on cutting-edge projects that shape the future"
  },
  {
    icon: Trophy,
    title: "Competitive Salary",
    description: "Market-leading compensation with equity options and bonuses"
  },
  {
    icon: GraduationCap,
    title: "Learning Budget",
    description: "Annual budget for courses, conferences, and professional development"
  }
];

const WhyJoinUs = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Why Join Us?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're building something special, and we want you to be part of it. Here's what makes us different.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinUs;
