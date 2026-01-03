import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    const [user, setUser] = useState({
        name: "Rahul Patil",
        email: "rahul.patil@college.edu",
        role: "Student", // Student | Admin
        department: "Computer Engineering",
        avatar: ""
    });

    /* 🔹 Load from localStorage */
    useEffect(() => {
        const savedUser = localStorage.getItem("profileUser");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    /* 🔹 Save to localStorage */
    useEffect(() => {
        localStorage.setItem("profileUser", JSON.stringify(user));
    }, [user]);

    const handleChange = (e) =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setUser({ ...user, avatar: reader.result });
        };
        reader.readAsDataURL(file);
    };

    return (
        <PageWrapper title="My Profile">
            <div className="fade-in" style={styles.container}>

                {/* Avatar */}
                <div style={styles.avatarBox}>
                    {user.avatar ? (
                        <img src={user.avatar} alt="avatar" style={styles.avatarImg} />
                    ) : (
                        <div style={styles.avatarPlaceholder}>👤</div>
                    )}
                    <input type="file" onChange={handleImageUpload} />
                </div>

                {/* Tabs */}
                <div style={styles.tabs}>
                    {["profile", "orders", "wishlist"].map((tab) => (
                        <button
                            key={tab}
                            style={{
                                ...styles.tabBtn,
                                ...(activeTab === tab ? styles.activeTab : {})
                            }}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* TAB CONTENT */}
                {activeTab === "profile" && (
                    <>
                        {isEditing ? (
                            <>
                                <input name="name" value={user.name} onChange={handleChange} />
                                <br /><br />
                                <input
                                    name="department"
                                    value={user.department}
                                    onChange={handleChange}
                                />
                            </>
                        ) : (
                            <>
                                <h3>{user.name}</h3>
                                <p>{user.email}</p>
                                <p><b>Department:</b> {user.department}</p>
                            </>
                        )}

                        <p><b>Role:</b> {user.role}</p>

                        <button onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? "Save" : "Edit Profile"}
                        </button>

                        <button
                            style={styles.logoutBtn}
                            onClick={() => setShowLogout(true)}
                        >
                            Logout
                        </button>
                    </>
                )}

                {activeTab === "orders" && (
                    <div style={styles.card}>
                        <p>🖨️ Xerox Orders: 5</p>
                        <p>📦 Marketplace Purchases: 2</p>
                    </div>
                )}

                {activeTab === "wishlist" && (
                    <div style={styles.card}>
                        <p>❤️ Wishlist Items: 4</p>
                        <p>⭐ Saved for later</p>
                    </div>
                )}

                {/* Logout Modal */}
                {showLogout && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modal}>
                            <h3>Logout?</h3>
                            <p>Are you sure you want to logout?</p>
                            <button onClick={() => setShowLogout(false)}>Cancel</button>
                            <button style={styles.logoutBtn}>Confirm</button>
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
};

const styles = {
    container: {
        maxWidth: "420px",
        margin: "0 auto",
        textAlign: "center"
    },
    avatarBox: {
        marginBottom: "16px"
    },
    avatarImg: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover"
    },
    avatarPlaceholder: {
        fontSize: "64px"
    },
    tabs: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "16px"
    },
    tabBtn: {
        padding: "6px 10px",
        border: "1px solid #ccc",
        background: "transparent",
        cursor: "pointer"
    },
    activeTab: {
        backgroundColor: "var(--accent)",
        color: "#fff"
    },
    card: {
        backgroundColor: "var(--card-bg)",
        padding: "16px",
        borderRadius: "8px"
    },
    logoutBtn: {
        marginLeft: "10px",
        backgroundColor: "#ef4444"
    },
    modalOverlay: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
    },
    modal: {
        backgroundColor: "var(--card-bg)",
        padding: "20px",
        borderRadius: "10px"
    }
};

export default Profile;
