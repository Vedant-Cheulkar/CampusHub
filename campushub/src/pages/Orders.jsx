import PageWrapper from "../components/PageWrapper";
import { orders as initialOrders } from "../data/orders";

const Orders = () => {
    return (
        <PageWrapper title="My Orders">
            {initialOrders.length === 0 ? (
                // Empty state
                <p>You have not placed any orders yet.</p>
            ) : (
                // Orders list
                initialOrders.map((order) => (
                    <div
                        key={order.id}
                        style={{
                            background: "#ffffff",
                            padding: "12px",
                            borderRadius: "6px",
                            marginBottom: "10px",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
                        }}
                    >
                        <p>
                            <b>Order #{order.id}</b>
                        </p>
                        <p>Pages: {order.pages}</p>
                        <p>Status: {order.status}</p>
                    </div>
                ))
            )}
        </PageWrapper>
    );
};

export default Orders;
