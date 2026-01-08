import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const Home = () => {
    const navigate = useNavigate();

    // --- MOCK DATA ---
    const userName = "Alex"; // This would come from user state/localStorage

    const quickLinks = [
        {
            title: "Browse Marketplace",
            sub: "Find deals from students",
            icon: "storefront",
            path: "/marketplace"
        },
        {
            title: "Place Xerox Order",
            sub: "Upload docs for printing",
            icon: "print",
            path: "/xerox"
        },
        {
            title: "View My Orders",
            sub: "Check order statuses",
            icon: "receipt_long",
            path: "/orders"
        },
        {
            title: "My Profile",
            sub: "Manage account",
            icon: "person",
            path: "/profile"
        },
    ];

    const newsItems = [
        {
            title: "Annual Tech Fest 'Innovate 2024'",
            desc: "Registrations are now open for all students.",
            date: "Jan 15",
            icon: "campaign"
        },
        {
            title: "Library hours extended",
            desc: "Open 24/7 until February 2nd for exams.",
            date: "Jan 12",
            icon: "calendar_month"
        },
        {
            title: "Wi-Fi Maintenance Schedule",
            desc: "Maintenance on Jan 18th, 2 AM - 4 AM.",
            date: "Jan 10",
            icon: "warning"
        }
    ];

    const featuredItems = [
        { name: "Calculus Textbook", condition: "Gently Used", price: "45.00", img: "https://placehold.co/100x100/orange/white?text=Book" },
        { name: "Study Chair", condition: "Like new", price: "80.00", img: "https://placehold.co/100x100/333/white?text=Chair" },
        { name: "Mini Fridge", condition: "1 year old", price: "50.00", img: "https://placehold.co/100x100/blue/white?text=Fridge" },
    ];

    return (
        <PageWrapper>
            <style>{styles}</style>

            <div className="home-container">

                {/* --- WELCOME HEADER --- */}
                <div className="welcome-section">
                    <h1 className="welcome-title">Welcome back, {userName}!</h1>
                    <p className="welcome-sub">Let's get your day started.</p>
                </div>

                {/* --- QUICK ACCESS GRID --- */}
                <div className="quick-grid">
                    {quickLinks.map((link, index) => (
                        <div
                            key={index}
                            className="quick-card"
                            onClick={() => navigate(link.path)}
                        >
                            <div className="card-icon-box">
                                <span className="material-symbols-outlined card-icon">{link.icon}</span>
                            </div>
                            <div className="card-text">
                                <h3 className="card-title">{link.title}</h3>
                                <p className="card-sub">{link.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- SPLIT LAYOUT --- */}
                <div className="split-grid">

                    {/* Left: News */}
                    <div className="news-section">
                        <h2 className="section-title">Campus News & Alerts</h2>
                        <div className="news-list">
                            {newsItems.map((item, index) => (
                                <div key={index} className="news-card">
                                    <div className="news-left">
                                        <div className="news-icon-box">
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </div>
                                        <div className="news-content">
                                            <p className="news-title">{item.title}</p>
                                            <p className="news-desc">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="news-date">{item.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Featured */}
                    <div className="featured-section">
                        <h2 className="section-title">Featured on Marketplace</h2>
                        <div className="featured-list">
                            {featuredItems.map((item, index) => (
                                <div key={index} className="feat-card">
                                    <div
                                        className="feat-img"
                                        style={{ backgroundImage: `url('${item.img}')` }}
                                    ></div>
                                    <div className="feat-content">
                                        <p className="feat-name">{item.name}</p>
                                        <p className="feat-cond">{item.condition}</p>
                                        <p className="feat-price">${item.price}</p>
                                    </div>
                                </div>
                            ))}
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
        --h-primary: #135bec;
        --h-bg: #f6f6f8;
        --h-card-bg: #ffffff;
        --h-card-hover: #f1f5f9;
        --h-text: #1e293b;
        --h-text-sub: #64748b;
        --h-icon-bg: rgba(19, 91, 236, 0.1);
        --h-border: rgba(0,0,0,0.05);
    }

    /* Dark Mode */
    :root:has(.dark), .dark, .dark-mode {
        --h-bg: #101622;
        --h-card-bg: rgba(30, 41, 59, 0.4); /* Slate-800/40 equivalent */
        --h-card-hover: rgba(30, 41, 59, 0.8);
        --h-text: #ffffff;
        --h-text-sub: #94a3b8;
        --h-icon-bg: rgba(19, 91, 236, 0.2);
        --h-border: rgba(255,255,255,0.05);
    }

    .home-container {
        font-family: 'Lexend', sans-serif;
        color: var(--h-text);
        max-width: 80rem; /* 5xl equivalent */
        margin: 0 auto;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    /* Welcome Section */
    .welcome-section {
    }
    .welcome-title {
        font-size: 2.25rem;
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -0.033em;
        margin-bottom: 0.5rem;
    }
    .welcome-sub {
        color: var(--h-text-sub);
        font-size: 1rem;
    }

    /* Quick Grid */
    .quick-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1.5rem;
    }
    @media (min-width: 640px) { .quick-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .quick-grid { grid-template-columns: repeat(4, 1fr); } }

    .quick-card {
        background-color: var(--h-card-bg);
        border-radius: 0.75rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 1px solid var(--h-border);
    }
    .quick-card:hover {
        background-color: var(--h-card-hover);
        transform: translateY(-2px);
    }

    .card-icon-box {
        width: 100%;
        aspect-ratio: 16/9;
        background-color: var(--h-icon-bg);
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .card-icon {
        font-size: 3rem;
        color: var(--h-primary);
    }
    .card-text {
        display: flex;
        flex-direction: column;
    }
    .card-title {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
    }
    .card-sub {
        font-size: 0.875rem;
        color: var(--h-text-sub);
    }

    /* Split Grid */
    .split-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    @media (min-width: 1024px) {
        .split-grid {
            grid-template-columns: 2fr 1fr; /* 2/3 News, 1/3 Featured */
        }
    }

    .section-title {
        font-size: 1.375rem;
        font-weight: 700;
        margin-bottom: 1rem;
        padding-top: 0.5rem;
    }

    /* News List */
    .news-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    .news-card {
        background-color: var(--h-card-bg);
        border-radius: 0.5rem;
        padding: 0.75rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 72px;
    }
    .news-left {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .news-icon-box {
        width: 3rem;
        height: 3rem;
        background-color: rgba(51, 65, 85, 0.5); /* slate-700 equivalent */
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--h-primary);
    }
    .news-content {
        display: flex;
        flex-direction: column;
    }
    .news-title {
        font-weight: 500;
        font-size: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .news-desc {
        color: var(--h-text-sub);
        font-size: 0.875rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .news-date {
        font-size: 0.875rem;
        color: var(--h-text-sub);
        white-space: nowrap;
        display: none;
    }
    @media (min-width: 640px) { .news-date { display: block; } }

    /* Featured List */
    .featured-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .feat-card {
        background-color: var(--h-card-bg);
        border-radius: 0.5rem;
        padding: 0.75rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .feat-img {
        width: 5rem;
        height: 5rem;
        border-radius: 0.5rem;
        background-size: cover;
        background-position: center;
        background-color: #334155;
        flex-shrink: 0;
    }
    .feat-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .feat-name {
        font-weight: 500;
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .feat-cond {
        color: var(--h-text-sub);
        font-size: 0.875rem;
    }
    .feat-price {
        color: var(--h-primary);
        font-weight: 700;
        font-size: 1rem;
        margin-top: 0.25rem;
    }
`;

export default Home;