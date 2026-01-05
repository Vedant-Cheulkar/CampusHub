import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
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
                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(storedUser)
                );

                navigate("/marketplace");
            } else {
                setError("Invalid email or password");
            }

            setLoading(false);
        }, 800);
    };

    return (
        <PageWrapper title="Login">
            <div style={styles.container} className="fade-in">
                <h3>Welcome Back 👋</h3>
                <p style={{ marginBottom: "16px" }}>
                    Login to continue to CampusHub
                </p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                {error && <p style={styles.error}>{error}</p>}

                <button onClick={handleLogin} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* Signup Link */}
                <p style={styles.link}>
                    Don’t have an account?{" "}
                    <span
                        style={styles.linkSpan}
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </p>

                {/* Demo Credentials */}
                <p style={styles.demo}>
                    <b>Demo Credentials</b><br />
                    Email: user@gmail.com<br />
                    Password: 123456
                </p>
            </div>
        </PageWrapper>
    );
};

const styles = {
    container: {
        maxWidth: "360px",
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
    link: {
        marginTop: "16px",
        fontSize: "14px"
    },
    linkSpan: {
        color: "var(--accent)",
        cursor: "pointer",
        fontWeight: "600"
    },
    demo: {
        marginTop: "20px",
        fontSize: "13px",
        opacity: 0.8
    }
};

export default Login;
