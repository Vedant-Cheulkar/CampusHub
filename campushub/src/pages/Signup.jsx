import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const Signup = () => {
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = () => {
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
            setSuccess("Signup successful! Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 1200);
        }, 800);
    };

    return (
        <PageWrapper title="Sign Up">
            <div style={styles.container} className="fade-in">
                <h3>Create Account 🚀</h3>
                <p style={{ marginBottom: "16px" }}>
                    Join CampusHub to get started
                </p>

                <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="College Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                />
                <br /><br />

                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                </select>

                <br /><br />

                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}

                <button onClick={handleSignup} disabled={loading}>
                    {loading ? "Creating account..." : "Sign Up"}
                </button>

                <p style={styles.link}>
                    Already have an account?{" "}
                    <span onClick={() => navigate("/")}>
                        Login
                    </span>
                </p>
            </div>
        </PageWrapper>
    );
};

const styles = {
    container: {
        maxWidth: "380px",
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "var(--card-bg)",
        padding: "24px",
        borderRadius: "10px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
    },
    error: {
        color: "#ef4444",
        marginBottom: "10px"
    },
    success: {
        color: "#22c55e",
        marginBottom: "10px"
    },
    link: {
        marginTop: "16px",
        fontSize: "14px",
        cursor: "pointer"
    }
};

export default Signup;
