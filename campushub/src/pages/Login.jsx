import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import InputField from "../components/InputField";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            setError("All fields are required");
            return;
        }
        setError("");
        alert("Login successful (UI only)");
    };

    return (
        <PageWrapper title="Login">
            <InputField
                placeholder="College Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={handleLogin}>Login</button>
        </PageWrapper>
    );
};

export default Login;
