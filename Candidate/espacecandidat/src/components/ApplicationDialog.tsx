import { useState } from "react";
import { X, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";

import CandidateService from "../services/candidate.service";

interface ApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle: string;
  jobId: number | null;
}

export const ApplicationDialog = ({
  open,
  onOpenChange,
  jobTitle,
  jobId,
}: ApplicationDialogProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [fileName, setFileName] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      toast.error("Please upload your resume.");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("FullName", `${firstName} ${lastName}`);
      formData.append("Email", email);
      if (jobId) {
        formData.append("JobOfferId", jobId.toString());
      }
      formData.append("Resume", resumeFile);

      await CandidateService.apply(formData);

      toast.success("Application submitted successfully!");
      onOpenChange(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setCoverLetter("");
      setFileName("");
      setResumeFile(null);
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Apply for {jobTitle}
          </DialogTitle>
          <DialogDescription className="text-base">
            Fill out the form below to submit your application.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="Samira"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="ETTAQY"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="samiraettaqy@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume" className="text-sm font-medium">
              Resume/CV
            </Label>
            <div className="relative">
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="sr-only"
                required
              />
              <label
                htmlFor="resume"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
              >
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  {fileName || "Drop your resume here or click to browse"}
                </span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter" className="text-sm font-medium">
              Cover Letter <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Textarea
              id="coverLetter"
              placeholder="Tell us why you're a great fit..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button type="submit" className="px-6 font-semibold">
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
