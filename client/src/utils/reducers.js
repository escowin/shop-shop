import { useReducer } from "react";

// analogous to GraphQL resolvers
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    // if action `type` value is the value of `UPDATE_PRODUCTS`, returns a new tate object with an updated products array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    // returns a new state object with an updated categories array
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };
    // shopping cart cases
    case ADD_TO_CART:
      return {
        // preserves everything else on `state`
        ...state,
        // users can immediately view cart with newly added item if it's not already open
        cartOpen: true,
        // updates `cart` property to add `action.product` to the end of array
        cart: [...state.cart, action.product],
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => product._id !== action._id);

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        // uses map to create a new array (state.cart is treated as immutable)
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
    default:
      return state;
  }
};

// useReducer | similar to useState(), but used to manage greater levels of state
// initializes gloabel state object. provides functionality for updating state by automattically running it trough custom reducer().
export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
