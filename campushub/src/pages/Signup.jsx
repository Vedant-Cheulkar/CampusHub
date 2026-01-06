import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const Signup = () => {
    const navigate = useNavigate();

    // --- LOGIC STATE ---
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Student"
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // --- UI STATE (Password Toggles) ---
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        if (e) e.preventDefault();
        setError("");
        setSuccess("");

        const { name, email, password, confirmPassword, role } = form;

        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Check if user already exists
        const existingUser = localStorage.getItem("user");
        if (existingUser) {
            setError("User already exists. Please login.");
            return;
        }

        setLoading(true);

        // Simulate API delay
        setTimeout(() => {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    name,
                    email,
                    password,
                    role
                })
            );

            setLoading(false);
            setSuccess("Signup successful! Redirecting...");

            setTimeout(() => {
                navigate("/"); // Redirect to Login
            }, 1200);
        }, 800);
    };

    return (
        <PageWrapper title="Sign Up">
            <style>{styles}</style>

            <div className="signup-container">
                <div className="signup-content">

                    {/* Header */}
                    <div className="signup-header">
                        <h1 className="header-title">Create your CampusHub Account</h1>
                        <p className="header-subtitle">Join the student community for marketplace, xerox orders, and more.</p>
                    </div>

                    {/* Card */}
                    <div className="signup-card">
                        <form onSubmit={handleSignup} className="signup-form">

                            {/* Full Name */}
                            <label className="input-group">
                                <span className="input-label">Full Name</span>
                                <input
                                    className="input-field"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </label>

                            {/* Email */}
                            <label className="input-group">
                                <span className="input-label">Email</span>
                                <input
                                    className="input-field"
                                    type="email"
                                    name="email"
                                    placeholder="your.email@university.edu"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </label>

                            {/* Role (Added back to match your logic) */}
                            <label className="input-group">
                                <span className="input-label">I am a</span>
                                <select
                                    className="input-field select-field"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <option value="Student">Student</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </label>

                            {/* Password */}
                            <label className="input-group">
                                <span className="input-label">Password</span>
                                <div className="password-wrapper">
                                    <input
                                        className="input-field password-field"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter a strong password"
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className="material-symbols-outlined">
                                            {showPassword ? "visibility" : "visibility_off"}
                                        </span>
                                    </button>
                                </div>
                            </label>

                            {/* Confirm Password */}
                            <label className="input-group">
                                <span className="input-label">Confirm Password</span>
                                <div className="password-wrapper">
                                    <input
                                        className="input-field password-field"
                                        type={showConfirm ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Re-enter your password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                    >
                                        <span className="material-symbols-outlined">
                                            {showConfirm ? "visibility" : "visibility_off"}
                                        </span>
                                    </button>
                                </div>
                            </label>

                            {/* Feedback Messages */}
                            {error && <div className="msg-error">{error}</div>}
                            {success && <div className="msg-success">{success}</div>}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="signup-btn"
                                disabled={loading}
                            >
                                {loading ? "Creating Account..." : "Sign Up"}
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="signup-footer">
                        Already have an account?{" "}
                        <span className="login-link" onClick={() => navigate("/")}>
                            Log In
                        </span>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

// --- CSS STYLES ---
const styles = `
    :root {
        --s-primary: #135bec;
        --s-primary-hover: #1d4ed8;
        --s-bg: #f6f6f8;
        --s-card-bg: #ffffff;
        --s-text: #1e293b;
        --s-text-sub: #64748b;
        --s-border: #d1d5db;
        --s-input-bg: #ffffff;
        --s-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    /* Dark Mode */
    :root:has(.dark), .dark, .dark-mode {
        --s-bg: #101622;
        --s-card-bg: #18181b;
        --s-text: #f8fafc;
        --s-text-sub: #9ca3af;
        --s-border: #374151;
        --s-input-bg: #101622;
    }

    .signup-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background-color: var(--s-bg);
        color: var(--s-text);
        font-family: 'Lexend', sans-serif;
    }

    .signup-content {
        width: 100%;
        max-width: 450px;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    /* Header */
    .signup-header {
        text-align: center;
    }
    .header-title {
        font-size: 1.875rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: var(--s-text);
        line-height: 1.25;
    }
    .header-subtitle {
        font-size: 0.875rem;
        color: var(--s-text-sub);
    }

    /* Card */
    .signup-card {
        background-color: var(--s-card-bg);
        border: 1px solid var(--s-border);
        border-radius: 0.75rem;
        padding: 2rem;
        box-shadow: var(--s-shadow);
    }

    .signup-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    /* Inputs */
    .input-group {
        display: flex;
        flex-direction: column;
    }
    .input-label {
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: var(--s-text);
    }
    .input-field {
        width: 100%;
        height: 3rem; /* 12 tailwind units */
        padding: 0 0.75rem;
        border-radius: 0.5rem;
        border: 1px solid var(--s-border);
        background-color: var(--s-input-bg);
        color: var(--s-text);
        font-size: 0.875rem;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
    }
    .input-field:focus {
        border-color: var(--s-primary);
        box-shadow: 0 0 0 2px rgba(19, 91, 236, 0.2);
    }
    .select-field {
        appearance: none;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 0.5rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
    }

    /* Password Toggles */
    .password-wrapper {
        position: relative;
        display: flex;
        width: 100%;
    }
    .password-field {
        padding-right: 2.5rem; /* Space for eye icon */
    }
    .toggle-password {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        padding-right: 0.75rem;
        background: transparent;
        border: none;
        color: #9ca3af;
        cursor: pointer;
    }
    .toggle-password:hover {
        color: var(--s-text-sub);
    }
    .material-symbols-outlined {
        font-size: 1.25rem;
    }

    /* Buttons & Messages */
    .signup-btn {
        width: 100%;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--s-primary);
        color: white;
        font-size: 0.875rem;
        font-weight: 500;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    .signup-btn:hover {
        background-color: var(--s-primary-hover);
    }
    .signup-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .msg-error {
        color: #ef4444;
        font-size: 0.875rem;
        text-align: center;
        background: rgba(239, 68, 68, 0.1);
        padding: 0.5rem;
        border-radius: 0.25rem;
    }
    .msg-success {
        color: #22c55e;
        font-size: 0.875rem;
        text-align: center;
        background: rgba(34, 197, 94, 0.1);
        padding: 0.5rem;
        border-radius: 0.25rem;
    }

    /* Footer */
    .signup-footer {
        text-align: center;
        font-size: 0.875rem;
        color: var(--s-text-sub);
    }
    .login-link {
        color: var(--s-primary);
        font-weight: 500;
        cursor: pointer;
    }
    .login-link:hover {
        text-decoration: underline;
    }
`;

export default Signup;