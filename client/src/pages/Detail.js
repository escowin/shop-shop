import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

// global state
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../utils/actions';
import Cart from '../components/Cart';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const { products } = state;

  useEffect(() => {
    // checks global state for products array, and figures out which is the current product to display
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    } else if (data) {
      // dependency array | sends useQuery() product data to global state, then runs useEffect() hook again
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.prodcts
      });
    }
  }, [products, data, dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button>Add to Cart</button>
            <button>Remove from Cart</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
