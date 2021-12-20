import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className="py-3">
          <Container fluid>
            <Route path="/shipping" component={ShippingPage} exact />
            <Route path="/payment" component={PaymentPage} exact />
            <Route path="/placeorder" component={PlaceOrderPage} exact />
            <Route path="/order/:id" component={OrderPage} exact />
            <Route path="/login" component={LoginPage} exact />
            <Route path="/register" component={RegisterPage} exact />
            <Route path="/profile" component={ProfilePage} exact />
            <Route path="/product/:id" component={ProductPage} exact />
            <Route path="/cart/:id?" component={CartPage} exact />
            <Route path="/admin/userlist" component={UserListPage} exact />
            <Route path="/admin/user/:id/edit" component={UserEditPage} exact />
            <Route path="/productlist" component={ProductListPage} exact />
            <Route path="/product/:id/edit" component={ProductEditPage} exact />
            <Route path="/admin/orderlist" component={OrderListPage} exact />
            <Route path="/search/:keyword" component={HomePage} exact />
            <Route path="/" component={HomePage} exact />
          </Container>
        </main>
      </Router>
    </Provider>
  );
};

export default App;
