// analogous to GraphQL typeDefs | defines how three parts of the state are maintained & updated.
// - used by ProductList component. Also Allows for offline & data persistance capabilities.
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
// - takes categories list retrieved from the server by Apollo, stores in global state
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
// - connects piece of data for above actions. ie users select a category from the state created by the `UPDATE_CATEGORIES` action, displays products for that category from the `UPDATE_PRODUCTS` action-created list
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";

//  shopping cart actions
export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_MULTIPLE_TO_CART = "ADD_MULTIPLE_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY";
export const CLEAR_CART = "CLEAR_CART";
export const TOGGLE_CART = "TOGGLE_CART";
