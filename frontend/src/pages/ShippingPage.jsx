import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutBar from '../components/CheckoutBar';
import { saveShippingAddress } from '../redux/actions/cartActions';

const ShippingPage = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <>
      <CheckoutBar step1 step2 />
      <div className="justify-content-center align-items-center container bg-light p-3">
        <h1 className="pl-3">Shipping</h1>
        <Form onSubmit={submitHandler} className="pr-3 pl-3">
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={e => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              required
              onChange={e => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={e => setPostalCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={e => setCountry(e.target.value)}
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

export default ShippingPage;
