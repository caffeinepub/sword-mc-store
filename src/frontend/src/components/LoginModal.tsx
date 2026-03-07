import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
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

interface ForgotErrors {
  email?: string;
  newPassword?: string;
  confirmPassword?: string;
}

type View = "login" | "forgot";

export function LoginModal({ open, onClose, onGoToRegister }: LoginModalProps) {
  const { login, resetPassword } = useAuth();

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot password state
  const [view, setView] = useState<View>("login");
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [forgotErrors, setForgotErrors] = useState<ForgotErrors>({});
  const [isForgotSubmitting, setIsForgotSubmitting] = useState(false);

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

  const validateForgot = (): ForgotErrors => {
    const errs: ForgotErrors = {};
    if (!forgotEmail.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim())) {
      errs.email = "Enter a valid email address.";
    }
    if (!newPassword) {
      errs.newPassword = "New password is required.";
    } else if (newPassword.length < 6) {
      errs.newPassword = "Password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      errs.confirmPassword = "Please confirm your new password.";
    } else if (newPassword !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
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

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateForgot();
    setForgotErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsForgotSubmitting(true);
    try {
      await resetPassword(forgotEmail.trim(), newPassword);
      toast.success("Password reset!", {
        description: "Your password has been updated. You can now log in.",
        duration: 4000,
      });
      setView("login");
      setForgotEmail("");
      setNewPassword("");
      setConfirmPassword("");
      setForgotErrors({});
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Reset failed. Try again.";
      toast.error("Reset failed", { description: msg });
    } finally {
      setIsForgotSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setErrors({});
    setShowPassword(false);
    setRememberMe(false);
    setView("login");
    setForgotEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setForgotErrors({});
    onClose();
  };

  const gradientStyle = {
    background:
      "linear-gradient(160deg, #e8a0d4 0%, #c78dce 30%, #9fc8e8 70%, #a8dde0 100%)",
  };

  const inputStyle: React.CSSProperties = {
    color: "rgba(255,255,255,0.95)",
    fontFamily: '"Outfit", sans-serif',
  };

  const underlineRow = {
    borderBottom: "1.5px solid rgba(255,255,255,0.70)",
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        data-ocid="login.modal"
        className="p-0 border-0 shadow-2xl overflow-hidden max-w-sm w-full"
        style={gradientStyle}
      >
        <div className="flex flex-col items-center px-8 pt-10 pb-8">
          {/* ───── LOGIN VIEW ───── */}
          {view === "login" && (
            <>
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

              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-5"
                noValidate
              >
                {/* Email field */}
                <div className="flex flex-col gap-1">
                  <div
                    className="flex items-center gap-3 pb-1"
                    style={underlineRow}
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
                      style={inputStyle}
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
                    style={underlineRow}
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
                          setErrors((prev) => ({
                            ...prev,
                            password: undefined,
                          }));
                      }}
                      autoComplete="current-password"
                      disabled={isSubmitting}
                      className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/60"
                      style={inputStyle}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="flex-shrink-0 transition-opacity hover:opacity-80"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
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
                    onClick={() => setView("forgot")}
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
            </>
          )}

          {/* ───── FORGOT PASSWORD VIEW ───── */}
          {view === "forgot" && (
            <>
              {/* Back button */}
              <button
                type="button"
                data-ocid="forgot.back_button"
                onClick={() => {
                  setView("login");
                  setForgotEmail("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setForgotErrors({});
                }}
                className="self-start flex items-center gap-1 text-xs mb-6 transition-opacity hover:opacity-75"
                style={{
                  color: "rgba(255,255,255,0.88)",
                  fontFamily: '"Outfit", sans-serif',
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Login
              </button>

              {/* Lock icon */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{
                  border: "3px solid rgba(255,255,255,0.75)",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <Lock
                  className="w-10 h-10"
                  style={{ color: "rgba(255,255,255,0.90)", strokeWidth: 1.5 }}
                />
              </div>

              <h2
                className="text-xl font-bold mb-2 tracking-wide text-center"
                style={{
                  fontFamily: '"Bricolage Grotesque", sans-serif',
                  color: "rgba(255,255,255,0.95)",
                  textShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }}
              >
                Reset Password
              </h2>
              <p
                className="text-xs text-center mb-7"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: '"Outfit", sans-serif',
                }}
              >
                Enter your registered email and choose a new password.
              </p>

              <form
                onSubmit={handleForgotSubmit}
                className="w-full flex flex-col gap-5"
                noValidate
              >
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <div
                    className="flex items-center gap-3 pb-1"
                    style={underlineRow}
                  >
                    <Mail
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: "rgba(255,255,255,0.80)" }}
                    />
                    <input
                      data-ocid="forgot.email_input"
                      type="email"
                      placeholder="Registered Email"
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value);
                        if (forgotErrors.email)
                          setForgotErrors((p) => ({ ...p, email: undefined }));
                      }}
                      autoComplete="email"
                      disabled={isForgotSubmitting}
                      className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/60"
                      style={inputStyle}
                    />
                  </div>
                  {forgotErrors.email && (
                    <p
                      data-ocid="forgot.email_input.error_state"
                      className="text-xs mt-0.5"
                      style={{
                        color: "rgba(255,255,255,0.90)",
                        fontFamily: '"Outfit", sans-serif',
                      }}
                    >
                      {forgotErrors.email}
                    </p>
                  )}
                </div>

                {/* New password */}
                <div className="flex flex-col gap-1">
                  <div
                    className="flex items-center gap-3 pb-1"
                    style={underlineRow}
                  >
                    <Lock
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: "rgba(255,255,255,0.80)" }}
                    />
                    <input
                      data-ocid="forgot.new_password_input"
                      type={showNew ? "text" : "password"}
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        if (forgotErrors.newPassword)
                          setForgotErrors((p) => ({
                            ...p,
                            newPassword: undefined,
                          }));
                      }}
                      autoComplete="new-password"
                      disabled={isForgotSubmitting}
                      className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/60"
                      style={inputStyle}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((v) => !v)}
                      className="flex-shrink-0 transition-opacity hover:opacity-80"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                      aria-label={showNew ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {showNew ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {forgotErrors.newPassword && (
                    <p
                      data-ocid="forgot.new_password_input.error_state"
                      className="text-xs mt-0.5"
                      style={{
                        color: "rgba(255,255,255,0.90)",
                        fontFamily: '"Outfit", sans-serif',
                      }}
                    >
                      {forgotErrors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm password */}
                <div className="flex flex-col gap-1">
                  <div
                    className="flex items-center gap-3 pb-1"
                    style={underlineRow}
                  >
                    <Lock
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: "rgba(255,255,255,0.80)" }}
                    />
                    <input
                      data-ocid="forgot.confirm_password_input"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (forgotErrors.confirmPassword)
                          setForgotErrors((p) => ({
                            ...p,
                            confirmPassword: undefined,
                          }));
                      }}
                      autoComplete="new-password"
                      disabled={isForgotSubmitting}
                      className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/60"
                      style={inputStyle}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="flex-shrink-0 transition-opacity hover:opacity-80"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                      aria-label={
                        showConfirm ? "Hide password" : "Show password"
                      }
                      tabIndex={-1}
                    >
                      {showConfirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {forgotErrors.confirmPassword && (
                    <p
                      data-ocid="forgot.confirm_password_input.error_state"
                      className="text-xs mt-0.5"
                      style={{
                        color: "rgba(255,255,255,0.90)",
                        fontFamily: '"Outfit", sans-serif',
                      }}
                    >
                      {forgotErrors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Reset button */}
                <button
                  type="submit"
                  data-ocid="forgot.submit_button"
                  disabled={isForgotSubmitting}
                  className="w-full py-2.5 mt-2 rounded font-bold text-sm tracking-widest uppercase transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{
                    background: "#1a2a4a",
                    color: "#ffffff",
                    fontFamily: '"Bricolage Grotesque", sans-serif',
                    letterSpacing: "0.12em",
                  }}
                >
                  {isForgotSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Resetting…
                    </>
                  ) : (
                    "RESET PASSWORD"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
