import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { QUERY_CHECKOUT } from "../../utils/queries";
import "./style.css";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  // hook | establishes state variable & function to update the state
  const [state, dispatch] = useStoreContext();
  // hook | queries upon user request. data contains checkout session after query is called with getCheckout()
  const [getCheckout, {data}] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      // gets all products into the global state object at once
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    // empty state cart will call `getCart()` function to get items from indexedDB `cart` object store
    if (!state.cart.length) {
      getCart();
    }
    // hook only runs again if any value in the dependency array has changed since it last ran
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  // adds up prices of everything in cart
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];
    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });
    // calls lazy query with product ids
    getCheckout({
      variables: { products: productIds }
    })
  }

  // hook redirects user to stripe checkout page
  useEffect(() => {
    if (data) {
      stripePromise.then(res => res.redirectToCheckout({ sessionId: data.checkout.session }))
    }
  }, [data])

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          you haven't added anything to your cart.
        </h3>
      )}
    </div>
  );
};

export default Cart;
