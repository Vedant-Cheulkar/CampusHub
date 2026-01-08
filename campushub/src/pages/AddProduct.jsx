import { useState, useRef } from "react";
import PageWrapper from "../components/PageWrapper";

const AddProduct = () => {
    // --- STATE ---
    const [form, setForm] = useState({
        name: "",
        category: "",
        description: "",
        price: ""
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // File input ref for the custom upload box
    const fileInputRef = useRef(null);

    // --- HANDLERS ---
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0].name);
        }
    };

    const handleAddProduct = () => {
        setError("");
        setSuccess("");

        // Validation
        if (!form.name || !form.price || !form.category) {
            setError("Please fill in all required fields");
            return;
        }

        if (isNaN(form.price) || Number(form.price) <= 0) {
            setError("Please enter a valid price");
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess("Product listed successfully!");

            // Reset form
            setForm({ name: "", category: "", description: "", price: "" });
            setImage(null);
        }, 1000);
    };

    return (
        <PageWrapper>
            <style>{styles}</style>

            <div className="add-product-container">
                <div className="content-wrapper">

                    {/* --- TITLE SECTION --- */}
                    <div className="page-header">
                        <h1 className="page-title">Add New Product</h1>
                        <p className="page-subtitle">Fill in the details below to list your item on the marketplace.</p>
                    </div>

                    {/* --- FORM SECTION --- */}
                    <div className="form-container">

                        {/* Row 1: Name & Category */}
                        <div className="form-grid">
                            <label className="input-group">
                                <span className="label-text">Product Name</span>
                                <input
                                    className="form-input"
                                    name="name"
                                    placeholder="Enter the name of your product"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </label>

                            <label className="input-group">
                                <span className="label-text">Category</span>
                                <select
                                    className="form-input form-select"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a category</option>
                                    <option value="books">Books</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="lab">Lab</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                            </label>
                        </div>

                        {/* Row 2: Description */}
                        <label className="input-group">
                            <span className="label-text">Description</span>
                            <textarea
                                className="form-input form-textarea"
                                name="description"
                                placeholder="Describe your product in detail"
                                value={form.description}
                                onChange={handleChange}
                            ></textarea>
                        </label>

                        {/* Row 3: Price & Image */}
                        <div className="form-grid">
                            <label className="input-group">
                                <span className="label-text">Price</span>
                                <div className="price-wrapper">
                                    <span className="currency-symbol">₹</span>
                                    <input
                                        className="form-input price-input"
                                        type="number"
                                        name="price"
                                        placeholder="0.00"
                                        value={form.price}
                                        onChange={handleChange}
                                    />
                                </div>
                            </label>

                            <div className="input-group">
                                <span className="label-text">Product Image</span>
                                <div
                                    className="upload-box"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <div className="upload-content">
                                        <span className="material-symbols-outlined upload-icon">upload_file</span>
                                        {image ? (
                                            <p className="upload-text highlight">{image}</p>
                                        ) : (
                                            <>
                                                <p className="upload-text">
                                                    <span className="highlight">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="upload-hint">SVG, PNG, JPG or GIF</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feedback Messages */}
                        {error && <div className="msg-error">{error}</div>}
                        {success && <div className="msg-success">{success}</div>}

                        {/* --- ACTIONS --- */}
                        <div className="form-actions">
                            <button className="btn-cancel" onClick={() => setForm({ name: "", category: "", description: "", price: "" })}>
                                Cancel
                            </button>
                            <button
                                className="btn-submit"
                                onClick={handleAddProduct}
                                disabled={loading}
                            >
                                {loading ? "Listing..." : "Add Product"}
                            </button>
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
        --ap-primary: #135bec;
        --ap-primary-hover: #1d4ed8;
        --ap-bg: #f6f6f8;
        --ap-card-bg: #ffffff; /* White in light mode */
        --ap-input-bg: #ffffff;
        --ap-text: #000000;
        --ap-text-sub: rgba(0,0,0,0.6);
        --ap-border: rgba(0,0,0,0.2);
        --ap-placeholder: rgba(0,0,0,0.4);
    }

    /* Dark Mode */
    :root:has(.dark), .dark, .dark-mode {
        --ap-bg: #101622;
        --ap-card-bg: #101622; /* Matches bg in design */
        --ap-input-bg: #192233;
        --ap-text: #ffffff;
        --ap-text-sub: #92a4c9;
        --ap-border: #324467;
        --ap-placeholder: #586985;
    }

    .add-product-container {
        font-family: 'Lexend', sans-serif;
        color: var(--ap-text);
        padding: 1.5rem;
        display: flex;
        justify-content: center;
    }

    .content-wrapper {
        width: 100%;
        max-width: 56rem; /* max-w-4xl */
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    /* Header */
    .page-header {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    .page-title {
        font-size: 2.25rem;
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -0.033em;
    }
    .page-subtitle {
        color: var(--ap-text-sub);
        font-size: 1rem;
    }

    /* Form Layout */
    .form-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    @media (min-width: 768px) {
        .form-grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        flex: 1;
    }

    .label-text {
        font-size: 1rem;
        font-weight: 500;
        color: var(--ap-text);
    }

    /* Inputs */
    .form-input {
        width: 100%;
        height: 3.5rem; /* h-14 */
        padding: 0 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--ap-border);
        background-color: var(--ap-input-bg);
        color: var(--ap-text);
        font-size: 1rem;
        outline: none;
        transition: all 0.2s;
    }
    .form-input:focus {
        border-color: var(--ap-primary);
        box-shadow: 0 0 0 4px rgba(19, 91, 236, 0.1);
    }
    .form-input::placeholder {
        color: var(--ap-placeholder);
    }

    .form-textarea {
        height: auto;
        min-height: 9rem; /* min-h-36 */
        padding: 1rem;
        resize: vertical;
        font-family: inherit;
    }

    /* Select Arrow Styling */
    .form-select {
        appearance: none;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 1rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
    }

    /* Price Input */
    .price-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }
    .currency-symbol {
        position: absolute;
        left: 1rem;
        color: var(--ap-placeholder);
        pointer-events: none;
    }
    .price-input {
        padding-left: 2rem;
    }

    /* File Upload */
    .upload-box {
        height: 100%;
        min-height: 8rem;
        border: 2px dashed var(--ap-border);
        background-color: var(--ap-input-bg);
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: border-color 0.2s;
    }
    .upload-box:hover {
        border-color: var(--ap-primary);
    }
    .upload-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 1rem;
    }
    .upload-icon {
        font-size: 2.25rem;
        color: var(--ap-placeholder);
        margin-bottom: 0.5rem;
    }
    .upload-text {
        font-size: 0.875rem;
        color: var(--ap-text-sub);
    }
    .upload-hint {
        font-size: 0.75rem;
        color: var(--ap-placeholder);
        margin-top: 0.25rem;
    }
    .highlight {
        color: var(--ap-primary);
        font-weight: 600;
    }

    /* Actions */
    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        padding-top: 1.5rem;
    }
    
    .btn-cancel {
        height: 3rem;
        padding: 0 1.5rem;
        border-radius: 0.5rem;
        background: transparent;
        color: var(--ap-primary);
        border: 1px solid var(--ap-primary);
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s;
    }
    .btn-cancel:hover {
        background-color: rgba(19, 91, 236, 0.1);
    }

    .btn-submit {
        height: 3rem;
        padding: 0 1.5rem;
        border-radius: 0.5rem;
        background-color: var(--ap-primary);
        color: white;
        border: none;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s;
    }
    .btn-submit:hover {
        background-color: var(--ap-primary-hover);
    }
    .btn-submit:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    /* Messages */
    .msg-error {
        color: #ef4444;
        text-align: center;
        font-size: 0.875rem;
    }
    .msg-success {
        color: #10b981;
        text-align: center;
        font-size: 0.875rem;
    }
`;

export default AddProduct;