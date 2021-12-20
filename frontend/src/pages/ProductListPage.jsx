import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  createProduct,
  deleteProduct,
  listMyProducts,
} from '../redux/actions/productActions';

const ProductListPage = ({ history }) => {
  const dispatch = useDispatch();

  const productListMy = useSelector(state => state.productListMy);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productListMy;

  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector(state => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listMyProducts());

    if (!userInfo) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listMyProducts(''));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = id => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <div className="w-75 m-auto">
        <Row>
          <Col>
            <h1>My products</h1>
          </Col>
          <Col className="text-right">
            <Button
              className="my-3"
              onClick={createProductHandler}
              variant="success"
            >
              <i className="fas fa-plus" /> SELL PRODUCT
            </Button>
          </Col>
        </Row>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingProducts ? (
        <Loader />
      ) : errorProducts ? (
        <Message variant="danger">{errorProducts}</Message>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm w-75 m-auto"
          >
            <thead>
              <tr>
                <th>PRODUCT ID</th>
                <th>SELLER ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.user}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className="text-center pl-0 pr-0 mt-0">
                    <LinkContainer to={`/product/${product._id}/edit`}>
                      <Button variant="success" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListPage;
