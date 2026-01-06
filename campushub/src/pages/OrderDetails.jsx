import { Link, useParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const OrderDetails = () => {
    // In a real app, you would fetch this based on the ID from useParams()
    const { id } = useParams();

    // Mock Data based on your HTML
    const order = {
        id: "CH-12345",
        status: "Completed", // Options: Completed, Processing, Cancelled
        date: "October 26, 2023",
        paymentMethod: "Paid with Stripe",
        subtotal: "15.00",
        fee: "0.50",
        total: "15.50",
        items: [
            {
                id: 1,
                type: "product",
                name: "Used Physics Textbook",
                price: "10.00",
                qty: "1",
                image: "https://placehold.co/100x100?text=Book"
            },
            {
                id: 2,
                type: "service",
                name: "Xerox Service",
                price: "5.00",
                qty: "20 pages",
                details: {
                    doc: "CHEM_lab_report.pdf",
                    specs: "A4, Color, Double-sided"
                }
            }
        ]
    };

    return (
        <PageWrapper title={`Order #${order.id}`}>
            <style>{styles}</style>

            <div className="details-container">

                {/* --- BREADCRUMBS & TITLE --- */}
                <div className="header-section">
                    <div className="breadcrumbs">
                        <Link to="/orders" className="crumb-link">My Orders</Link>
                        <span className="crumb-sep">/</span>
                        <span className="crumb-current">Order #{order.id}</span>
                    </div>

                    <div className="title-row">
                        <h1 className="order-title">Order #{order.id}</h1>
                        <div className={`status-badge ${order.status.toLowerCase()}`}>
                            <span className="material-symbols-outlined icon-sm">check_circle</span>
                            <span>{order.status}</span>
                        </div>
                    </div>
                </div>

                {/* --- MAIN GRID LAYOUT --- */}
                <div className="details-grid">

                    {/* --- LEFT COLUMN (Summary) --- */}
                    <aside className="left-col">

                        {/* Summary Card */}
                        <div className="card summary-card">
                            <h2 className="card-heading">Order Summary</h2>
                            <div className="summary-list">
                                <div className="summary-item">
                                    <span className="summary-label">Order Date</span>
                                    <span className="summary-value">{order.date}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Total Amount</span>
                                    <span className="summary-value">${order.total}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Payment Method</span>
                                    <span className="summary-value">{order.paymentMethod}</span>
                                </div>
                            </div>
                        </div>

                        {/* Support Card */}
                        <div className="card support-card">
                            <p className="support-title">Having an issue with your order?</p>
                            <p className="support-text">Our support team is here to help you with any problem.</p>
                            <button className="btn-support">
                                <span className="material-symbols-outlined">support_agent</span>
                                Contact Support
                            </button>
                        </div>
                    </aside>

                    {/* --- RIGHT COLUMN (Items) --- */}
                    <div className="right-col">
                        <div className="card items-card">
                            <h2 className="card-heading border-b">Items in this Order</h2>

                            {/* Items List */}
                            <ul className="items-list">
                                {order.items.map((item) => (
                                    <li key={item.id} className="order-item">
                                        {/* Image / Icon */}
                                        <div className="item-visual">
                                            {item.type === "product" ? (
                                                <img src={item.image} alt={item.name} className="item-img" />
                                            ) : (
                                                <div className="item-icon-box">
                                                    <span className="material-symbols-outlined">print</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="item-info">
                                            <div className="item-header">
                                                <h3 className="item-name">{item.name}</h3>
                                                <p className="item-price">${item.price}</p>
                                            </div>

                                            {/* Extra details for Xerox */}
                                            {item.type === "service" && (
                                                <div className="item-specs">
                                                    <p>Document: <span className="spec-val">{item.details.doc}</span></p>
                                                    <p>Specs: <span className="spec-val">{item.details.specs}</span></p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="item-qty">
                                            <p>Qty: {item.qty}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Totals Footer */}
                            <div className="totals-section">
                                <div className="total-row">
                                    <span>Subtotal</span>
                                    <span>${order.subtotal}</span>
                                </div>
                                <div className="total-row">
                                    <span>Service Fee</span>
                                    <span>${order.fee}</span>
                                </div>
                                <div className="total-row grand-total">
                                    <span>Total</span>
                                    <span className="highlight-price">${order.total}</span>
                                </div>
                            </div>

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
        --od-primary: #135bec;
        --od-bg: #f6f6f8;
        --od-card-bg: #ffffff;
        --od-text: #111827;
        --od-text-sub: #6b7280;
        --od-border: #e5e7eb;
        
        --st-completed-bg: rgba(34, 197, 94, 0.1);
        --st-completed-txt: #22c55e;
    }

    /* Dark Mode */
    :root:has(.dark), .dark, .dark-mode {
        --od-bg: #101622;
        --od-card-bg: rgba(31, 41, 55, 0.5); /* Semi-transparent dark */
        --od-text: #f9fafb;
        --od-text-sub: #9ca3af;
        --od-border: #374151;
    }

    .details-container {
        font-family: 'Lexend', sans-serif;
        color: var(--od-text);
        max-width: 80rem; /* 7xl */
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    /* Header */
    .header-section {
        margin-bottom: 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .breadcrumbs {
        display: flex;
        gap: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
    }
    .crumb-link {
        color: var(--od-primary);
        text-decoration: none;
    }
    .crumb-link:hover { text-decoration: underline; }
    .crumb-sep { color: var(--od-text-sub); }
    .crumb-current { color: var(--od-text); }

    .title-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
    }

    .order-title {
        font-size: 2.25rem; /* 4xl */
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -0.033em;
    }

    .status-badge {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 500;
    }
    .status-badge.completed {
        background-color: var(--st-completed-bg);
        color: var(--st-completed-txt);
    }
    .icon-sm { font-size: 1rem; }

    /* Layout Grid */
    .details-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    @media (min-width: 1024px) {
        .details-grid {
            grid-template-columns: 1fr 2fr; /* 1/3 sidebar, 2/3 content */
        }
    }

    /* Cards */
    .card {
        background-color: var(--od-card-bg);
        border: 1px solid var(--od-border);
        border-radius: 0.75rem;
        padding: 1.5rem;
    }

    .card-heading {
        font-size: 1.125rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: var(--od-text);
    }
    .border-b {
        border-bottom: 1px solid var(--od-border);
        padding-bottom: 1rem;
    }

    /* Left Col Styling */
    .left-col {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .summary-item {
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
        border-top: 1px solid var(--od-border);
    }
    .summary-label { color: var(--od-text-sub); font-size: 0.875rem; }
    .summary-value { color: var(--od-text); font-size: 0.875rem; font-weight: 500; }

    .support-card {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        align-items: flex-start;
    }
    .support-title { font-weight: 600; }
    .support-text { font-size: 0.875rem; color: var(--od-text-sub); }
    
    .btn-support {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2.5rem;
        padding: 0 1rem;
        border-radius: 0.5rem;
        border: 1px solid rgba(19, 91, 236, 0.5);
        background: transparent;
        color: var(--od-primary);
        font-weight: 700;
        font-size: 0.875rem;
        cursor: pointer;
        margin-top: 0.5rem;
    }
    .btn-support:hover {
        background-color: rgba(19, 91, 236, 0.1);
    }

    /* Items List */
    .items-list {
        list-style: none;
        padding: 0;
    }

    .order-item {
        display: flex;
        padding: 1.5rem 0;
        border-bottom: 1px solid var(--od-border);
    }
    .order-item:last-child { border-bottom: none; }

    .item-visual {
        flex-shrink: 0;
        width: 6rem;
        height: 6rem;
        border-radius: 0.5rem;
        border: 1px solid var(--od-border);
        overflow: hidden;
        background-color: var(--od-bg);
    }

    .item-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .item-icon-box {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--od-text-sub);
    }
    .item-icon-box span { font-size: 3rem; }

    .item-info {
        margin-left: 1rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .item-name {
        font-size: 1rem;
        font-weight: 500;
        color: var(--od-text);
        margin: 0;
    }

    .item-price {
        margin: 0 0 0 1rem;
        font-weight: 500;
        color: var(--od-text);
    }

    .item-specs {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: var(--od-text-sub);
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    .spec-val {
        font-weight: 500;
        color: var(--od-text);
    }

    .item-qty {
        display: flex;
        align-items: flex-end;
        font-size: 0.875rem;
        color: var(--od-text-sub);
        padding-left: 1rem;
    }

    /* Totals Footer */
    .totals-section {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--od-border);
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .total-row {
        display: flex;
        justify-content: space-between;
        font-size: 0.875rem;
        color: var(--od-text-sub);
    }

    .grand-total {
        font-size: 1rem;
        font-weight: 700;
        color: var(--od-text);
    }
    .highlight-price {
        color: var(--od-primary);
    }
`;

export default OrderDetails;