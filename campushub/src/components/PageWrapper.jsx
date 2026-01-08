const PageWrapper = ({ title, children }) => {
    return (
        <div style={styles.container}>
            {/* Page Title */}
            <h2 style={styles.title}>{title}</h2>

            {/* Page Content */}
            <div style={styles.content}>
                {children}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh"
    },
    title: {
        marginTop: 0,
        marginBottom: "20px",
        fontSize: "22px",
        fontWeight: "600"
    },
    content: {
        backgroundColor: "var(--card-bg)",
        padding: "20px",
        borderRadius: "8px"
    }
};

export default PageWrapper;
