import { useReducer } from "react";
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "./action";

// `useState()` v. `useReducer()`
// - useState | simpler amounts of state (form field values, status fo a button being clicked)
// - useReducer | greater levels of state

export const reducer = (state, action) => {
  // returns a new state object based on the selected action
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

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

    // selecting an undefined action returns original state
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
