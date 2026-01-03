import { useState } from "react";
import PageWrapper from "../components/PageWrapper";

const Xerox = () => {
    const [pages, setPages] = useState("");
    const [printType, setPrintType] = useState("B&W");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Price logic (frontend-only)
    const pricePerPage = printType === "Color" ? 5 : 2;
    const totalAmount = pages ? pages * pricePerPage : 0;

    const handleOrder = () => {
        if (!pages || pages <= 0) {
            setError("Please enter valid number of pages");
            setSuccess("");
            return;
        }

        setError("");
        setLoading(true);

        // Simulate payment + order placement
        setTimeout(() => {
            setLoading(false);
            setSuccess("Xerox order placed successfully (UI only)");
            setPages("");
            setPrintType("B&W");
        }, 1000);
    };

    return (
        <PageWrapper title="Online Xerox Order">
            <p style={{ marginBottom: "16px" }}>
                Upload documents from hostel or classroom, pay online, and just come to collect prints.
            </p>

            {/* File Upload (UI only) */}
            <input type="file" />
            <br /><br />

            {/* Pages Input */}
            <input
                type="number"
                placeholder="Number of pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
            />
            <br /><br />

            {/* Print Type */}
            <select
                value={printType}
                onChange={(e) => setPrintType(e.target.value)}
            >
                <option value="B&W">Black & White</option>
                <option value="Color">Color</option>
            </select>
            <br /><br />

            {/* Price Display */}
            <p>
                <b>Total Amount:</b> ₹{totalAmount}
            </p>
            <br />

            {/* Error Message */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Success Message */}
            {success && <p style={{ color: "green" }}>{success}</p>}

            {/* Action Button */}
            <button onClick={handleOrder} disabled={loading}>
                {loading ? "Processing..." : "Pay & Place Order"}
            </button>
        </PageWrapper>
    );
};

export default Xerox;
