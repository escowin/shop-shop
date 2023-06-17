import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";

// global state & actions
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";

function ProductList() {
  // retrieves current global state object & dispatch() method to update state. currentCategory is destructured out of state object so it can be used in filterProducts()
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // waits for useQuery() response. dispatch() executes when data object goes from an undefined to a defined value. instructs reducer to use UPDATE_PRODUCTS action to save the product data array to gloabl store. useStoreContext() executres again which gives the product data needed to display products to the page.
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
    }
  }, [data, dispatch]);

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
