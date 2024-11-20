import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { removeItemFromCart } from '../redux/cartSlice'; 

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items); 
  const dispatch = useDispatch(); 

  const deliveryFee = 0;
  const serviceCharge = 0;

  const calculateTotals = () => {
    const totalPrice = cart.reduce((total, item) => total + (item.discountedPrice || 0), 0);
    const discount = 0;
    const subTotal = totalPrice;
    const grandTotal = subTotal + discount + deliveryFee + serviceCharge;

    return { totalPrice, subTotal, discount, grandTotal };
  };

  const { totalPrice, subTotal, discount, grandTotal } = calculateTotals();

  const handleProceedToCheckout = () => {
    alert("Proceeding to payment...");
    navigate('/payment');
  };

  if (cart.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="checkout-container">
      <div className="cart-items">
        <h2>Your Cart</h2>
        <div className="cart-list">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Movie</th>
                <th>Movie Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.poster} alt={item.title} className="item-img" />
                  </td>
                  <td>{item.title}</td>
                  <td>₨{(item.discountedPrice || 0).toFixed(2)}</td>
                  <td>
                    <button onClick={() => dispatch(removeItemFromCart(item.id))} className="remove-btn">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="cart-summary">
        <h2>My Cart</h2>
        <div className="price-breakdown">
          <div className="price-item">
            <span>SUB TOTAL</span>
            <span>NPR {(subTotal || 0).toFixed(2)}</span>
          </div>
          <div className="price-item">
            <span>Delivery Fee</span>
            <span>NPR {(deliveryFee || 0).toFixed(2)}</span>
          </div>
          <div className="price-item">
            <span>Service Charge</span>
            <span>NPR {(serviceCharge || 0).toFixed(2)}</span>
          </div>
          <div className="price-item discount">
            <span>Special Offer Discount</span>
            <span>NPR {(-discount).toFixed(2)}</span>
          </div>
        </div>
        <hr />
        <div className="grand-total">
          <span>Grand Total</span>
          <span>NPR {(grandTotal || 0).toFixed(2)}</span>
        </div>
        <p>Total Price: <span className="total-price">₨{(totalPrice || 0).toFixed(2)}</span></p>
        <button className="checkout-btn" onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
