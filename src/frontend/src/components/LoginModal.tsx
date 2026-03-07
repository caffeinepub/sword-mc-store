import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
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
  const [rememberMe, setRememberMe] = useState(false);
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
    setRememberMe(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        data-ocid="login.modal"
        className="p-0 border-0 shadow-2xl overflow-hidden max-w-sm w-full"
        style={{
          background:
            "linear-gradient(160deg, #e8a0d4 0%, #c78dce 30%, #9fc8e8 70%, #a8dde0 100%)",
        }}
      >
        {/* Close button is rendered by DialogContent automatically */}
        <div className="flex flex-col items-center px-8 pt-10 pb-8">
          {/* User avatar icon */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
            style={{
              border: "3px solid rgba(255,255,255,0.75)",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(4px)",
            }}
          >
            <User
              className="w-12 h-12"
              style={{ color: "rgba(255,255,255,0.90)", strokeWidth: 1.5 }}
            />
          </div>

          {/* Title */}
          <h2
            className="text-2xl font-bold mb-8 tracking-wide"
            style={{
              fontFamily: '"Bricolage Grotesque", sans-serif',
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 1px 4px rgba(0,0,0,0.15)",
            }}
          >
            User Login
          </h2>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-5"
            noValidate
          >
            {/* Email field */}
            <div className="flex flex-col gap-1">
              <div
                className="flex items-center gap-3 pb-1"
                style={{ borderBottom: "1.5px solid rgba(255,255,255,0.70)" }}
              >
                <Mail
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "rgba(255,255,255,0.80)" }}
                />
                <input
                  id="login-email"
                  data-ocid="login.email_input"
                  type="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  autoComplete="email"
                  disabled={isSubmitting}
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/60"
                  style={{
                    color: "rgba(255,255,255,0.95)",
                    fontFamily: '"Outfit", sans-serif',
                  }}
                />
              </div>
              {errors.email && (
                <p
                  data-ocid="login.email_input.error_state"
                  className="text-xs mt-0.5"
                  style={{
                    color: "rgba(255,255,255,0.90)",
                    fontFamily: '"Outfit", sans-serif',
                  }}
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1">
              <div
                className="flex items-center gap-3 pb-1"
                style={{ borderBottom: "1.5px solid rgba(255,255,255,0.70)" }}
              >
                <Lock
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "rgba(255,255,255,0.80)" }}
                />
                <input
                  id="login-password"
                  data-ocid="login.password_input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/60"
                  style={{
                    color: "rgba(255,255,255,0.95)",
                    fontFamily: '"Outfit", sans-serif',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="flex-shrink-0 transition-opacity hover:opacity-80"
                  style={{ color: "rgba(255,255,255,0.75)" }}
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
                  className="text-xs mt-0.5"
                  style={{
                    color: "rgba(255,255,255,0.90)",
                    fontFamily: '"Outfit", sans-serif',
                  }}
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between mt-1">
              <label
                htmlFor="login-remember"
                className="flex items-center gap-2 cursor-pointer select-none"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                <Checkbox
                  id="login-remember"
                  data-ocid="login.remember_checkbox"
                  checked={rememberMe}
                  onCheckedChange={(v) => setRememberMe(!!v)}
                  className="border-white/70 data-[state=checked]:bg-white/20 data-[state=checked]:border-white"
                />
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.88)" }}
                >
                  Remember me
                </span>
              </label>
              <button
                type="button"
                data-ocid="login.forgot_password_button"
                className="text-xs italic transition-opacity hover:opacity-75"
                style={{
                  color: "rgba(255,255,255,0.88)",
                  fontFamily: '"Outfit", sans-serif',
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => toast.info("Password reset coming soon!")}
              >
                Forgot Password?
              </button>
            </div>

            {/* LOGIN button */}
            <button
              type="submit"
              data-ocid="login.submit_button"
              disabled={isSubmitting}
              className="w-full py-2.5 mt-2 rounded font-bold text-sm tracking-widest uppercase transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
              style={{
                background: "#1a2a4a",
                color: "#ffffff",
                fontFamily: '"Bricolage Grotesque", sans-serif',
                letterSpacing: "0.12em",
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "LOGIN"
              )}
            </button>

            {/* Register button */}
            <button
              type="button"
              data-ocid="login.go_to_register_button"
              onClick={() => {
                handleClose();
                onGoToRegister();
              }}
              className="w-full py-2.5 rounded font-bold text-sm tracking-wide transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                background: "#1976d2",
                color: "#ffffff",
                fontFamily: '"Bricolage Grotesque", sans-serif',
                letterSpacing: "0.04em",
              }}
            >
              register
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
