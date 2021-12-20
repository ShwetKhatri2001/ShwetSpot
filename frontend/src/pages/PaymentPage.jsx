import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutBar from '../components/CheckoutBar';
import { savePaymentMethod } from '../redux/actions/cartActions';

const PaymentPage = ({ history, initialValues, onSubmit }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayGreen');

  const dispatch = useDispatch();

  const submitHandler = e => {
    if (e) e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <>
      <CheckoutBar step1 step2 step3 />
      <div className="justify-content-center align-items-center container bg-light p-3">
        <h1 className="pl-3">Payment Method</h1>
        <Form onSubmit={submitHandler} className="pr-3 pl-3">
          <Form.Group>
            <Form.Label>Select Method</Form.Label>
            <Form.Check
              type="radio"
              label="PayGreen"
              checked={paymentMethod === 'PayGreen'}
              value="PayGreen"
              onChange={e => setPaymentMethod(e.target.value)}
              className="mb-1"
            />
            <Form.Check
              type="radio"
              label="FoxCard"
              checked={paymentMethod === 'FoxCard'}
              value="FoxCard"
              onChange={e => setPaymentMethod(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="success" className="mb-2">
            Continue
          </Button>
        </Form>
      </div>
    </>
  );
};

export default PaymentPage;
