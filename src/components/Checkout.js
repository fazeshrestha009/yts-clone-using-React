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

      <div className="w-full md:w-1/3 bg-black-1000 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium text-gray-100 mb-4">Order Summary</h3>
        <div className="space-y-4">
          <table className="min-w-full table-auto">
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="px-4 py-2 text-left">Sub Total:</td>
                <td className="px-4 py-2 text-right">NPR {(subTotal || 0).toFixed(2)}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="px-4 py-2 text-left">Delivery Fee:</td>
                <td className="px-4 py-2 text-right">NPR {(deliveryFee || 0).toFixed(2)}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="px-4 py-2 text-left">Service Charge:</td>
                <td className="px-4 py-2 text-right">NPR {(serviceCharge || 0).toFixed(2)}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="px-4 py-2 text-left text-yellow-500">Special Offer Discount:</td>
                <td className="px-4 py-2 text-right text-yellow-500">NPR {(-discount).toFixed(2)}</td>
              </tr>
              <tr className="border-b border-gray-700 font-semibold">
                <td className="px-4 py-2 text-left">Grand Total:</td>
                <td className="px-4 py-2 text-right">NPR {(grandTotal || 0).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4">
            <p className="text-center text-gray-100 mb-2">
              Total Price: <span className="font-semibold text-green-400">₨{(totalPrice || 0).toFixed(2)}</span>
            </p>
            <button
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
