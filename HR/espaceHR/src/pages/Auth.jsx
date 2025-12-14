import LoginForm from "../components/auth/LoginForm";

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-hr-subtle p-6 sm:p-10">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-soft p-8 sm:p-10">
          <LoginForm />
        </div>

        <p className="text-center text-muted-foreground text-xs mt-6">
          © 2024. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default Auth;
