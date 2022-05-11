//import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';
import data from '../data';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, err: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  //USE AXIOS TO FETCH DATA FROM BACKEND
  const [setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        setProducts(result.data);
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data,
        });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: err.message,
        });
      }
    };
    fetchData();
  }, []);

  //MADE LIST PRODUCTS
  return (
    <div>
      <main>
        <Helmet>
          <title>BAMBOOLOGISTIC</title>
        </Helmet>
        <h1>products</h1>
        <div className="products">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Row>
              {data.products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </main>
    </div>
  );
}
export default HomeScreen;
