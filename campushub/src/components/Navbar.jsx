import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState("light");

    // Apply theme to HTML root
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <nav style={styles.nav}>
            {/* Logo */}
            <div style={styles.logo}>CampusHub</div>

            {/* Right controls (theme + hamburger) */}
            <div style={styles.controls}>
                {/* Theme Toggle */}
                <button
                    style={styles.themeBtn}
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    aria-label="Toggle theme"
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>

                {/* Hamburger (mobile) */}
                <div
                    style={styles.hamburger}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </div>
            </div>

            {/* Navigation Links */}
            <div
                style={{
                    ...styles.links,
                    ...(menuOpen ? styles.linksOpen : {})
                }}
            >
                <NavLink to="/home" style={navLinkStyle} onClick={() => setMenuOpen(false)}>
                    Home
                </NavLink>
                <NavLink to="/marketplace" style={navLinkStyle} onClick={() => setMenuOpen(false)}>
                    Marketplace
                </NavLink>
                <NavLink to="/add-product" style={navLinkStyle} onClick={() => setMenuOpen(false)}>
                    Sell
                </NavLink>
                <NavLink to="/xerox" style={navLinkStyle} onClick={() => setMenuOpen(false)}>
                    Xerox
                </NavLink>
                <NavLink to="/orders" style={navLinkStyle} onClick={() => setMenuOpen(false)}>
                    Orders
                </NavLink>
                <NavLink to="/admin" style={navLinkStyle} onClick={() => setMenuOpen(false)}>
                    Admin
                </NavLink>
                <NavLink to="/profile" style={navLinkStyle}>
                    👤 Profile
                </NavLink>
            </div>
        </nav>
    );
};

/* Active link styling */
const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "var(--accent)" : "var(--nav-text)",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: isActive ? "600" : "400",
    borderBottom: isActive ? "2px solid var(--accent)" : "none",
    paddingBottom: "4px"
});

/* Styles */
const styles = {
    nav: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "var(--nav-bg)",
        color: "var(--nav-text)",
        padding: "14px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap"
    },
    logo: {
        fontSize: "20px",
        fontWeight: "bold"
    },
    controls: {
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },
    themeBtn: {
        background: "transparent",
        border: "none",
        fontSize: "18px",
        cursor: "pointer",
        color: "var(--nav-text)"
    },
    hamburger: {
        display: "none",
        fontSize: "24px",
        cursor: "pointer",
        color: "var(--nav-text)"
    },
    links: {
        display: "flex",
        gap: "16px"
    },
    linksOpen: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "12px"
    }
};

export default Navbar;
