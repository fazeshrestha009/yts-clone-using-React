import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

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
    <div className="checkout-container p-5">
      <div className="cart-items">
        <h2>Your Cart</h2>
        <div className="cart-list">
          <table className="min-w-full bg-gray-800">
            <thead>
              <tr>
                <th className="p-3 text-left text-white">Movie</th>
                <th className="p-3 text-left text-white">Movie Name</th>
                <th className="p-3 text-left text-white">Price</th>
                <th className="p-3 text-left text-white">Actions</th>
              </tr>
            </thead>
            <tbody id="cartItems">
              {cart.map((item, index) => (
                <tr key={index} className="bg-gray-700">
                  <td className="p-3">
                    <img src={item.poster} alt={item.title} className="w-12 h-12 rounded"/>
                  </td>
                  <td className="p-3 text-white">{item.title}</td>
                  <td className="p-3 text-white">₨{(item.discountedPrice || 0).toFixed(2)}</td>
                  <td className="p-3">
                    <button onClick={() => removeFromCart(index)} className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="cart-summary mt-5 p-5 bg-gray-800 rounded-lg text-white">
        <h2>My Cart</h2>
        <div className="price-breakdown">
          <div className="flex justify-between my-2">
            <span>SUB TOTAL</span>
            <span>NPR {(subTotal || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between my-2">
            <span>Delivery Fee</span>
            <span>NPR {(deliveryFee || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between my-2">
            <span>Service Charge</span>
            <span>NPR {(serviceCharge || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between my-2 text-red-400">
            <span>Special Offer Discount</span>
            <span>NPR {(-discount).toFixed(2)}</span>
          </div>
        </div>
        <hr className="my-3 border-gray-600"/>
        <div className="flex justify-between font-bold text-lg">
          <span>Grand Total</span>
          <span>NPR {(grandTotal || 0).toFixed(2)}</span>
        </div>
        <p className="mt-2">Total Price: <span className="text-green-500">₨{(totalPrice || 0).toFixed(2)}</span></p>
        <button className="checkout-btn mt-5 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
