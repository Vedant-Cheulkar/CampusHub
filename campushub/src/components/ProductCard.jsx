const ProductCard = ({ name, price, image, onClick }) => {
    return (
        <div
            style={styles.card}
            onClick={onClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
            }}
        >
            {/* Product Image */}
            <img src={image} alt={name} style={styles.image} />

            {/* Product Info */}
            <h4 style={styles.title}>{name}</h4>
            <p style={styles.price}>₹{price}</p>

            {/* Action Button */}
            <button style={styles.button}>Buy</button>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: "var(--card-bg)",
        color: "var(--text-color)",
        padding: "14px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        cursor: "pointer"
    },
    image: {
        width: "100%",
        height: "150px",
        objectFit: "cover",
        borderRadius: "8px",
        marginBottom: "10px"
    },
    title: {
        fontSize: "15px",
        marginBottom: "6px"
    },
    price: {
        fontWeight: "bold",
        marginBottom: "10px"
    },
    button: {
        width: "100%"
    }
};

export default ProductCard;
