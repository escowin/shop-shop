import React, { useEffect } from "react";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from "../../utils/action";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";

function CategoryMenu({ setCategory }) {
  // global state
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
    }
  }, [categoryData, dispatch]);

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            setCategory(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
