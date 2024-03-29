import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState"; // global state
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function CategoryMenu({ setCategory }) {
  // global state configuration. component immediately calls upon useStoreContect() hook to retrieve current state from global state object. uses dispatch() method to update state
  const [state, dispatch] = useStoreContext();
  // destructured since this component only needs to use categories
  const { categories } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  // useEffect() arguments | a function to run given a certain condition, and the condition
  // when useQuery() finishes, useEffect() hook runs again noticing categoryData exists. executes dispatch() function
  useEffect(() => {
    // dispatch() runs if categoryData exists or as changes from the useQuery response
    if (categoryData) {
      // executes dispatch() with action object inidcating the type of action & data to set state for categories
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      // writes category data to indexdb `categories` object store when categories are saved to state
      categoryData.categories.forEach((category) =>
        idbPromise("categories", "put", category)
      );
    } else if (!loading) {
      // offline | the indexdb is used by making a get request to the indexdb `categories` object store.
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        })
      })
    }
  }, [categoryData, loading, dispatch]);

  // updates global state instead of using the funcion received as prop from the home component
  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
