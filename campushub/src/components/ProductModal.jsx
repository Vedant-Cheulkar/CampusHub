import { useEffect } from "react";

const ProductModal = ({ product, onClose }) => {
    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        // Prevent background scroll
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleEsc);

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    if (!product) return null;

    return (
        <div
            className="modal-overlay"
            style={styles.overlay}
            onClick={onClose}
        >
            <div
                className="modal-content"
                style={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button style={styles.closeBtn} onClick={onClose}>
                    ✕
                </button>

                {/* Image */}
                <img
                    src={product.image}
                    alt={product.name}
                    style={styles.image}
                />

                {/* Details */}
                <h3>{product.name}</h3>
                <p><b>Category:</b> {product.category}</p>
                <p><b>Price:</b> ₹{product.price}</p>

                <button style={{ width: "100%", marginTop: "12px" }}>
                    Buy Now
                </button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)", // 🔥 premium feel
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
    },
    modal: {
        backgroundColor: "var(--card-bg)",
        color: "var(--text-color)",
        padding: "20px",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "420px",
        position: "relative",
        boxShadow: "0 20px 40px rgba(0,0,0,0.25)"
    },
    closeBtn: {
        position: "absolute",
        top: "10px",
        right: "12px",
        background: "transparent",
        border: "none",
        fontSize: "18px",
        cursor: "pointer",
        color: "var(--text-color)"
    },
    image: {
        width: "100%",
        height: "220px",
        objectFit: "cover",
        borderRadius: "10px",
        marginBottom: "14px"
    }
};

export default ProductModal;
