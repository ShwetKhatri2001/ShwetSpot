import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  deliverOrder,
  getOrderDetails,
  listMyOrders,
  payOrder,
} from '../redux/actions/orderActions';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../redux/constants/orderConstants';
import { emptyCart } from '../redux/actions/cartActions';
import moment from 'moment';
import { getUserDetails } from '../redux/actions/userActions';

const OrderPage = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector(state => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector(state => state.userDetails);
  const { user } = userDetails;

  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
      dispatch(getUserDetails('profile'));
      dispatch(listMyOrders());
    }
  }, [dispatch, orderId, successPay, successDeliver, order, userInfo, history]);

  const paymentHandler = () => {
    dispatch(payOrder(orderId));
    dispatch(emptyCart());
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on{' '}
                  {moment(order.deliveredAt).format('YYYY/MM/D [at] hh:mm:ss')}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on{' '}
                  {moment(order.paidAt).format('YYYY/MM/D [at] hh:mm:ss')}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            id="order-image"
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = {item.qty * item.price}{' '}
                          credits
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Available Credits</Col>
                  <Col>{addDecimals(user.money)} credits</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    {addDecimals(
                      order.orderItems.reduce(
                        (acc, item) => acc + item.price * item.qty,
                        0
                      )
                    )}{' '}
                    credits
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{order.shippingPrice} credits</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{order.taxPrice} credits</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{order.totalPrice} credits</Col>
                </Row>
              </ListGroup.Item>
              {loadingPay && <Loader />}

              {order.isPaid ? (
                <ListGroup.Item>
                  <Button
                    type="button"
                    disabled
                    className="btn btn-block alert"
                  >
                    Already paid
                  </Button>
                </ListGroup.Item>
              ) : user.money < order.totalPrice ? (
                <ListGroup.Item>
                  <Button
                    type="button"
                    disabled
                    className="btn btn-block alert"
                  >
                    Not enough credits
                  </Button>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    variant="success"
                    onClick={paymentHandler}
                  >
                    Pay
                  </Button>
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      variant="success"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
