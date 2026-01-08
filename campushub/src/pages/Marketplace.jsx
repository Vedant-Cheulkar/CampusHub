import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import ProductModal from "../components/ProductModal";
import { products as initialProducts } from "../data/products";

const Marketplace = () => {
    // --- STATE MANAGEMENT ---
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("default");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulate API loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    // --- FILTERING LOGIC ---
    const filteredProducts = initialProducts.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === "All" || product.category === category;
        return matchesSearch && matchesCategory;
    });

    // --- SORTING LOGIC ---
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === "lowToHigh") return a.price - b.price;
        if (sortOrder === "highToLow") return b.price - a.price;
        return 0;
    });

    // Categories List for Chips
    const categories = ["All", "Books", "Electronics", "Lab", "Accessories"];

    return (
        <PageWrapper>
            <style>{styles}</style>

            <div className="marketplace-layout">
                <div className="marketplace-container">

                    {/* Header Removed as requested */}

                    <main className="mp-main">
                        {/* --- TITLE SECTION --- */}
                        <div className="page-heading">
                            <h1 className="main-title">Student Marketplace</h1>
                            <p className="sub-title">Buy and sell items from students across campus</p>
                        </div>

                        {/* --- SEARCH BAR --- */}
                        <div className="search-section">
                            <div className="search-bar">
                                <div className="search-icon">
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                                <input
                                    className="search-input"
                                    placeholder="Search for books, electronics, and more..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* --- FILTERS & SORTER --- */}
                        <div className="controls-section">
                            {/* Category Chips */}
                            <div className="chips-container">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        className={`chip ${category === cat ? 'active' : ''}`}
                                        onClick={() => setCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Sort Dropdown */}
                            <div className="sort-wrapper">
                                <select
                                    className="sort-select"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option value="default">Sort by Price</option>
                                    <option value="lowToHigh">Price: Low to High</option>
                                    <option value="highToLow">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* --- PRODUCT GRID --- */}
                        {loading ? (
                            <div className="product-grid">
                                {/* Inline Skeleton Loader */}
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="skeleton-card">
                                        <div className="skeleton-image"></div>
                                        <div className="skeleton-content">
                                            <div className="skeleton-line w-75"></div>
                                            <div className="skeleton-line w-25"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : sortedProducts.length === 0 ? (
                            /* Empty State */
                            <div className="empty-state">
                                <div className="empty-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
                                    </svg>
                                </div>
                                <h3>No Products Found</h3>
                                <p>Try adjusting your search or filters to find what you're looking for.</p>
                            </div>
                        ) : (
                            <div className="product-grid">
                                {sortedProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="product-card"
                                        onClick={() => setSelectedProduct(product)}
                                    >
                                        <div
                                            className="card-image"
                                            style={{ backgroundImage: `url('${product.image || "https://placehold.co/400"}')` }}
                                        ></div>
                                        <div className="card-details">
                                            <h3 className="card-title">{product.name}</h3>
                                            <p className="card-price">${product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </PageWrapper>
    );
};

// --- CSS STYLES ---
const styles = `
    :root {
        --mp-primary: #135bec;
        --mp-bg: #f6f6f8;
        --mp-card-bg: #ffffff;
        --mp-text: #1e293b;
        --mp-text-sub: #64748b;
        --mp-border: #e2e8f0;
        --mp-hover: #f1f5f9;
        --mp-radius: 0.75rem;
    }

    /* Dark Mode Handling */
    :root:has(.dark), .dark, .dark-mode {
        --mp-bg: #101622;
        --mp-card-bg: rgba(30, 41, 59, 0.5);
        --mp-text: #f8fafc;
        --mp-text-sub: #94a3b8;
        --mp-border: #334155;
        --mp-hover: rgba(51, 65, 85, 0.5);
    }

    .marketplace-layout {
        width: 100%;
        min-height: 100vh;
        // background-color: var(--mp-bg);
        color: var(--mp-text);
        font-family: 'Lexend', sans-serif;
    }

    .marketplace-container {
        max-width: 80rem; /* 7xl equivalent */
        margin: 0 auto;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    /* Main Content */
    .mp-main {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 1rem;
    }

    .page-heading {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .main-title {
        font-size: 2.25rem;
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -0.033em;
    }

    .sub-title {
        color: var(--mp-text-sub);
        font-size: 1rem;
    }

    /* Search */
    .search-section {
        padding: 0 1rem;
    }
    
    .search-bar {
        display: flex;
        align-items: center;
        background-color: var(--mp-card-bg);
        border: 1px solid var(--mp-border);
        border-radius: 0.5rem;
        height: 3rem;
        overflow: hidden;
    }

    .search-icon {
        padding-left: 1rem;
        color: var(--mp-text-sub);
        display: flex;
        align-items: center;
    }

    .search-input {
        flex: 1;
        height: 100%;
        border: none;
        background: transparent;
        padding: 0 1rem;
        font-size: 1rem;
        color: var(--mp-text);
        outline: none;
    }

    /* Controls (Filter/Sort) */
    .controls-section {
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    @media (min-width: 640px) {
        .controls-section {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }

    .chips-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .chip {
        height: 36px;
        padding: 0 1rem;
        border-radius: 0.5rem;
        border: none;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        background-color: var(--mp-hover);
        color: var(--mp-text);
        transition: all 0.2s;
    }

    .chip:hover {
        opacity: 0.8;
    }

    .chip.active {
        background-color: rgba(19, 91, 236, 0.2);
        color: var(--mp-primary);
    }

    .sort-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .sort-select {
        height: 36px;
        padding: 0 2rem 0 1rem;
        border-radius: 0.5rem;
        border: none;
        background-color: var(--mp-hover);
        color: var(--mp-text);
        font-size: 0.875rem;
        font-weight: 500;
        appearance: none;
        cursor: pointer;
        outline: none;
    }

    .sort-icon {
        position: absolute;
        right: 8px;
        pointer-events: none;
        color: var(--mp-text);
    }

    /* Grid */
    .product-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1.5rem;
        padding: 0 1rem;
    }
    @media (min-width: 640px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 768px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (min-width: 1024px) { .product-grid { grid-template-columns: repeat(4, 1fr); } }

    /* Cards */
    .product-card {
        background-color: var(--mp-card-bg);
        border: 1px solid var(--mp-border);
        border-radius: var(--mp-radius);
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .product-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    }

    .card-image {
        width: 100%;
        aspect-ratio: 1 / 1;
        background-size: cover;
        background-position: center;
        background-color: var(--mp-hover);
    }

    .card-details {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .card-title {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--mp-text);
        margin: 0;
    }

    .card-price {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--mp-primary);
        margin: 0;
    }

    /* Skeleton */
    .skeleton-card {
        background-color: var(--mp-card-bg);
        border: 1px solid var(--mp-border);
        border-radius: var(--mp-radius);
        overflow: hidden;
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .skeleton-image {
        width: 100%;
        aspect-ratio: 1/1;
        background-color: var(--mp-hover);
    }
    .skeleton-content {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    .skeleton-line {
        height: 1rem;
        background-color: var(--mp-hover);
        border-radius: 4px;
    }
    .w-75 { width: 75%; }
    .w-25 { width: 25%; }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .5; }
    }

    /* Empty State */
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 4rem 1rem;
        background-color: var(--mp-card-bg);
        border: 1px dashed var(--mp-border);
        border-radius: var(--mp-radius);
        margin: 0 1rem;
    }
    .empty-icon {
        width: 4rem;
        height: 4rem;
        color: var(--mp-primary);
        margin-bottom: 1rem;
    }
`;

export default Marketplace;