import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';
import data from '../data';

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
        //setProducts(result.data);
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
        <h1>Products</h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.img} alt={product.name} />
              </Link>
              <div className="product-infor">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <span>
                  <strong>
                    <p>{product.price}</p>
                  </strong>
                </span>
                <button>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
export default HomeScreen;
