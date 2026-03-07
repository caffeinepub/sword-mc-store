import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, Sword, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onGoToLogin: () => void;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  ign?: string;
}

export function RegisterModal({
  open,
  onClose,
  onGoToLogin,
}: RegisterModalProps) {
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ign, setIgn] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!username.trim()) {
      errs.username = "Username is required.";
    } else if (username.trim().length < 3) {
      errs.username = "Username must be at least 3 characters.";
    }
    if (!email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Enter a valid email address.";
    }
    if (!password) {
      errs.password = "Password is required.";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
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
      await register(username.trim(), email.trim(), password, ign.trim());
      toast.success("Welcome to Sword MC!", {
        description: `Account created. You're now logged in as ${username.trim()}.`,
        duration: 4000,
      });
      handleClose();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Registration failed. Try again.";
      toast.error("Registration failed", { description: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setIgn("");
    setErrors({});
    setShowPassword(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        data-ocid="register.modal"
        className="bg-card border border-border text-foreground max-w-md w-full p-0 overflow-hidden"
      >
        {/* Header accent */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="p-6">
          <DialogHeader className="mb-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
              <DialogTitle className="font-display font-extrabold text-2xl text-foreground">
                Create Account
              </DialogTitle>
            </div>
            <p className="font-body text-sm text-muted-foreground">
              Join Sword MC and unlock exclusive ranks & perks.
            </p>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="reg-username"
                className="font-body text-sm font-medium text-foreground/80"
              >
                Username <span className="text-destructive">*</span>
              </Label>
              <Input
                id="reg-username"
                data-ocid="register.username_input"
                type="text"
                placeholder="CoolPlayer123"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username)
                    setErrors((prev) => ({ ...prev, username: undefined }));
                }}
                autoComplete="username"
                className="bg-input border-border focus:border-primary/60 font-body"
                disabled={isSubmitting}
              />
              {errors.username && (
                <p
                  data-ocid="register.username_input.error_state"
                  className="text-xs text-destructive font-body"
                >
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="reg-email"
                className="font-body text-sm font-medium text-foreground/80"
              >
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="reg-email"
                data-ocid="register.email_input"
                type="email"
                placeholder="player@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email)
                    setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                autoComplete="email"
                className="bg-input border-border focus:border-primary/60 font-body"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p
                  data-ocid="register.email_input.error_state"
                  className="text-xs text-destructive font-body"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="reg-password"
                className="font-body text-sm font-medium text-foreground/80"
              >
                Password <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="reg-password"
                  data-ocid="register.password_input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  autoComplete="new-password"
                  className="bg-input border-border focus:border-primary/60 font-body pr-10"
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
                  data-ocid="register.password_input.error_state"
                  className="text-xs text-destructive font-body"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Minecraft IGN */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="reg-ign"
                className="font-body text-sm font-medium text-foreground/80"
              >
                <span className="flex items-center gap-1.5">
                  <Sword className="w-3.5 h-3.5 text-primary" />
                  Minecraft IGN
                  <span className="text-muted-foreground text-xs font-normal">
                    (optional)
                  </span>
                </span>
              </Label>
              <Input
                id="reg-ign"
                data-ocid="register.ign_input"
                type="text"
                placeholder="YourMinecraftName"
                value={ign}
                onChange={(e) => setIgn(e.target.value)}
                autoComplete="off"
                className="bg-input border-border focus:border-primary/60 font-body"
                disabled={isSubmitting}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              data-ocid="register.submit_button"
              disabled={isSubmitting}
              className="w-full mt-1 font-display font-bold tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Switch to login */}
          <div className="mt-4 text-center">
            <span className="font-body text-sm text-muted-foreground">
              Already have an account?{" "}
            </span>
            <button
              type="button"
              data-ocid="register.go_to_login_button"
              onClick={() => {
                handleClose();
                onGoToLogin();
              }}
              className="font-body text-sm text-primary hover:text-primary/80 transition-colors font-medium underline underline-offset-2"
            >
              Login
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
