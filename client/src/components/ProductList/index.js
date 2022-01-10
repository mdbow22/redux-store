import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../ProductItem';
//import { useStoreContext } from '../../utils/GlobalState';
//import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import { updateProducts } from '../../utils/redux/cartSlice';

function ProductList() {
  //const [state, dispatch] = useStoreContext();

  //const { currentCategory } = state;

  //redux stuff
  const reduxCart = useSelector((state) => state.reduxCart);
  const reduxDispatch = useDispatch();

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      /* dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      }); */

      reduxDispatch(updateProducts(data.products));

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        /* dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        }); */

        reduxDispatch(updateProducts(data.products));        
      });
    }
  }, [data, loading]);

  function filterProducts() {
    if (!reduxCart.currentCategory) {
      return reduxCart.products;
    }

    return reduxCart.products.filter(
      (product) => product.category._id === reduxCart.currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {reduxCart.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
