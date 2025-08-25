import React, { useState } from "react";
// At top of App.js or index.js
import './App.css';

const initialForm = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  country: "",
  dob: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value, allValues = formData) => {
    switch (name) {
      case "firstname":
        if (!value.trim()) return "First name is required";
        return "";
      case "lastname":
        if (!value.trim()) return "Last name is required";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Email address is invalid";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      case "confirmPassword":
        if (!value) return "Confirm Password is required";
        if (value !== allValues.password) return "Passwords do not match";
        return "";
      case "phone":
        if (value.length !== 10) return "Phone number must be exactly 10 digits";
        return "";
      case "country":
        if (!value) return "Please select your country";
        return "";
      case "dob":
        if (!value) return "Date of Birth is required";
        return "";
      case "terms":
        if (!value) return "You must accept the terms and conditions";
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    Object.keys(formData).forEach((key) => {
      const msg = validateField(key, formData[key], formData);
      if (msg) nextErrors[key] = msg;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    const updated = { ...formData, [name]: val };
    setFormData(updated);

    if (touched[name]) {
      const msg = validateField(name, val, updated);
      setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const msg = validateField(name, val, formData);
    setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = {};
    Object.keys(formData).forEach(key => (allTouched[key] = true));
    setTouched(allTouched);

    if (validateForm()) {
      alert("Form Submitted Successfully ✅");
      setFormData(initialForm);
      setErrors({});
      setTouched({});
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Input Validation</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="firstname">First Name *</label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.firstname}
              aria-describedby="firstname-error"
            />
            {errors.firstname && (
              <span id="firstname-error" className="error">
                {errors.firstname}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name *</label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.lastname}
              aria-describedby="lastname-error"
            />
            {errors.lastname && (
              <span id="lastname-error" className="error">
                {errors.lastname}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && (
              <span id="email-error" className="error">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.phone}
              aria-describedby="phone-error"
            />
            {errors.phone && (
              <span id="phone-error" className="error">
                {errors.phone}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="country">Country *</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.country}
              aria-describedby="country-error"
            >
              <option value="">Select country</option>
              <option value="USA">USA</option>
              <option value="India">India</option>
              <option value="UK">UK</option>
              {/* Add more countries as needed */}
            </select>
            {errors.country && (
              <span id="country-error" className="error">
                {errors.country}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth *</label>
            <input
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.dob}
              aria-describedby="dob-error"
            />
            {errors.dob && (
              <span id="dob-error" className="error">
                {errors.dob}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {errors.password && (
              <span id="password-error" className="error">
                {errors.password}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby="confirmPassword-error"
            />
            {errors.confirmPassword && (
              <span id="confirmPassword-error" className="error">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div className="form-group checkbox-group">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.terms}
              aria-describedby="terms-error"
            />
            <label htmlFor="terms">I agree to Terms & Conditions *</label>
            {errors.terms && (
              <span id="terms-error" className="error">
                {errors.terms}
              </span>
            )}
          </div>

          <button type="submit">Register</button>
        </form>

        <p className="tip">
          Move focus between fields to see <code>onBlur</code> (field-level) validation.<br />
          Click Submit to trigger <code>onSubmit</code> (form-level) validation.<br />
          Form clears after a successful submit.
        </p>
      </div>
    </div>
  );
}

export default App;