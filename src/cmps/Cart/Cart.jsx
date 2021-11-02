import React, {useContext, useState} from 'react';
import Modal from "./../UI/Modal";
import CartContext from '../../store/CartContext';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import Checkout from './Checkout';

const Cart = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${ cartCtx.totalAmount.toFixed(2) }`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (itemId) => {
    cartCtx.removeItem(itemId);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1});
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  // todo: add try-catch error handeling (as in the http)
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://food-order-app-7cec7-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({user: userData, orderItems: cartCtx.items})
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart()
  };

  const modalActions = <div className={classes.actions}>
    <button onClick={props.onHideCart} className={classes['button-alt']}>Close</button>
    {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
  </div>;

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data......</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Seccessesfully sent the order!</p>
      <button onClick={props.onHideCart} className={classes.button}>
        Close
      </button>
    </React.Fragment>);

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;