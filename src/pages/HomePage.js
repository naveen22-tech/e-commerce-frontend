import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "../styles/Home.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, getTotalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const API_BASE_URL =
        process.env.REACT_APP_API_BASE_URL || "https://e-commerce-backend1-vbs1.onrender.com";
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-content">
          <Link to="/" className="logo">
            E-Commerce
          </Link>
          <div className="nav-links">
            <Link to="/cart" className="nav-link cart-link">
              Cart
              {getTotalItems() > 0 && (
                <span className="cart-count">{getTotalItems()}</span>
              )}
            </Link>
            {user ? (
              <>
                <span className="user-name">Welcome, {user.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="products-section">
        <h2>Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="brand">{product.brand}</p>
                <p className="price">${product.price}</p>
                <p className="stock">Stock: {product.countInStock}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
