import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { orders as initialOrders } from "../data/orders";

const Admin = () => {
    // Admin manages order status (frontend-only simulation)
    const [orders, setOrders] = useState(initialOrders);

    const markAsReady = (id) => {
        const updatedOrders = orders.map((order) =>
            order.id === id
                ? { ...order, status: "Ready" }
                : order
        );
        setOrders(updatedOrders);
    };

    return (
        <PageWrapper title="Xerox Admin Dashboard">
            {orders.length === 0 ? (
                <p style={{ opacity: 0.8 }}>
                    No print orders available.
                </p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} style={styles.card}>
                        <p style={styles.orderId}>
                            Order #{order.id}
                        </p>

                        <p>Pages: {order.pages}</p>

                        <p>
                            Status:{" "}
                            <span
                                style={{
                                    ...styles.status,
                                    ...(order.status === "Ready"
                                        ? styles.ready
                                        : styles.printing)
                                }}
                            >
                                {order.status}
                            </span>
                        </p>

                        {order.status !== "Ready" && (
                            <button
                                onClick={() => markAsReady(order.id)}
                                style={styles.actionBtn}
                            >
                                Mark as Ready
                            </button>
                        )}
                    </div>
                ))
            )}
        </PageWrapper>
    );
};

const styles = {
    card: {
        backgroundColor: "var(--card-bg)", // ✅ dark-mode safe
        color: "var(--text-color)",
        padding: "16px",
        borderRadius: "10px",
        marginBottom: "14px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.15)"
    },
    orderId: {
        fontWeight: "600",
        marginBottom: "6px"
    },
    status: {
        padding: "3px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "600"
    },
    ready: {
        backgroundColor: "#22c55e",
        color: "#ffffff"
    },
    printing: {
        backgroundColor: "#f59e0b",
        color: "#ffffff"
    },
    actionBtn: {
        marginTop: "10px"
    }
};

export default Admin;
