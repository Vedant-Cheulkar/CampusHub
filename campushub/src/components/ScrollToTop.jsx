import { useEffect, useState } from "react";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={styles.button}
        >
            ⬆️
        </button>
    );
};

const styles = {
    button: {
        position: "fixed",
        bottom: "30px",
        right: "30px",
        padding: "10px 12px",
        borderRadius: "50%",
        fontSize: "18px",
        zIndex: 1000
    }
};

export default ScrollToTop;
