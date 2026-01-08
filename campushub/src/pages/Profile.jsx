import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const Profile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // --- STATE ---
    const [activeTab, setActiveTab] = useState("profile");
    const [showLogout, setShowLogout] = useState(false);
    const [loading, setLoading] = useState(false);

    // Initial User State matching the HTML fields
    const [user, setUser] = useState({
        firstName: "Aarav",
        lastName: "Sharma",
        email: "aarav.sharma@college.edu",
        course: "Computer Science",
        year: "3rd Year",
        phone: "+91 98765 43210",
        avatar: ""
    });

    // Load from LocalStorage
    useEffect(() => {
        const savedUser = localStorage.getItem("profileUser");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    // --- HANDLERS ---
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setUser({ ...user, avatar: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        setLoading(true);
        // Simulate API/Storage save
        setTimeout(() => {
            localStorage.setItem("profileUser", JSON.stringify(user));
            setLoading(false);
            alert("Profile updated successfully!");
        }, 800);
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInUser");
        navigate("/");
    };

    return (
        <PageWrapper title="My Profile">
            <style>{styles}</style>

            <div className="profile-layout">

                {/* --- SIDEBAR --- */}
                <aside className="profile-sidebar">
                    <div className="sidebar-brand">
                        <div className="brand-logo">
                            <span className="material-symbols-outlined">school</span>
                        </div>
                        <h1 className="brand-text">CampusHub</h1>
                    </div>

                    <nav className="sidebar-nav">
                        <button
                            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab("profile")}
                        >
                            <span className="material-symbols-outlined">person</span>
                            Profile
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                            onClick={() => setActiveTab("orders")}
                        >
                            <span className="material-symbols-outlined">archive</span>
                            My Orders
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                            onClick={() => setActiveTab("wishlist")}
                        >
                            <span className="material-symbols-outlined">favorite</span>
                            My Wishlist
                        </button>
                    </nav>

                    <div className="sidebar-footer">
                        <button className="nav-item logout" onClick={() => setShowLogout(true)}>
                            <span className="material-symbols-outlined">logout</span>
                            Logout
                        </button>
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <main className="profile-main">
                    <div className="content-container">
                        <h1 className="section-heading">
                            {activeTab === 'profile' ? 'My Profile' :
                                activeTab === 'orders' ? 'My Orders' : 'My Wishlist'}
                        </h1>

                        {activeTab === "profile" && (
                            <>
                                {/* Header Card */}
                                <div className="profile-header-card">
                                    <div className="header-info">
                                        <div className="avatar-wrapper group">
                                            <div
                                                className="avatar-img"
                                                style={{ backgroundImage: `url("${user.avatar || 'https://ui-avatars.com/api/?name=' + user.firstName + '+' + user.lastName}")` }}
                                            ></div>
                                            <div
                                                className="avatar-overlay"
                                                onClick={() => fileInputRef.current.click()}
                                            >
                                                <span className="material-symbols-outlined">edit</span>
                                            </div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                hidden
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                        </div>
                                        <div className="user-details">
                                            <h2 className="user-name">{user.firstName} {user.lastName}</h2>
                                            <p className="user-email">{user.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Details */}
                                <div className="form-card">
                                    <div className="card-header">
                                        <h2 className="card-title">Personal Details</h2>
                                        <button className="btn-icon-text">
                                            <span className="material-symbols-outlined">edit</span> Edit
                                        </button>
                                    </div>
                                    <div className="form-grid">
                                        <label className="input-group">
                                            <span className="label-text">First Name</span>
                                            <input className="form-input" name="firstName" value={user.firstName} onChange={handleChange} />
                                        </label>
                                        <label className="input-group">
                                            <span className="label-text">Last Name</span>
                                            <input className="form-input" name="lastName" value={user.lastName} onChange={handleChange} />
                                        </label>
                                        <label className="input-group">
                                            <span className="label-text">Course</span>
                                            <input className="form-input" name="course" value={user.course} onChange={handleChange} />
                                        </label>
                                        <label className="input-group">
                                            <span className="label-text">Year</span>
                                            <input className="form-input" name="year" value={user.year} onChange={handleChange} />
                                        </label>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="form-card">
                                    <div className="card-header">
                                        <h2 className="card-title">Contact Information</h2>
                                        <button className="btn-icon-text">
                                            <span className="material-symbols-outlined">edit</span> Edit
                                        </button>
                                    </div>
                                    <div className="form-grid">
                                        <label className="input-group">
                                            <span className="label-text">Email Address</span>
                                            <input className="form-input disabled" name="email" value={user.email} readOnly />
                                        </label>
                                        <label className="input-group">
                                            <span className="label-text">Phone Number</span>
                                            <input className="form-input" name="phone" value={user.phone} onChange={handleChange} />
                                        </label>
                                    </div>
                                </div>

                                {/* Action Bar */}
                                <div className="action-bar">
                                    <button className="btn-secondary" onClick={() => window.location.reload()}>Cancel</button>
                                    <button className="btn-primary" onClick={handleSave} disabled={loading}>
                                        {loading ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Placeholders for other tabs */}
                        {activeTab === "orders" && (
                            <div className="empty-tab">
                                <span className="material-symbols-outlined icon-large">archive</span>
                                <h3>No orders yet</h3>
                                <p>Your xerox and marketplace orders will appear here.</p>
                            </div>
                        )}

                        {activeTab === "wishlist" && (
                            <div className="empty-tab">
                                <span className="material-symbols-outlined icon-large">favorite</span>
                                <h3>Your wishlist is empty</h3>
                                <p>Save items you want to buy later.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Logout Modal */}
            {showLogout && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3 className="modal-title">Confirm Logout</h3>
                        <p className="modal-desc">Are you sure you want to log out of CampusHub?</p>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowLogout(false)}>Cancel</button>
                            <button className="btn-danger" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </PageWrapper>
    );
};

// --- CSS STYLES ---
const styles = `
    :root {
        --p-primary: #135bec;
        --p-primary-hover: #1d4ed8;
        --p-bg-body: #f6f6f8;
        --p-bg-sidebar: #ffffff;
        --p-bg-card: #ffffff;
        --p-bg-input: #f8fafc;
        --p-border: #e2e8f0;
        --p-text: #1e293b;
        --p-text-sub: #64748b;
        --p-danger: #ef4444;
    }

    /* Dark Mode */
    :root:has(.dark), .dark, .dark-mode {
        --p-bg-body: #101622; /* Matches design */
        --p-bg-sidebar: #101622;
        --p-bg-card: #192233;
        --p-bg-input: #101622;
        --p-border: #324467;
        --p-text: #ffffff;
        --p-text-sub: #92a4c9;
    }

    .profile-layout {
        display: flex;
        min-height: calc(100vh - 70px); /* Subtract nav height */
        background-color: var(--p-bg-body);
        color: var(--p-text);
        font-family: 'Lexend', sans-serif;
    }

    /* --- SIDEBAR --- */
    .profile-sidebar {
        width: 16rem; /* 64 */
        background-color: var(--p-bg-sidebar);
        border-right: 1px solid var(--p-border);
        display: none; /* Hidden on mobile */
        flex-direction: column;
        padding: 1rem;
        position: sticky;
        top: 70px; /* Below Navbar */
        height: calc(100vh - 70px);
    }
    @media (min-width: 768px) {
        .profile-sidebar { display: flex; }
    }

    .sidebar-brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 2rem;
        padding: 0.5rem;
    }
    .brand-logo {
        background-color: rgba(19, 91, 236, 0.2);
        color: var(--p-primary);
        padding: 0.5rem;
        border-radius: 0.5rem;
        display: flex;
    }
    .brand-text {
        font-size: 1.25rem;
        font-weight: 700;
    }

    .sidebar-nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        flex: 1;
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        border-radius: 0.5rem;
        color: var(--p-text-sub);
        font-weight: 500;
        font-size: 0.875rem;
        background: transparent;
        border: none;
        cursor: pointer;
        width: 100%;
        text-align: left;
        transition: all 0.2s;
    }
    .nav-item:hover {
        background-color: rgba(255, 255, 255, 0.05);
        color: var(--p-text);
    }
    .nav-item.active {
        background-color: rgba(19, 91, 236, 0.2);
        color: var(--p-primary);
    }
    .nav-item.logout:hover {
        color: var(--p-danger);
        background-color: rgba(239, 68, 68, 0.1);
    }

    /* --- MAIN --- */
    .profile-main {
        flex: 1;
        padding: 2rem;
        overflow-y: auto;
    }

    .content-container {
        max-width: 56rem; /* 4xl */
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .section-heading {
        font-size: 1.875rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }

    /* Cards */
    .profile-header-card, .form-card {
        background-color: var(--p-bg-card);
        border: 1px solid var(--p-border);
        border-radius: 0.75rem;
        padding: 1.5rem;
    }

    /* Profile Header */
    .profile-header-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .header-info {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }
    .avatar-wrapper {
        position: relative;
        width: 6rem;
        height: 6rem;
        cursor: pointer;
    }
    .avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        background-color: var(--p-bg-input);
    }
    .avatar-overlay {
        position: absolute;
        inset: 0;
        background-color: rgba(0,0,0,0.5);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.2s;
        color: white;
    }
    .avatar-wrapper:hover .avatar-overlay { opacity: 1; }
    
    .user-name { font-size: 1.5rem; font-weight: 700; line-height: 1.2; }
    .user-email { color: var(--p-text-sub); font-size: 1rem; }

    /* Forms */
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid var(--p-border);
        padding-bottom: 1rem;
    }
    .card-title { font-size: 1.25rem; font-weight: 700; }
    
    .btn-icon-text {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--p-text);
        background: transparent;
        border: 1px solid var(--p-border);
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        cursor: pointer;
    }
    .btn-icon-text:hover { background-color: var(--p-bg-input); }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    @media (min-width: 768px) {
        .form-grid { grid-template-columns: 1fr 1fr; }
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .label-text {
        color: var(--p-text-sub);
        font-size: 0.875rem;
        font-weight: 500;
    }
    .form-input {
        height: 3rem;
        background-color: var(--p-bg-input);
        border: 1px solid var(--p-border);
        border-radius: 0.5rem;
        padding: 0 1rem;
        color: var(--p-text);
        font-size: 1rem;
        outline: none;
    }
    .form-input:focus {
        border-color: var(--p-primary);
        box-shadow: 0 0 0 2px rgba(19, 91, 236, 0.2);
    }
    .form-input.disabled {
        opacity: 0.7;
        cursor: not-allowed;
        color: var(--p-text-sub);
    }

    /* Actions */
    .action-bar {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1rem;
    }
    .btn-primary {
        background-color: var(--p-primary);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 700;
        cursor: pointer;
    }
    .btn-secondary {
        background: transparent;
        border: 1px solid var(--p-border);
        color: var(--p-text);
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 700;
        cursor: pointer;
    }

    /* Empty States */
    .empty-tab {
        background-color: var(--p-bg-card);
        border: 1px solid var(--p-border);
        border-radius: 0.75rem;
        padding: 4rem;
        text-align: center;
        color: var(--p-text-sub);
    }
    .icon-large { font-size: 4rem; margin-bottom: 1rem; opacity: 0.5; }

    /* Modal */
    .modal-overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
    }
    .modal-box {
        background-color: var(--p-bg-card);
        padding: 2rem;
        border-radius: 0.75rem;
        width: 90%;
        max-width: 400px;
        text-align: center;
        border: 1px solid var(--p-border);
    }
    .modal-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
    .modal-desc { color: var(--p-text-sub); margin-bottom: 1.5rem; }
    .modal-actions { display: flex; gap: 1rem; justify-content: center; }
    .btn-danger {
        background-color: var(--p-danger);
        color: white;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
    }
`;

export default Profile;