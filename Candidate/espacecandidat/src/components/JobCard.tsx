import { motion } from "framer-motion";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

interface JobCardProps {
  category: string;
  title: string;
  description: string;
  location: string;
  type: string;
  postedAt: string;
  onApply: () => void;
  index?: number;
}

export const JobCard = ({
  category,
  title,
  description,
  location,
  type,
  postedAt,
  onApply,
  index,
}: JobCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index || 0) * 0.1 }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20 h-full hover:border-l-4 hover:border-l-primary">
        <CardHeader>
          <Badge variant="secondary" className="w-fit mb-3 text-xs">
            {category}
          </Badge>
          <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-base leading-relaxed line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-primary" />
              <span>{type}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              <span>{postedAt}</span>
            </div>
          </div>
          <Button
            onClick={onApply}
            variant="ghost"
            className="w-full group/btn text-primary hover:text-primary hover:bg-primary/5 font-semibold"
          >
            Apply Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
