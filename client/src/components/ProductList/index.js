import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";

import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductList() {
  // retrieves current global state object & dispatch() method to update state. currentCategory is destructured out of state object so it can be used in filterProducts()
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // waits for useQuery() response. dispatch() executes when data object goes from an undefined to a defined value. instructs reducer to use UPDATE_PRODUCTS action to save the product data array to gloabl store. useStoreContext() executes again which gives the product data needed to display products to the page.
  useEffect(() => {
    
    // stores existing data
    if (data) {
      // stores data in the global state object
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      // each product is also saved into indexDB
      data.products.forEach((product) => idbPromise("products", "put", product));
    } else if (!loading) {
      // loading undefined | uses indexDB because running `useQuery()` hook offline doesn't work. it's impossible to be in loading data state since the needed apollo-provided response wont exist).
      // gets all products from the `products` store
      idbPromise('products', 'get').then(products => {
        // uses retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
