import { useState, useRef } from "react";
import PageWrapper from "../components/PageWrapper";

const Xerox = () => {
    // --- EXISTING LOGIC ---
    const [pages, setPages] = useState("");
    const [printType, setPrintType] = useState("B&W"); // "B&W" or "Color"
    const [sidedness, setSidedness] = useState("Single"); // New UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // --- NEW UI STATE (File Handling) ---
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([
        { name: "lecture_notes.pdf", size: "2.4 MB" },
        { name: "assignment_brief.docx", size: "1.1 MB" }
    ]);

    // Price logic (Using your Rupee logic: 5 for Color, 2 for B&W)
    const pricePerPage = printType === "Color" ? 5 : 2;
    // Calculate total: If pages is empty, 0. Otherwise pages * price
    const totalAmount = pages ? parseInt(pages) * pricePerPage : 0;

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
            setSuccess("Xerox order placed successfully!");
            // Reset form
            setPages("");
            setPrintType("B&W");
            setFiles([]);
        }, 1500);
    };

    // UI Helpers
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const newFile = {
                name: e.target.files[0].name,
                size: (e.target.files[0].size / 1024 / 1024).toFixed(2) + " MB"
            };
            setFiles([...files, newFile]);
        }
    };

    const removeFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    return (
        <PageWrapper title="Xerox Order">
            <style>{styles}</style>

            <div className="xerox-container">
                {/* --- HEADER --- */}
                <div className="page-header">
                    <h1 className="page-title">Xerox Ordering System</h1>
                    <p className="page-subtitle">Upload your documents and configure the print options below.</p>
                </div>

                <div className="xerox-grid">
                    {/* --- LEFT COLUMN: CONFIG --- */}
                    <div className="left-col">

                        {/* 1. File Upload Section */}
                        <div className="section-block">
                            <h2 className="section-title">Upload Your Documents</h2>

                            {/* Drag & Drop Area */}
                            <div className="upload-box" onClick={() => fileInputRef.current.click()}>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    hidden
                                    onChange={handleFileChange}
                                />
                                <div className="upload-content">
                                    <p className="upload-title">Drag & Drop Files Here</p>
                                    <p className="upload-subtitle">or click to browse from your device.</p>
                                </div>
                                <button className="btn-browse">Browse Files</button>
                            </div>

                            {/* File List */}
                            <div className="file-list">
                                {files.map((file, index) => (
                                    <div key={index} className="file-item">
                                        <div className="file-info">
                                            <div className="file-icon">
                                                <span className="material-symbols-outlined">description</span>
                                            </div>
                                            <div className="file-details">
                                                <p className="file-name">{file.name}</p>
                                                <p className="file-size">{file.size}</p>
                                            </div>
                                        </div>
                                        <button className="btn-delete" onClick={() => removeFile(index)}>
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                ))}
                                {files.length === 0 && <p className="no-files">No files uploaded yet.</p>}
                            </div>
                        </div>

                        {/* 2. Configuration Section */}
                        <div className="section-block">
                            <h2 className="section-title">Configure Your Order</h2>
                            <div className="config-card">

                                {/* Total Pages Input */}
                                <div className="form-group">
                                    <label className="form-label" htmlFor="pages">Total Number of Pages</label>
                                    <input
                                        className="form-input"
                                        id="pages"
                                        type="number"
                                        placeholder="e.g. 25"
                                        value={pages}
                                        onChange={(e) => setPages(e.target.value)}
                                    />
                                </div>

                                {/* Print Type Toggle */}
                                <div className="form-group">
                                    <label className="form-label">Print Type</label>
                                    <div className="toggle-group">
                                        <button
                                            className={`toggle-btn ${printType === "B&W" ? "active" : ""}`}
                                            onClick={() => setPrintType("B&W")}
                                        >
                                            Black & White (₹2)
                                        </button>
                                        <button
                                            className={`toggle-btn ${printType === "Color" ? "active" : ""}`}
                                            onClick={() => setPrintType("Color")}
                                        >
                                            Color (₹5)
                                        </button>
                                    </div>
                                </div>

                                {/* Sidedness Toggle (Visual Only for now) */}
                                <div className="form-group">
                                    <label className="form-label">Sided</label>
                                    <div className="toggle-group">
                                        <button
                                            className={`toggle-btn ${sidedness === "Single" ? "active" : ""}`}
                                            onClick={() => setSidedness("Single")}
                                        >
                                            Single-Sided
                                        </button>
                                        <button
                                            className={`toggle-btn ${sidedness === "Double" ? "active" : ""}`}
                                            onClick={() => setSidedness("Double")}
                                        >
                                            Double-Sided
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: SUMMARY --- */}
                    <div className="right-col">
                        <div className="sticky-summary">
                            <h2 className="section-title">Order Summary</h2>
                            <div className="summary-card">
                                <div className="summary-row">
                                    <span>Total Pages</span>
                                    <span className="summary-val">{pages || 0}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Cost per Page</span>
                                    <span className="summary-val">₹{pricePerPage}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Print Type</span>
                                    <span className="summary-val">{printType}</span>
                                </div>

                                <div className="divider"></div>

                                <div className="summary-total">
                                    <span className="total-label">Estimated Total</span>
                                    <span className="total-val">₹{totalAmount}</span>
                                </div>

                                {/* Feedback Messages */}
                                {error && <div className="msg-error">{error}</div>}
                                {success && <div className="msg-success">{success}</div>}

                                <button
                                    className="btn-place-order"
                                    onClick={handleOrder}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Place Order"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

