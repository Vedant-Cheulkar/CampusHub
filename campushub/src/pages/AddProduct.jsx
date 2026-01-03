import { useState } from "react";
import PageWrapper from "../components/PageWrapper";

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleAddProduct = () => {
        // Basic validation
        if (!productName || !price) {
            setError("All fields are required");
            setSuccess("");
            return;
        }

        if (isNaN(price) || price <= 0) {
            setError("Please enter a valid price");
            setSuccess("");
            return;
        }

        // UI-only success simulation
        setError("");
        setSuccess("Product added successfully (UI only)");

        // Reset form
        setProductName("");
        setPrice("");
    };

    return (
        <PageWrapper title="Sell an Item">
            <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <br /><br />

            <input
                type="text"
                placeholder="Price (₹)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <br /><br />

            {/* Error Message */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Success Message */}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <button onClick={handleAddProduct}>Add Product</button>
        </PageWrapper>
    );
};

export default AddProduct;
