// imported actions & reducer
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../utils/actions";
import { reducer } from "../utils/reducers";

// creates a sample of what the global state will look like
const initialState = {
  products: [],
  categories: [{ name: "food" }],
  currentCategory: "1",
};

// test | updating the products list
test("UPDATE_PRODUCTS", () => {
  // reducer(type, vaue)
  let newState = reducer(initialState, {
    type: UPDATE_PRODUCTS,
    products: [{}, {}],
  });

  // initial state has remained unaltered
  expect(newState.products.length).toBe(2);
  expect(initialState.products.length).toBe(0);
});

// test | categories
test("UPDATE_CATEGORIES", () => {
  let newState = reducer(initialState, {
    type: UPDATE_CATEGORIES,
    categories: [{}, {}],
  });

  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

// test | updated current category
test("UPDATE_CURRENT_CATEGORY", () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: "2",
  });
  expect(newState.currentCategory).toBe("2");
  expect(initialState.currentCategory).toBe("1");
});