// --- CSS STYLES ---
const styles = `
    :root {
        --x-primary: #135bec;
        --x-primary-hover: #1d4ed8;
        --x-bg: #f6f6f8;
        --x-card-bg: #ffffff; /* Light mode card */
        --x-card-inner: #f8fafc; /* Inner gray areas */
        --x-text: #1e293b;
        --x-text-sub: #64748b;
        --x-border: #e2e8f0;
        --x-danger: #ef4444;
        --x-success: #10b981;
    }

    /* Dark Mode Overrides */
    :root:has(.dark), .dark, .dark-mode {
        --x-bg: #101622;
        --x-card-bg: rgba(255, 255, 255, 0.05);
        --x-card-inner: rgba(255, 255, 255, 0.05);
        --x-text: #ffffff;
        --x-text-sub: rgba(255, 255, 255, 0.6);
        --x-border: rgba(255, 255, 255, 0.1);
    }

    .xerox-container {
        font-family: 'Lexend', sans-serif;
        color: var(--x-text);
        padding: 1.5rem;
        max-width: 80rem;
        margin: 0 auto;
    }

    /* Header */
    .page-header {
        margin-bottom: 2rem;
    }
    .page-title {
        font-size: 2.25rem;
        font-weight: 900;
        line-height: 1.2;
        margin-bottom: 0.5rem;
    }
    .page-subtitle {
        color: var(--x-text-sub);
        font-size: 1rem;
    }

    /* Grid Layout */
    .xerox-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    @media (min-width: 1024px) {
        .xerox-grid {
            grid-template-columns: 2fr 1fr;
        }
    }

    /* Titles */
    .section-title {
        font-size: 1.375rem;
        font-weight: 700;
        margin-bottom: 1rem;
        padding-top: 0.5rem;
    }

    /* Upload Box */
    .upload-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        background-color: var(--x-card-bg);
        border: 2px dashed var(--x-border);
        border-radius: 0.5rem;
        padding: 3.5rem 1.5rem;
        cursor: pointer;
        transition: border-color 0.2s;
    }
    .upload-box:hover {
        border-color: var(--x-primary);
    }
    .upload-content {
        text-align: center;
    }
    .upload-title {
        font-size: 1.125rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
    }
    .upload-subtitle {
        color: var(--x-text-sub);
        font-size: 0.875rem;
    }
    .btn-browse {
        background-color: var(--x-card-inner);
        color: var(--x-text);
        border: none;
        padding: 0.6rem 1rem;
        border-radius: 0.5rem;
        font-weight: 700;
        font-size: 0.875rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .btn-browse:hover {
        background-color: var(--x-border);
    }

    /* File List */
    .file-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    .file-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--x-card-bg);
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--x-border);
    }
    .file-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        overflow: hidden;
    }
    .file-icon {
        width: 2.5rem;
        height: 2.5rem;
        background-color: var(--x-card-inner);
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--x-text);
    }
    .file-details {
        min-width: 0;
    }
    .file-name {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .file-size {
        font-size: 0.875rem;
        color: var(--x-text-sub);
    }
    .btn-delete {
        background: transparent;
        border: none;
        color: var(--x-text-sub);
        cursor: pointer;
        transition: color 0.2s;
    }
    .btn-delete:hover {
        color: var(--x-danger);
    }
    .no-files {
        text-align: center;
        color: var(--x-text-sub);
        font-size: 0.875rem;
        font-style: italic;
    }

    /* Config Card */
    .config-card {
        background-color: var(--x-card-bg);
        padding: 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid var(--x-border);
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .form-label {
        font-size: 0.875rem;
        font-weight: 500;
    }
    .form-input {
        width: 100%;
        background-color: var(--x-card-inner);
        border: 1px solid var(--x-border);
        color: var(--x-text);
        padding: 0.75rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        outline: none;
    }
    .form-input:focus {
        border-color: var(--x-primary);
    }

    /* Toggle Groups */
    .toggle-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        background-color: var(--x-card-inner);
        padding: 0.25rem;
        border-radius: 0.5rem;
    }
    .toggle-btn {
        background: transparent;
        border: none;
        padding: 0.5rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--x-text-sub);
        cursor: pointer;
        transition: all 0.2s;
    }
    .toggle-btn:hover {
        background-color: rgba(255,255,255,0.05);
    }
    .toggle-btn.active {
        background-color: var(--x-primary);
        color: white;
    }

    /* Summary Card */
    .sticky-summary {
        position: sticky;
        top: 2rem;
    }
    .summary-card {
        background-color: var(--x-card-bg);
        border: 1px solid var(--x-border);
        border-radius: 0.5rem;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .summary-row {
        display: flex;
        justify-content: space-between;
        color: var(--x-text-sub);
        font-size: 0.9rem;
    }
    .summary-val {
        color: var(--x-text);
        font-weight: 500;
    }
    .divider {
        height: 1px;
        background-color: var(--x-border);
        margin: 0.5rem 0;
        border-top: 1px dashed var(--x-text-sub);
        opacity: 0.3;
    }
    .summary-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    .total-label {
        font-size: 1.125rem;
        font-weight: 700;
    }
    .total-val {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--x-primary);
    }

    /* Buttons & Messages */
    .btn-place-order {
        width: 100%;
        background-color: var(--x-primary);
        color: white;
        border: none;
        height: 3rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .btn-place-order:hover {
        background-color: var(--x-primary-hover);
    }
    .btn-place-order:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .msg-error {
        color: var(--x-danger);
        font-size: 0.875rem;
        text-align: center;
        background: rgba(239, 68, 68, 0.1);
        padding: 0.5rem;
        border-radius: 0.25rem;
    }
    .msg-success {
        color: var(--x-success);
        font-size: 0.875rem;
        text-align: center;
        background: rgba(16, 185, 129, 0.1);
        padding: 0.5rem;
        border-radius: 0.25rem;
    }
`;

export default Xerox;