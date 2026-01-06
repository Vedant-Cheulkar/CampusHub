import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Check local storage for theme preference on load
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const location = useLocation();

    // Apply theme to HTML root and save to local storage
    useEffect(() => {
        const root = document.documentElement;

        // Apply data-theme for generic use
        root.setAttribute("data-theme", theme);

        // Apply 'dark' class for the specific CSS selectors used in this design system
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    // Close mobile menu when route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <>
            <style>{styles}</style>

            {/* Spacer to prevent content from hiding behind fixed navbar */}
            <div className="nav-spacer"></div>

            <nav className="navbar">
                <div className="nav-container">

                    {/* 1. Logo Section */}
                    <div className="nav-brand">
                        <div className="brand-icon">
                            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 9l4 1.5V17a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6.5L23 9l-11-7zm-2 13H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V5h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V5h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2z"></path></svg>
                        </div>
                        <span className="brand-text">CampusHub</span>
                    </div>

                    {/* 2. Desktop Links (Hidden on Mobile) */}
                    <div className="nav-links desktop-only">
                        <NavLink to="/home" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
                        <NavLink to="/marketplace" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Marketplace</NavLink>
                        <NavLink to="/xerox" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Xerox</NavLink>
                        <NavLink to="/orders" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Orders</NavLink>
                        <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Admin</NavLink>
                    </div>

                    {/* 3. Right Controls */}
                    <div className="nav-actions">

                        {/* Sell Button (Desktop) */}
                        <NavLink to="/add-product" className="sell-btn desktop-only">
                            Sell Item
                        </NavLink>

                        {/* Theme Toggle */}
                        <button
                            className="icon-btn"
                            onClick={toggleTheme}
                            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === "light" ? "🌙" : "☀️"}
                        </button>

                        {/* Profile Icon */}
                        <NavLink to="/profile" className="profile-btn">
                            <div className="avatar"></div>
                        </NavLink>

                        {/* Hamburger (Mobile Only) */}
                        <button
                            className="hamburger mobile-only"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <span className="material-symbols-outlined">
                                {menuOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>

                {/* 4. Mobile Menu Dropdown */}
                <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                    <NavLink to="/home" className="mobile-link">Home</NavLink>
                    <NavLink to="/marketplace" className="mobile-link">Marketplace</NavLink>
                    <NavLink to="/add-product" className="mobile-link highlight">Sell Item</NavLink>
                    <NavLink to="/xerox" className="mobile-link">Xerox</NavLink>
                    <NavLink to="/orders" className="mobile-link">Orders</NavLink>
                    <NavLink to="/admin" className="mobile-link">Admin</NavLink>
                    <NavLink to="/profile" className="mobile-link">Profile</NavLink>
                </div>
            </nav>
        </>
    );
};

// --- CSS STYLES ---
const styles = `
    :root {
        --nav-h: 70px;
        --c-primary: #135bec;
        --c-primary-hover: #1d4ed8;
        --c-bg-nav: #ffffff;
        --c-text-nav: #1e293b;
        --c-text-sub: #64748b;
        --c-border: #e2e8f0;
        --c-hover-bg: #f1f5f9;
    }

    /* Dark Mode Variables */
    :root:has(.dark), .dark {
        --c-bg-nav: #101622; /* Dark Blue/Black background */
        --c-text-nav: #f8fafc;
        --c-text-sub: #94a3b8;
        --c-border: #1e293b;
        --c-hover-bg: #1e293b;
    }

    /* --- LAYOUT --- */
    .nav-spacer {
        height: var(--nav-h);
        width: 100%;
    }

    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: var(--nav-h);
        background-color: var(--c-bg-nav);
        border-bottom: 1px solid var(--c-border);
        z-index: 1000;
        font-family: 'Lexend', sans-serif;
        transition: background-color 0.3s, border-color 0.3s;
    }

    .nav-container {
        max-width: 80rem; /* Max width constraint */
        margin: 0 auto;
        padding: 0 1.5rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    /* --- BRAND --- */
    .nav-brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 700;
        font-size: 1.25rem;
        color: var(--c-text-nav);
    }
    .brand-icon {
        width: 24px;
        height: 24px;
        color: var(--c-primary);
    }

    /* --- DESKTOP LINKS --- */
    .nav-links {
        display: flex;
        gap: 2rem;
        height: 100%;
    }

    .nav-link {
        display: flex;
        align-items: center;
        height: 100%;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--c-text-sub);
        text-decoration: none;
        border-bottom: 2px solid transparent;
        transition: all 0.2s;
    }

    .nav-link:hover {
        color: var(--c-text-nav);
    }

    .nav-link.active {
        color: var(--c-text-nav);
        border-bottom-color: var(--c-primary);
    }

    /* --- ACTIONS --- */
    .nav-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .sell-btn {
        background-color: var(--c-primary);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        text-decoration: none;
        transition: background 0.2s;
    }
    .sell-btn:hover {
        background-color: var(--c-primary-hover);
    }

    .icon-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: var(--c-text-nav);
        transition: background 0.2s;
    }
    .icon-btn:hover {
        background-color: var(--c-hover-bg);
    }

    .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: var(--c-border);
        background-image: url('https://ui-avatars.com/api/?name=User&background=random');
        background-size: cover;
        cursor: pointer;
    }

    .hamburger {
        background: transparent;
        border: none;
        color: var(--c-text-nav);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    /* Using material symbols if available, or fallback to text */
    .material-symbols-outlined {
        font-family: 'Material Symbols Outlined', sans-serif;
        font-size: 24px;
    }

    /* --- MOBILE MENU --- */
    .mobile-menu {
        position: absolute;
        top: var(--nav-h);
        left: 0;
        width: 100%;
        background-color: var(--c-bg-nav);
        border-bottom: 1px solid var(--c-border);
        display: flex;
        flex-direction: column;
        padding: 0;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-in-out;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .mobile-menu.open {
        max-height: 400px; /* Approx height */
        padding: 1rem 0;
    }

    .mobile-link {
        padding: 0.75rem 1.5rem;
        color: var(--c-text-nav);
        text-decoration: none;
        font-weight: 500;
        border-left: 3px solid transparent;
    }

    .mobile-link:hover {
        background-color: var(--c-hover-bg);
    }
    
    .mobile-link.active {
        color: var(--c-primary);
        border-left-color: var(--c-primary);
        background-color: var(--c-hover-bg);
    }

    .mobile-link.highlight {
        color: var(--c-primary);
        font-weight: 700;
    }

    /* --- RESPONSIVE UTILITIES --- */
    .mobile-only { display: none; }
    
    @media (max-width: 768px) {
        .desktop-only { display: none; }
        .mobile-only { display: flex; }
        
        .nav-links { display: none; } /* Hide center links on mobile */
    }
`;

export default Navbar;