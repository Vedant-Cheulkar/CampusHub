import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const Login = () => {
    const navigate = useNavigate();

    // Logic State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // UI State
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        if (e) e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            setError("No account found. Please sign up first.");
            return;
        }

        setLoading(true);

        // Simulate backend delay
        setTimeout(() => {
            if (
                email === storedUser.email &&
                password === storedUser.password
            ) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
                navigate("/marketplace");
            } else {
                setError("Invalid email or password");
            }
            setLoading(false);
        }, 800);
    };

    return (
        <PageWrapper>
            {/* Injecting CSS styles defined at the bottom */}
            <style>{styles}</style>

            <div className="login-container">
                <div className="login-content">

                    {/* Brand Header */}
                    <div className="brand-header">
                        <svg className="brand-icon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span className="brand-text">CampusHub</span>
                    </div>

                    {/* Main Card */}
                    <div className="login-card">
                        <h1 className="form-title">Login to CampusHub</h1>

                        <form onSubmit={handleLogin} className="login-form">
                            {/* Email */}
                            <label className="input-group">
                                <span className="input-label">Email</span>
                                <input
                                    className="input-field"
                                    type="email"
                                    placeholder="your.email@university.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>

                            {/* Password */}
                            <label className="input-group">
                                <span className="input-label">Password</span>
                                <div className="password-wrapper">
                                    <input
                                        className="input-field password-field"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </label>

                            {/* Error Message */}
                            {error && <div className="error-box">{error}</div>}

                            {/* Options */}
                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input type="checkbox" className="checkbox-input" />
                                    <span>Remember Me</span>
                                </label>
                                <span className="forgot-link" onClick={() => navigate("/forgot")}>
                                    Forgot Password?
                                </span>
                            </div>

                            {/* Button */}
                            <button type="submit" className="login-btn" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        {/* Signup Link */}
                        <div className="signup-area">
                            Don't have an account?{" "}
                            <span className="signup-action" onClick={() => navigate("/signup")}>
                                Sign up
                            </span>
                        </div>

                        {/* Demo Box */}
                        <div className="demo-credentials">
                            <strong>Demo Credentials:</strong> user@gmail.com / 123456
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

// CSS Styles defined as a string to allow Pseudo-classes and Dark Mode
const styles = `
/* 🔥 CRITICAL FIX */
*, *::before, *::after {
  box-sizing: border-box;
}

    /* Variables */
    :root {
        --c-primary: #135bec;
        --c-primary-hover: #1d4ed8;
        --c-bg: #f6f6f8;
        --c-card: #ffffff;
        --c-text: #1e293b;
        --c-text-muted: #64748b;
        --c-border: #cbd5e1;
        --c-input-bg: #f1f5f9;
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    /* Dark Mode Overrides - assumes a parent class 'dark' or 'dark-mode' on body/html */
    :root:has(.dark), .dark, .dark-mode {
        --c-bg: #101622;
        --c-card: #1e293b;
        --c-text: #f8fafc;
        --c-text-muted: #94a3b8;
        --c-border: #334155;
        --c-input-bg: #0f172a;
    }

    /* Layout */
    .login-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--c-bg);
        color: var(--c-text);
        font-family: 'Lexend', sans-serif;
        padding: 1rem;
        transition: background-color 0.3s;
    }

    .login-content {
        width: 100%;
        max-width: 440px;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
    }

    /* Brand Header */
    .brand-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    .brand-icon {
        width: 2rem;
        height: 2rem;
        color: var(--c-primary);
    }
    .brand-text {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--c-text);
    }

    /* Card */
    .login-card {
        width: 100%;
        background-color: var(--c-card);
        padding: 1.75rem;
        border-radius: 0.75rem;
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--c-border);
    }

    .form-title {
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 1.5rem;
        color: var(--c-text);
    }

    /* Inputs */
    .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }
    .input-label {
        font-size: 0.95rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: var(--c-text);
    }
    .input-field {
        width: 100%;
        height: 44px;
        padding: 0 0.75rem;
        border-radius: 0.5rem;
        border: 1px solid var(--c-border);
        background-color: var(--c-input-bg);
        color: var(--c-text);
        font-size: 1rem;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
    }
    .input-field:focus {
        border-color: var(--c-primary);
        box-shadow: 0 0 0 3px rgba(19, 91, 236, 0.2);
    }

    /* Password Toggle */
    .password-wrapper {
        display: flex;
        width: 100%; 
        position: relative;
    }
    .password-field {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;
    }
    .toggle-password {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.75rem;
        background-color: var(--c-input-bg);
        border: 1px solid var(--c-border);
        border-left: none;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        color: var(--c-text-muted);
        cursor: pointer;
    }
    .toggle-password:hover {
        color: var(--c-text);
    }

    /* Error */
    .error-box {
        background-color: #fef2f2;
        border: 1px solid #fecaca;
        color: #dc2626;
        padding: 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        text-align: center;
        margin-bottom: 1rem;
    }

    /* Options Row */
    .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        color: var(--c-text);
        cursor: pointer;
    }
    .checkbox-input {
        width: 1rem;
        height: 1rem;
        accent-color: var(--c-primary);
    }
    .forgot-link {
        font-size: 0.875rem;
        color: var(--c-primary);
        text-decoration: none;
        font-weight: 500;
    }
    .forgot-link:hover {
        text-decoration: underline;
    }

    /* Buttons */
    .login-btn {
        width: 100%;
        height: 48px;
        background-color: var(--c-primary);
        color: white;
        font-size: 1rem;
        font-weight: 700;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .login-btn:hover {
        background-color: var(--c-primary-hover);
    }
    .login-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    /* Signup & Demo */
    .signup-area {
        margin-top: 1.5rem;
        text-align: center;
        font-size: 0.875rem;
        color: var(--c-text-muted);
    }
    .signup-action {
        color: var(--c-primary);
        font-weight: 600;
        cursor: pointer;
    }
    .signup-action:hover {
        text-decoration: underline;
    }

    .demo-credentials {
        margin-top: 1.5rem;
        padding: 0.75rem;
        background-color: var(--c-input-bg);
        border-radius: 0.5rem;
        text-align: center;
        font-size: 0.8rem;
        color: var(--c-text-muted);
    }
`;

export default Login;