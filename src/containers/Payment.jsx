import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { PayPalButton } from 'react-paypal-button';
import '../styles/components/Payment.css';

const Payment = () => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;

  const paypalOptions = {
    clientId:
      'access_token$sandbox$hsjcvvfttpmwc3kx$b71f870d683dd1501ed3228afa30ce56',
    intent: 'capture',
    currency: 'USD',
  };

  const buttonStyles = {
    layout: 'vertical',
    shape: 'react',
  };

  const handlePaymentSuccess = (data) => {
    console.log(data);
    if (data.status === 'COOMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };
      addNewOrder(newOrder);
    }
  };

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
            <PayPalButton
              paypalOptions={paypalOptions}
              buttonStyles={buttonStyles}
              amount={handleSumTotal()}
              onPaymentStart={() => console.log('Start Payment')}
              onPaymentSuccess={(data) => handlePaymentSuccess(data)}
              onPaymentError={(error) => handlePaymentSuccess(error)}
              onPaymentCancel={(data) => handlePaymentSuccess(data)}
            />       
        </div>
      </div>
    </div>
  );
};

export default Payment;
