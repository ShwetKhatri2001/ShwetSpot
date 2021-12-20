import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, login } from '../redux/actions/userActions';

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails('profile'));
      history.push(redirect);
    }
  }, [history, userInfo, redirect, dispatch]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="justify-content-center align-items-center container bg-light p-4">
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Don't have an account?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Sign up
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
