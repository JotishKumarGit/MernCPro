import React, { useEffect, useState } from "react";
import api from "../../../api/apiClient";
import { useAuthStore } from "../../../stores/authStore";
import { toast } from "react-toastify";

/*
  Profile form:
  - Loads user from auth store into local form state
  - Supports file upload with multipart/form-data
  - Calls PUT /auth/update-profile (your backend route)
  - After success, calls initializeAuth() to refresh local auth state
*/
export default function UserProfile() {
  const { user, initializeAuth } = useAuthStore();
  const [form, setForm] = useState({ name: "", phone: "", profilePic: "" });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (user) setForm({ name: user.name || "", phone: user.phone || "", profilePic: user.profilePic || "" });
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("phone", form.phone || "");
      if (file) payload.append("profilePic", file);

      const { data } = await api.put("/auth/update-profile", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated");
      initializeAuth();
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card animated-card">
      <div className="card-body">
        <h5>Profile</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input name="email" value={user?.email || ""} disabled className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="form-control" />
            </div>
            <div className="col-12">
              <label className="form-label">Profile picture</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleFile} />
            </div>
          </div>

          <div className="mt-3 d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setForm({ name: user?.name || "", phone: user?.phone || "", profilePic: user?.profilePic || "" })}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
