import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api/apiClient";
import { useAuthStore } from "../../stores/authStore";

export default function AuthForms() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [step, setStep] = useState("login"); // login | forgot | reset
  const [form, setForm] = useState({email: "",password: "",confirmPassword: "",});
  const [resetToken, setResetToken] = useState("");

  // 🔹 Input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🔹 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      if (res.data?.success) {
        login(res.data.user, res.data.token);
       localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Login successful 🎉");
        navigate("/"); // go to home
      } else {
        toast.error(res.data?.message || "Login failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  // 🔹 FORGOT PASSWORD
  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/forgot-password", {
        email: form.email,
      });
      if (res.data?.success) {
        setResetToken(res.data.resetUrl.split("/").pop()); // extract token
        toast.success("Reset link generated (check console)");
        console.log("Reset URL:", res.data.resetUrl);
        setStep("reset");
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending reset request");
    }
  };

  // 🔹 RESET PASSWORD
  const handleReset = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match ❌");
    }

    try {
      const res = await api.put(`/auth/reset-password/${resetToken}`, {
        password: form.password,
      });

      if (res.data?.success) {
        toast.success("Password reset successful 🎉");
        setStep("login");
        setForm({ email: "", password: "", confirmPassword: "" });
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="card shadow-lg p-4" style={{ width: "380px", borderRadius: "20px" }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">
          {step === "login" ? "Login" : step === "forgot" ? "Forgot Password" : "Reset Password"}
        </h3>

        {/* LOGIN FORM */}
        {step === "login" && (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="form-control" required
              />
            </div>
            <div className="mb-3">
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
            <button type="button" onClick={() => setStep("forgot")} className="btn btn-link w-100">Forgot Password?</button>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {step === "forgot" && (
          <form onSubmit={handleForgot}>
            <div className="mb-3">
              <input type="email" name="email" placeholder="Enter registered email" value={form.email} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-warning w-100 mb-2">Send Reset Link</button><button type="button" onClick={() => setStep("login")} className="btn btn-link w-100">
              Back to Login
            </button>
          </form>
        )}

        {/* RESET PASSWORD FORM */}
        {step === "reset" && (
          <form onSubmit={handleReset}>
            <div className="mb-3">
              <input
                type="password" name="password" placeholder="New Password" value={form.password} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <input type="password" name="confirmPassword" placeholder="Confirm New Password" value={form.confirmPassword} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-success w-100 mb-2">Reset Password</button>
            <button type="button" onClick={() => setStep("login")} className="btn btn-link w-100">Back to Login</button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
