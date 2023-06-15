// analogous to GraphQL typeDefs | defines how three parts of the state are maintained & updated.
// - used by ProductList component. Also Allows for offline & data persistance capabilities.
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
// - takes categories list retrieved from the server by Apollo, stores in global state
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
// - connects piece of data for above actions. ie users select a category from the state created by the `UPDATE_CATEGORIES` action, displays products for that category from the `UPDATE_PRODUCTS` action-created list
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY"; 

