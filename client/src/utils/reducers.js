import { useReducer, userReducer } from "react";

// analogous to GraphQL resolvers
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
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
    default:
      return state;
  }
};

// useReducer | similar to useState(), but used to manage greater levels of state
// initializes gloabel state object. provides functionality for updating state by automattically running it trough custom reducer().
export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}