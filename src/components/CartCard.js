import React from "react";
import "../styles/Cart.css";

function CartCard({ item, onUpdateQuantity, onRemove }) {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    onUpdateQuantity(item._id, newQuantity);
  };

  const handleRemove = () => {
    onRemove(item._id);
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />

      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p className="cart-item-brand">{item.brand}</p>
        <p className="cart-item-price">${item.price}</p>
      </div>

      <div className="cart-item-quantity">
        <label>Qty:</label>
        <select value={item.qty} onChange={handleQuantityChange}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="cart-item-total">
        <p className="total-price">${(item.price * item.qty).toFixed(2)}</p>
      </div>

      <button className="remove-btn" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
}

export default CartCard;
