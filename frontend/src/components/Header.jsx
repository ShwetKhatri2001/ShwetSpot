import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavbarBrand, NavDropdown } from 'react-bootstrap';
import { logout } from '../redux/actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector(state => state.userDetails);
  const { user } = userDetails;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar expand="xl" collapseOnSelect id="main-header">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" id="user-info">
            {userInfo && user ? (
              <>
                <NavDropdown title={`Hi ${userInfo.name}!`} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/productlist">
                    <NavDropdown.Item>Sell</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link id="sign-in-menu">
                    <i className="fas fa-user" /> Sign In
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="admin-menu">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            <LinkContainer to="/cart" id="cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart" /> Cart
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Nav>
        <LinkContainer to="/">
          <NavbarBrand id="shop-brand">ShwetSpot</NavbarBrand>
        </LinkContainer>

        <Route render={({ history }) => <SearchBox history={history} />} />
      </Nav>
    </header>
  );
};

export default withRouter(Header);
