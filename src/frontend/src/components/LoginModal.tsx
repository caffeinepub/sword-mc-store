import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onGoToRegister: () => void;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export function LoginModal({ open, onClose, onGoToRegister }: LoginModalProps) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Enter a valid email address.";
    }
    if (!password) {
      errs.password = "Password is required.";
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      toast.success("Welcome back!", {
        description: "You're now logged in.",
        duration: 3000,
      });
      handleClose();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Login failed. Try again.";
      toast.error("Login failed", { description: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setErrors({});
    setShowPassword(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        data-ocid="login.modal"
        className="bg-card border border-border text-foreground max-w-md w-full p-0 overflow-hidden"
      >
        {/* Header accent */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="p-6">
          <DialogHeader className="mb-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
                <LogIn className="w-5 h-5 text-accent" />
              </div>
              <DialogTitle className="font-display font-extrabold text-2xl text-foreground">
                Login
              </DialogTitle>
            </div>
            <p className="font-body text-sm text-muted-foreground">
              Sign in to your Sword MC account.
            </p>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="login-email"
                className="font-body text-sm font-medium text-foreground/80"
              >
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="login-email"
                data-ocid="login.email_input"
                type="email"
                placeholder="player@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email)
                    setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                autoComplete="email"
                className="bg-input border-border focus:border-accent/60 font-body"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p
                  data-ocid="login.email_input.error_state"
                  className="text-xs text-destructive font-body"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="login-password"
                className="font-body text-sm font-medium text-foreground/80"
              >
                Password <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="login-password"
                  data-ocid="login.password_input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  autoComplete="current-password"
                  className="bg-input border-border focus:border-accent/60 font-body pr-10"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  data-ocid="login.password_input.error_state"
                  className="text-xs text-destructive font-body"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              data-ocid="login.submit_button"
              disabled={isSubmitting}
              className="w-full mt-1 font-display font-bold tracking-wide bg-accent text-accent-foreground hover:bg-accent/90 transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Switch to register */}
          <div className="mt-4 text-center">
            <span className="font-body text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
            </span>
            <button
              type="button"
              data-ocid="login.go_to_register_button"
              onClick={() => {
                handleClose();
                onGoToRegister();
              }}
              className="font-body text-sm text-primary hover:text-primary/80 transition-colors font-medium underline underline-offset-2"
            >
              Register
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
