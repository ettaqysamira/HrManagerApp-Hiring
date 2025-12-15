import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button1";
import { Input } from "../ui/input1";
import { Label } from "../ui/label1";
import { Checkbox } from "../ui/checkbox1";
import { authService } from "../../services/auth.service";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.login || !formData.password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({
        login: formData.login,
        password: formData.password
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      toast.success("Connexion réussie !");

      setTimeout(() => {
        const tokenStr = encodeURIComponent(response.token);
        if (response.user.role === "HR") {
          window.location.href = `http://localhost:5173/hr-overview?token=${tokenStr}`;
        } else {
          window.location.href = `http://localhost:5173/employee?token=${tokenStr}`;
        }
      }, 1000);

    } catch (error) {
      toast.error(error.message || "Identifiant ou mot de passe incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="w-full max-w-md mx-auto animate-slide-up">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          Se Connecter
        </h1>
        <p className="text-muted-foreground font-body">
          Connectez-vous à votre compte
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="login" className="text-sm font-medium text-foreground">
            Identifiant (Login)
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="login"
              type="text"
              placeholder="votre.identifiant"
              className="pl-12"
              value={formData.login}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            Mot de passe
          </Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-12 pr-12"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            checked={formData.rememberMe}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, rememberMe: checked })
            }
          />
          <Label htmlFor="rememberMe" className="text-sm text-muted-foreground cursor-pointer">
            Se souvenir de moi
          </Label>
        </div>

        <Button
          type="submit"
          variant="hr"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Connexion...
            </>
          ) : (
            <>
              Se connecter
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;