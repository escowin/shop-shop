import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from "../assets/spinner.gif";

// global state
import { useStoreContext } from "../utils/GlobalState";
import {
  UPDATE_PRODUCTS,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
} from "../utils/actions";
import Cart from "../components/Cart";
import { idbPromise } from "../utils/helpers";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const { products, cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });

      // uses existing item data & increments purchaseQuantity balue by one
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });

      // adds product to current shopping cart in indexedb
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id
    });

    // offline enhancement | deletes item from indexeddb after it is removed from cart
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  useEffect(() => {
    // checks global state for `products` array, and figures out which is the current product to display
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
      // retrieves server data
    } else if (data) {
      // dependency array | sends useQuery() product data to global state, then runs useEffect() hook again
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      // saves updated object to `products` store object in indexdb
      data.products.forEach((product) =>
        idbPromise("products", "put", product)
      );
      // accessing product url offline
    } else if (!loading) {
      // get request made to indexdb `products` object store
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
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
// 22.3.5