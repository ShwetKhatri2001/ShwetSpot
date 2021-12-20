import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserDetails,
  updateUserProfile,
} from '../redux/actions/userActions';
import { listMyOrders } from '../redux/actions/orderActions';

const ProfilePage = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [money, setMoney] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading: loadingUser, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success: userUpdateSuccess } = userUpdateProfile;

  const orderListMy = useSelector(state => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    dispatch(listMyOrders());

    if (!userInfo) {
      history.push('/login');
    } else {
      setName(user.name);
      setEmail(user.email);
      setMoney(user.money);
    }
    if (userUpdateSuccess) {
      dispatch(getUserDetails('profile'));
    }
  }, [
    dispatch,
    history,
    userInfo,
    userUpdateSuccess,
    userUpdateProfile,
    user.email,
    user.money,
    user.name,
  ]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          money,
          profilePicture,
          password,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>My Profile</h2>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {userUpdateSuccess && (
          <Message variant="success">Profile Updated</Message>
        )}
        {loadingUser ? (
          <Loader />
        ) : (
          <>
            <Card className="mb-5">
              <Card.Img
                variant="top"
                src={user.profilePicture}
                id="profile-picture"
              />
              <Card.Body>
                <Card.Title>Name: {user.name}</Card.Title>
                <Card.Title>Email: {user.email}</Card.Title>
                <Card.Title>Credits: {user.money}</Card.Title>
                <Button
                  variant="success"
                  onClick={() => history.push('/productlist')}
                >
                  View my products
                </Button>
              </Card.Body>
            </Card>

            <h2>Edit Profile</h2>
            <Form onSubmit={submitHandler} className="bg-light p-3">
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Add/Edit Profile Picture</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={profilePicture}
                  onChange={e => setProfilePicture(e.target.value)}
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

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              {userInfo && userInfo.isAdmin ? (
                <Form.Group controlId="money">
                  <Form.Label>Set Credits</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter credit amount"
                    value={money}
                    onChange={e => setMoney(e.target.value)}
                  />
                </Form.Group>
              ) : null}

              <Button type="submit" variant="success">
                Update
              </Button>
            </Form>
          </>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover className="table-sm bg-light">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="danger">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
