import { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  User, Mail, Phone, Building2, Briefcase, Calendar,
  UserCircle, Upload, X, Save, Lock, Eye, EyeOff
} from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/Select1";
import { toast } from "../../../hooks/use-toast";
import { cn } from "../../../utils/cn";
import { employeeApi } from "../../../services/api";

const departments = ["IT", "Marketing", "Finance", "RH", "Commercial", "Production"];
const contractTypes = ["CDI", "CDD", "Stage", "Alternance", "Freelance"];
const managers = ["Kamal Tazzi", "Salwa Kamal", "Omar Alaoui", "Fatima Benali"];
const statuses = ["Actif", "En Congé", "Période d'Essai", "Inactif"];

export function EmployeeForm({ onClose, onSubmit }) {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    trigger,
    reset
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      login: "",
      password: "",
      phone: "",
      department: "",
      position: "",
      contractType: "",
      manager: "",
      startDate: "",
      status: "Actif",
      birthDate: "",
      address: "",
      salary: "",
      photoUrl: ""
    },
    mode: "onChange"
  });

  const mapToBackendFormat = (frontendData) => {
    return {
      FirstName: frontendData.firstName,
      LastName: frontendData.lastName,
      Email: frontendData.email,
      Login: frontendData.login,
      Password: frontendData.password,
      Phone: frontendData.phone,
      Department: frontendData.department,
      Position: frontendData.position,
      ContractType: frontendData.contractType,
      Manager: frontendData.manager,
      StartDate: frontendData.startDate ? new Date(frontendData.startDate).toISOString() : null,
      Status: frontendData.status,
      BirthDate: frontendData.birthDate ? new Date(frontendData.birthDate).toISOString() : null,
      Address: frontendData.address || null,
      Salary: frontendData.salary || "0",
      PhotoUrl: frontendData.photoUrl || null,
      EmployeeId: `EMP${Date.now()}`,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: null
    };
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const isValid = await trigger();
      if (!isValid) {
        toast({
          title: "Erreur de validation",
          description: "Veuillez vérifier tous les champs obligatoires",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      let photoBase64 = null;
      if (photoFile) {
        photoBase64 = await convertFileToBase64(photoFile);
      }

      const formData = {
        ...data,
        photoUrl: photoBase64
      };

      const employeeData = mapToBackendFormat(formData);

      console.log("Données envoyées à l'API:", employeeData);

      const response = await employeeApi.createEmployee(employeeData);
      
      toast({
        title: "Succès",
        description: `Employé ${data.firstName} ${data.lastName} ajouté avec succès.`,
      });
      if (onSubmit) {
        onSubmit(response || employeeData);
      }

      reset();
      setPhotoPreview(null);
      setPhotoFile(null);

      if (onClose) {
        onClose();
      }

    } catch (error) {
      console.error("Erreur détaillée lors de l'ajout:", error);
      
      let errorMessage = "Une erreur est survenue lors de l'enregistrement";
      
      if (error.response) {
        if (error.response.data && typeof error.response.data === 'object') {
          if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data.errors) {
            const validationErrors = error.response.data.errors;
            errorMessage = Object.entries(validationErrors)
              .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
              .join('; ');
          } else if (error.response.data.title) {
            errorMessage = error.response.data.title;
          }
        } else if (error.response.status === 400) {
          errorMessage = "Données invalides envoyées au serveur";
        } else if (error.response.status === 500) {
          errorMessage = "Erreur serveur, veuillez réessayer plus tard";
        }
      } else if (error.request) {
        errorMessage = "Impossible de contacter le serveur. Vérifiez votre connexion.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "La photo ne doit pas dépasser 2MB",
          variant: "destructive",
        });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Format invalide",
          description: "Veuillez sélectionner une image",
          variant: "destructive",
        });
        return;
      }
      
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setValue("photoUrl", reader.result, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString('fr-FR');
    } catch {
      return "";
    }
  };

  const formValues = watch();

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden max-w-4xl mx-auto">
      <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Nouvel Employé</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Remplissez les informations pour ajouter un nouvel employé
            </p>
          </div>
          {onClose && (
            <button 
              onClick={onClose} 
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              type="button"
              disabled={isSubmitting}
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
          
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className={cn(
                "w-28 h-28 rounded-full border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-muted/30",
                photoPreview ? "border-primary" : "hover:border-primary/50 transition-colors"
              )}>
                {photoPreview ? (
                  <img 
                    src={photoPreview} 
                    className="w-full h-full object-cover" 
                    alt="Aperçu photo"
                  />
                ) : (
                  <UserCircle className="w-16 h-16 text-muted-foreground/50" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-2 bg-accent text-accent-foreground rounded-full cursor-pointer hover:bg-accent/90 transition-colors shadow-md">
                <Upload className="h-4 w-4" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handlePhotoChange}
                  disabled={isSubmitting}
                />
              </label>
            </div>
          </div>

          <div className="space-y-8">
            <section className="bg-card2/50 rounded-lg p-5 border border-border/50">
              <h3 className="flex items-center gap-2 font-semibold mb-5 text-foreground">
                <User className="h-5 w-5 text-primary" />
                Informations Personnelles
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    Prénom *
                  </Label>
                  <Input 
                    id="firstName"
                    placeholder="Prénom" 
                    {...register("firstName", { 
                      required: "Le prénom est requis",
                      minLength: {
                        value: 2,
                        message: "Minimum 2 caractères"
                      },
                      maxLength: {
                        value: 50,
                        message: "Maximum 50 caractères"
                      }
                    })}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Nom *
                  </Label>
                  <Input 
                    id="lastName"
                    placeholder="Nom" 
                    {...register("lastName", { 
                      required: "Le nom est requis",
                      minLength: {
                        value: 2,
                        message: "Minimum 2 caractères"
                      },
                      maxLength: {
                        value: 50,
                        message: "Maximum 50 caractères"
                      }
                    })}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="exemple@company.com" 
                    {...register("email", { 
                      required: "L'email est requis",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Adresse email invalide"
                      }
                    })}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Téléphone *
                  </Label>
                  <Input 
                    id="phone"
                    type="tel" 
                    placeholder="+212 6XX-XXXXXX" 
                    {...register("phone", { 
                      required: "Le téléphone est requis",
                      pattern: {
                        value: /^[\+]?[0-9\s\-\(\)]+$/,
                        message: "Numéro de téléphone invalide"
                      },
                      minLength: {
                        value: 8,
                        message: "Minimum 8 chiffres"
                      }
                    })}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-sm font-medium">
                    Date de Naissance
                  </Label>
                  <Input 
                    id="birthDate"
                    type="date" 
                    {...register("birthDate", {
                      validate: (value) => {
                        if (!value) return true;
                        const date = new Date(value);
                        return !isNaN(date.getTime()) || "Date invalide";
                      }
                    })}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {formValues.birthDate && (
                    <p className="text-xs text-muted-foreground">
                      {formatDateForDisplay(formValues.birthDate)}
                    </p>
                  )}
                  {errors.birthDate && (
                    <p className="text-sm text-destructive mt-1">{errors.birthDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Adresse
                  </Label>
                  <Input 
                    id="address"
                    placeholder="Adresse complète" 
                    {...register("address", {
                      maxLength: {
                        value: 200,
                        message: "Maximum 200 caractères"
                      }
                    })}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login" className="text-sm font-medium">
                    Identifiant (Login) *
                  </Label>
                  <Input 
                    id="login"
                    placeholder="Nom d'utilisateur" 
                    {...register("login", { 
                      required: "L'identifiant est requis",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 caractères"
                      },
                      maxLength: {
                        value: 50,
                        message: "Maximum 50 caractères"
                      }
                    })}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {errors.login && (
                    <p className="text-sm text-destructive mt-1">{errors.login.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Mot de Passe *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("password", { 
                        required: "Le mot de passe est requis",
                        minLength: {
                          value: 6,
                          message: "Minimum 6 caractères"
                        },
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)/,
                          message: "Doit contenir au moins une lettre et un chiffre"
                        }
                      })}
                      className="w-full pr-10"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={isSubmitting}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
                  )}
                </div>
              </div>
            </section>

            <section className="bg-card2/50 rounded-lg p-5 border border-border/50">
              <h3 className="flex items-center gap-2 font-semibold mb-5 text-foreground">
                <Briefcase className="h-5 w-5 text-primary" />
                Informations Professionnelles
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Département *
                  </Label>
                  <Select 
                    onValueChange={(v) => setValue("department", v, { shouldValidate: true })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner un département" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    {...register("department", { required: "Le département est requis" })}
                  />
                  {errors.department && (
                    <p className="text-sm text-destructive mt-1">{errors.department.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="text-sm font-medium">
                    Poste *
                  </Label>
                  <Input 
                    id="position"
                    placeholder="Ex: Développeur Frontend" 
                    {...register("position", { 
                      required: "Le poste est requis",
                      minLength: {
                        value: 2,
                        message: "Minimum 2 caractères"
                      },
                      maxLength: {
                        value: 100,
                        message: "Maximum 100 caractères"
                      }
                    })}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {errors.position && (
                    <p className="text-sm text-destructive mt-1">{errors.position.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Type de Contrat *
                  </Label>
                  <Select 
                    onValueChange={(v) => setValue("contractType", v, { shouldValidate: true })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contractTypes.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    {...register("contractType", { required: "Le type de contrat est requis" })}
                  />
                  {errors.contractType && (
                    <p className="text-sm text-destructive mt-1">{errors.contractType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Manager *
                  </Label>
                  <Select 
                    onValueChange={(v) => setValue("manager", v, { shouldValidate: true })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner un manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {managers.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    {...register("manager", { required: "Le manager est requis" })}
                  />
                  {errors.manager && (
                    <p className="text-sm text-destructive mt-1">{errors.manager.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary" className="text-sm font-medium">
                    Salaire Annuel (€)
                  </Label>
                  <Input 
                    id="salary"
                    type="number" 
                    placeholder="0.00" 
                    step="0.01"
                    {...register("salary", {
                      min: {
                        value: 0,
                        message: "Le salaire ne peut pas être négatif"
                      },
                      max: {
                        value: 1000000,
                        message: "Salaire maximum: 1,000,000 €"
                      }
                    })}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {errors.salary && (
                    <p className="text-sm text-destructive mt-1">{errors.salary.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm font-medium">
                    Date de Début *
                  </Label>
                  <Input 
                    id="startDate"
                    type="date" 
                    {...register("startDate", { 
                      required: "La date de début est requise",
                      validate: (value) => {
                        const date = new Date(value);
                        return !isNaN(date.getTime()) || "Date invalide";
                      }
                    })}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {formValues.startDate && (
                    <p className="text-xs text-muted-foreground">
                      {formatDateForDisplay(formValues.startDate)}
                    </p>
                  )}
                  {errors.startDate && (
                    <p className="text-sm text-destructive mt-1">{errors.startDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Statut *
                  </Label>
                  <Select 
                    defaultValue="Actif"
                    onValueChange={(v) => setValue("status", v, { shouldValidate: true })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    {...register("status", { required: "Le statut est requis" })}
                  />
                  {errors.status && (
                    <p className="text-sm text-destructive mt-1">{errors.status.message}</p>
                  )}
                </div>
              </div>
            </section>

            <section className="bg-primary/5 rounded-lg p-5 border border-primary/20">
              <h3 className="flex items-center gap-2 font-semibold mb-4 text-primary">
                <UserCircle className="h-5 w-5" />
                Aperçu
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Nom complet</p>
                  <p className="font-medium text-foreground">
                    {formValues.firstName || "—"} {formValues.lastName || "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Poste</p>
                  <p className="font-medium text-foreground">
                    {formValues.position || "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Département</p>
                  <p className="font-medium text-foreground">
                    {formValues.department || "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground truncate">
                    {formValues.email || "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Statut</p>
                  <div className="inline-flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${
                      formValues.status === "Actif" ? "bg-success" :
                      formValues.status === "En Congé" ? "bg-warning" :
                      formValues.status === "Période d'Essai" ? "bg-accent" :
                      "bg-muted"
                    }`} />
                    <span className="font-medium text-foreground">
                      {formValues.status || "—"}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Date de début</p>
                  <p className="font-medium text-foreground">
                    {formatDateForDisplay(formValues.startDate) || "—"}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="sticky bottom-0 bg-card border-t border-border -mx-6 -mb-6 px-6 py-4 mt-8">
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                type="button" 
                onClick={onClose}
                className="min-w-[100px]"
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                variant="accent"
                className="min-w-[120px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" /> 
                    Enregistrer
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}