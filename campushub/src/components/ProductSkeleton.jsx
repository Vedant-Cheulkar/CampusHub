const ProductSkeleton = () => {
    return (
        <div style={styles.card}>
            <div style={styles.image}></div>
            <div style={styles.line}></div>
            <div style={styles.lineSmall}></div>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: "var(--card-bg)",
        padding: "14px",
        borderRadius: "10px"
    },
    image: {
        height: "150px",
        backgroundColor: "#e5e7eb",
        borderRadius: "8px",
        marginBottom: "10px"
    },
    line: {
        height: "14px",
        backgroundColor: "#e5e7eb",
        marginBottom: "8px",
        borderRadius: "4px"
    },
    lineSmall: {
        height: "12px",
        width: "60%",
        backgroundColor: "#e5e7eb",
        borderRadius: "4px"
    }
};

export default ProductSkeleton;
