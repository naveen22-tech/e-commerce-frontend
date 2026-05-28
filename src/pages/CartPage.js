import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartCard from "../components/CartCard";
import "../styles/Cart.css";

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      // TODO: Implement checkout functionality
      alert("Checkout functionality coming soon!");
    }
  };

  //const API_BASE_URL =
    //process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  return (
    <div className="cart-container">
      <nav className="navbar">
        <div className="nav-content">
          <Link to="/" className="logo">
            E-Commerce
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/cart" className="nav-link active">
              Cart
            </Link>
          </div>
        </div>
      </nav>

      <div className="cart-content">
        <h1>Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="cart-wrapper">
            <div className="cart-items-section">
              {cartItems.map((item) => (
                <CartCard
                  key={item._id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>$10.00</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>
                    ${(getTotalPrice() + 10 + getTotalPrice() * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <button
                className="continue-shopping-btn"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/" className="back-to-shop-btn">
              Back to Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
