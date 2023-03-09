// tested actions
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../utils/action";
// updates state by returning a new state object, never altering the original state obkect.
import { reducer } from "../utils/reducers";

// creates a sample of what the global state will look like
const initialState = {
  products: [],
  categories: [{ name: "Food" }],
  currentCategory: "1",
};

test("UPDATE_PRODUCTS", () => {
  // new state obj | result of what comes from the `reducer` function.
  // - (<current state obj>, <action being performed to update state>)
  // - action : type & value
  let newState = reducer(initialState, {
    type: UPDATE_PRODUCTS,
    products: [{}, {}],
  });

  expect(newState.products.length).toBe(2); // checks for the new state's array length
  expect(initialState.products.length).toBe(0); // checks that the initial state remains unaltered
});

test("UPDATE_CATEGORIES", () => {
  let newState = reducer(initialState, {
    type: UPDATE_CATEGORIES,
    categories: [{}, {}],
  });

  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

test("UPDATE_CURRENT_CATEGORY", () => {
    let newState = reducer(initialState, {
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: "2"
    });

    expect(newState.currentCategory).toBe("2");
    expect(initialState.currentCategory).toBe("1")
})