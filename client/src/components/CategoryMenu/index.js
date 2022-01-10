import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
//import { useStoreContext } from '../../utils/GlobalState';
/* import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions'; */
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { updateCategories, updateCurrentCategory } from '../../utils/redux/cartSlice';

function CategoryMenu() {

  //redux stuff
  const reduxCart = useSelector((state) => state.reduxCart);
  const reduxDispatch = useDispatch();

  //const [state, dispatch] = useStoreContext();

  //const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      /* dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      }); */

      reduxDispatch(updateCategories(categoryData.categories));

      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        /* dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        }); */

        reduxDispatch(updateCategories(categoryData.categories));
      });
    }
  }, [categoryData, loading, reduxDispatch]);

  const handleClick = (id) => {
    /* dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    }); */

    reduxDispatch(updateCurrentCategory(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {reduxCart.categories.map((item) => (
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
