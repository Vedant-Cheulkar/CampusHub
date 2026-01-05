import PageWrapper from "../components/PageWrapper";
import { orders as initialOrders } from "../data/orders";

const Orders = () => {
    return (
        <PageWrapper title="My Orders">
            {initialOrders.length === 0 ? (
                // Empty state
                <p style={{ opacity: 0.8 }}>
                    You have not placed any orders yet.
                </p>
            ) : (
                // Orders list
                initialOrders.map((order) => (
                    <div
                        key={order.id}
                        style={styles.card}
                    >
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
        padding: "14px",
        borderRadius: "8px",
        marginBottom: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
    },
    orderId: {
        fontWeight: "600",
        marginBottom: "6px"
    },
    status: {
        padding: "2px 8px",
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
    }
};

export default Orders;
