// ProductList
// - stores data retrieved for products from the server by apollo
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS"; 
// - displays products for selected category retrieved from the server by apollo
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
// - connects the above | selects a cateogry from the state created by `update_categories` & displays category products from the list created from the `update_products` action.
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";
