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
                <p>No print orders available.</p>
            ) : (
                orders.map((order) => (
                    <div
                        key={order.id}
                        style={{
                            background: "#ffffff",
                            padding: "14px",
                            borderRadius: "6px",
                            marginBottom: "12px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                        }}
                    >
                        <p>
                            <b>Order #{order.id}</b>
                        </p>
                        <p>Pages: {order.pages}</p>
                        <p>Status: {order.status}</p>

                        {order.status !== "Ready" && (
                            <button onClick={() => markAsReady(order.id)}>
                                Mark as Ready
                            </button>
                        )}
                    </div>
                ))
            )}
        </PageWrapper>
    );
};

export default Admin;
