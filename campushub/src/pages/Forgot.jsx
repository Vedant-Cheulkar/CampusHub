import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const Forgot = () => {
    const navigate = useNavigate();

    // --- STATE ---
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(""); // For success message
    const [error, setError] = useState("");     // For validation error

    // --- HANDLER ---
    const handleReset = (e) => {
        if (e) e.preventDefault();
        setError("");
        setMessage("");

        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setMessage(`Reset link sent to ${email}. Please check your inbox.`);
            setEmail(""); // Clear input
        }, 1500);
    };

    return (
        <PageWrapper title="Forgot Password">
            <style>{styles}</style>

            <div className="forgot-container">
                <div className="content-wrapper">

                    {/* --- BRANDING SECTION --- */}
                    <div className="brand-section">
                        <span className="material-symbols-outlined brand-icon">school</span>
                        <h1 className="brand-name">CampusHub</h1>
                    </div>

                    {/* --- CARD SECTION --- */}
                    <div className="forgot-card">

                        {/* Heading */}
                        <div className="card-header">
                            <h2 className="card-title">Forgot Password</h2>
                            <p className="card-subtitle">
                                No problem! Enter the email address associated with your account, and we'll send you a link to reset your password.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleReset} className="forgot-form">

                            {/* Email Input with Icon */}
                            <label className="input-group">
                                <span className="input-label">Email Address</span>
                                <div className="input-wrapper">
                                    <div className="icon-box">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <input
                                        className="form-input"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                            </label>

                            {/* Feedback Messages */}
                            {error && <div className="msg-error">{error}</div>}
                            {message && <div className="msg-success">{message}</div>}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={loading}
                            >
                                {loading ? "Sending Link..." : "Send Reset Link"}
                            </button>

                        </form>

                        {/* Footer Link */}
                        <div className="card-footer">
                            Remembered your password?{" "}
                            <span
                                className="link-text"
                                onClick={() => navigate("/")}
                            >
                                Log In
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </PageWrapper>
    );
};

// --- CSS STYLES ---
const styles = `
    :root {
        --fp-primary: #135bec;
        --fp-primary-hover: #1d4ed8;
        --fp-bg: #f6f6f8;
        --fp-card-bg: #ffffff;
        --fp-text: #111827;
        --fp-text-sub: #4b5563;
        --fp-border: #d1d5db;
        --fp-input-bg: #f9fafb; /* Light gray for input/icon background */
        --fp-icon-color: #9ca3af;
    }

    /* Dark Mode */
    :root:has(.dark), .dark, .dark-mode {
        --fp-bg: #101622;
        --fp-card-bg: #111722; /* Matches design dark bg */
        --fp-text: #ffffff;
        --fp-text-sub: #92a4c9;
        --fp-border: #1f2937;
        --fp-input-bg: #192233; /* Dark blue-gray for input */
        --fp-icon-color: #92a4c9;
    }

    .forgot-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        background-color: var(--fp-bg);
        font-family: 'Lexend', sans-serif;
        color: var(--fp-text);
    }

    .content-wrapper {
        width: 100%;
        max-width: 450px;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    /* Branding */
    .brand-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    .brand-icon {
        font-size: 3.75rem; /* 6xl */
        color: var(--fp-primary);
    }
    .brand-name {
        font-size: 1.875rem; /* 3xl */
        font-weight: 700;
        color: var(--fp-text);
    }

    /* Card */
    .forgot-card {
        background-color: var(--fp-card-bg);
        border: 1px solid var(--fp-border);
        border-radius: 0.75rem;
        padding: 2rem;
    }

    .card-header {
        text-align: center;
        margin-bottom: 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .card-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--fp-text);
    }
    .card-subtitle {
        font-size: 0.875rem;
        color: var(--fp-text-sub);
        line-height: 1.5;
    }

    /* Form */
    .forgot-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .input-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--fp-text);
    }

    /* Input Wrapper with Icon */
    .input-wrapper {
        display: flex;
        align-items: stretch;
        border: 1px solid var(--fp-border);
        border-radius: 0.5rem;
        overflow: hidden;
        height: 3rem; /* 12 units */
    }
    
    .icon-box {
        background-color: var(--fp-input-bg);
        border-right: 0;
        padding: 0 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--fp-icon-color);
    }

    .form-input {
        flex: 1;
        border: none;
        background-color: var(--fp-input-bg);
        color: var(--fp-text);
        padding: 0 1rem;
        font-size: 1rem;
        outline: none;
        min-width: 0; /* Prevent flex overflow */
    }
    
    /* Focus state on wrapper when input is focused is hard with pure CSS 
       without :has(), but we can rely on default browser focus or add 
       simple border transition to the wrapper if needed. 
       For now, standardized outline on input. */
    .form-input:focus {
        background-color: var(--fp-input-bg); /* Keep bg */
    }
    .input-wrapper:focus-within {
        border-color: var(--fp-primary);
        box-shadow: 0 0 0 2px rgba(19, 91, 236, 0.2);
    }

    /* Button */
    .btn-submit {
        height: 3rem;
        background-color: var(--fp-primary);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .btn-submit:hover {
        background-color: var(--fp-primary-hover);
    }
    .btn-submit:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    /* Messages */
    .msg-error {
        color: #ef4444;
        font-size: 0.875rem;
        text-align: center;
        background: rgba(239, 68, 68, 0.1);
        padding: 0.5rem;
        border-radius: 0.25rem;
    }
    .msg-success {
        color: #10b981;
        font-size: 0.875rem;
        text-align: center;
        background: rgba(16, 185, 129, 0.1);
        padding: 0.5rem;
        border-radius: 0.25rem;
    }

    /* Footer */
    .card-footer {
        margin-top: 1.5rem;
        text-align: center;
        font-size: 0.875rem;
        color: var(--fp-text-sub);
    }
    .link-text {
        color: var(--fp-primary);
        font-weight: 600;
        cursor: pointer;
    }
    .link-text:hover {
        text-decoration: underline;
    }
`;

export default Forgot;