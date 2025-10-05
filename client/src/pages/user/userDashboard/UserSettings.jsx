// src/pages/userDashboard/UserSettings.jsx
import React from "react";

export default function UserSettings() {
  return (
    <div className="card">
      <div className="card-body">
        <h5>Settings</h5>
        <p className="text-muted small">Account preferences — notifications, address book, saved payment methods coming soon.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Notification Email</label>
              <input className="form-control" placeholder="example@mail.com" />
            </div>

            <div className="mb-3">
              <label className="form-label">Two-factor auth</label>
              <select className="form-select">
                <option>Disabled</option>
                <option>Enabled</option>
              </select>
            </div>
          </div>
        </div>

        <button className="btn btn-primary">Save Settings</button>
      </div>
    </div>
  );
}
