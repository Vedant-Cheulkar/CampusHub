import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import ProductSkeleton from "../components/ProductSkeleton";
import { products as initialProducts } from "../data/products";

const Marketplace = () => {
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

    // Filter by search + category
    const filteredProducts = initialProducts.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesCategory =
            category === "All" || product.category === category;

        return matchesSearch && matchesCategory;
    });

    // Sort by price
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === "lowToHigh") return a.price - b.price;
        if (sortOrder === "highToLow") return b.price - a.price;
        return 0;
    });

    return (
        <PageWrapper title="Marketplace">
            <div className="fade-in">
                {/* Filters */}
                <div
                    style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "20px",
                        flexWrap: "wrap"
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ maxWidth: "240px" }}
                    />

                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="All">All Categories</option>
                        <option value="Books">Books</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Lab">Lab</option>
                        <option value="Accessories">Accessories</option>
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="default">Sort by Price</option>
                        <option value="lowToHigh">Low → High</option>
                        <option value="highToLow">High → Low</option>
                    </select>
                </div>

                {/* Skeleton Loader */}
                {loading ? (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "16px"
                        }}
                    >
                        {[...Array(6)].map((_, i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                ) : sortedProducts.length === 0 ? (
                    /* Empty State */
                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                        <div style={{ fontSize: "48px" }}>😕</div>
                        <h3>No products found</h3>
                        <p>Try changing search or filters</p>
                    </div>
                ) : (
                    /* Product Grid */
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "16px"
                        }}
                    >
                        {sortedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                onClick={() => setSelectedProduct(product)}
                            />
                        ))}
                    </div>
                )}

                {/* Product Detail Modal */}
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            </div>
        </PageWrapper>
    );
};

export default Marketplace;
