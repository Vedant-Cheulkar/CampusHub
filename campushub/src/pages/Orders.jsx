import PageWrapper from "../components/PageWrapper";
import { orders as initialOrders } from "../data/orders";
import { useNavigate } from "react-router-dom";


const Orders = () => {
    const navigate = useNavigate();

    // Helper to determine status badge class
    const getStatusClass = (status) => {
        switch (status) {
            case "Ready": return "status-ready"; // Blue
            case "Shipped": return "status-shipped"; // Yellow
            case "Delivered": return "status-delivered"; // Green
            case "Printing": return "status-printing"; // Orange
            default: return "status-default"; // Gray
        }
    };

    return (
        <PageWrapper title="My Orders">
            <style>{styles}</style>

            <div className="orders-container">

                {/* --- PAGE TITLE --- */}
                <div className="orders-header">
                    <h1 className="page-title">Your Orders</h1>
                </div>

                {/* --- TABS --- */}
                <div className="tabs-container">
                    <div className="tabs-list">
                        <a href="#" className="tab-item active">All Orders</a>
                        <a href="#" className="tab-item">Marketplace</a>
                        <a href="#" className="tab-item">Xerox</a>
                    </div>
                </div>

                {/* --- TABLE SECTION --- */}
                <div className="table-wrapper">
                    <div className="table-scroll">
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '20%' }}>Order ID</th>
                                    <th style={{ width: '15%' }}>Date</th>
                                    <th style={{ width: '30%' }}>Items/Service</th>
                                    <th style={{ width: '15%' }}>Total Price</th>
                                    <th style={{ width: '10%' }}>Status</th>
                                    <th style={{ width: '10%' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {initialOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="empty-row">
                                            You have not placed any orders yet.
                                        </td>
                                    </tr>
                                ) : (
                                    initialOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="text-secondary">#CH-{order.id}</td>
                                            <td className="text-secondary">
                                                {/* Fallback date if not in data */}
                                                {order.date || "Oct 26, 2023"}
                                            </td>
                                            <td className="text-secondary">
                                                {/* Fallback item logic */}
                                                {order.items || (order.pages ? `Xerox: ${order.pages} Pages` : "Marketplace Item")}
                                            </td>
                                            <td className="text-secondary">
                                                {/* Fallback price */}
                                                ${order.price || "15.00"}
                                            </td>
                                            <td>
                                                <div className="status-cell">
                                                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="action-link" onClick={() => navigate("/order-details")}>
                                                    View Details
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </PageWrapper>
    );
};

// --- CSS STYLES ---
const styles = `
    :root {
        --o-primary: #135bec;
        --o-bg: #f6f6f8;
        --o-card-bg: #ffffff;
        --o-text: #1e293b;
        --o-text-sub: #64748b;
        --o-border: #e2e8f0;
        --o-header-bg: #f1f5f9;
        
        /* Status Colors */
        --st-ready-bg: rgba(19, 91, 236, 0.15);
        --st-ready-txt: #135bec;
        
        --st-ship-bg: rgba(234, 179, 8, 0.15);
        --st-ship-txt: #ca8a04;
        
        --st-del-bg: rgba(34, 197, 94, 0.15);
        --st-del-txt: #16a34a;
        
        --st-print-bg: rgba(249, 115, 22, 0.15);
        --st-print-txt: #ea580c;
    }

    /* Dark Mode */
    :root:has(.dark), .dark, .dark-mode {
        --o-bg: #101622;
        --o-card-bg: #101622;
        --o-text: #f8fafc;
        --o-text-sub: #94a3b8;
        --o-border: rgba(255, 255, 255, 0.15);
        --o-header-bg: rgba(255, 255, 255, 0.05);
    }

    .orders-container {
        font-family: 'Lexend', sans-serif;
        color: var(--o-text);
        max-width: 60rem; /* approx 960px */
        margin: 0 auto;
        padding: 1.5rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    /* Header */
    .orders-header {
        padding: 1rem;
    }
    .page-title {
        font-size: 2.25rem;
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -0.033em;
    }

    /* Tabs */
    .tabs-container {
        padding-bottom: 0.75rem;
    }
    .tabs-list {
        display: flex;
        gap: 2rem;
        border-bottom: 1px solid var(--o-border);
        padding: 0 1rem;
    }
    .tab-item {
        padding: 1rem 0 0.8rem 0;
        font-size: 0.875rem;
        font-weight: 700;
        color: var(--o-text-sub);
        text-decoration: none;
        border-bottom: 3px solid transparent;
        transition: all 0.2s;
    }
    .tab-item:hover {
        color: var(--o-text);
    }
    .tab-item.active {
        color: var(--o-text);
        border-bottom-color: var(--o-primary);
    }

    /* Table Wrapper */
    .table-wrapper {
        padding: 0 1rem;
    }
    .table-scroll {
        border: 1px solid var(--o-border);
        border-radius: 0.5rem;
        overflow: hidden;
        background-color: var(--o-card-bg);
        overflow-x: auto; /* Scroll on mobile */
    }

    .orders-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 800px; /* Force scroll on small screens */
    }

    .orders-table th {
        background-color: var(--o-header-bg);
        text-align: left;
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--o-text);
    }

    .orders-table td {
        padding: 1rem;
        border-top: 1px solid var(--o-border);
        font-size: 0.875rem;
        vertical-align: middle;
        height: 72px;
    }

    .text-secondary {
        color: var(--o-text-sub);
    }

    .empty-row {
        text-align: center;
        padding: 3rem;
        color: var(--o-text-sub);
    }

    /* Status Badges */
    .status-cell {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .status-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .status-ready { background-color: var(--st-ready-bg); color: var(--st-ready-txt); }
    .status-shipped { background-color: var(--st-ship-bg); color: var(--st-ship-txt); }
    .status-delivered { background-color: var(--st-del-bg); color: var(--st-del-txt); }
    .status-printing { background-color: var(--st-print-bg); color: var(--st-print-txt); }
    .status-default { background-color: var(--o-header-bg); color: var(--o-text-sub); }

    /* Action Link */
    .action-link {
        color: var(--o-primary);
        font-weight: 700;
        font-size: 0.875rem;
        cursor: pointer;
        transition: opacity 0.2s;
    }
    .action-link:hover {
        opacity: 0.8;
    }
`;

export default Orders;