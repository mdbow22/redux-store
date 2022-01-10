import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
//import { useStoreContext } from "../../utils/GlobalState";
//import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { add2Cart, updateCartQuantity } from "../../utils/redux/cartSlice";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  //const [state, dispatch] = useStoreContext();

  //Redux stuff
  const reduxCart = useSelector((state) => state.reduxCart);
  const reduxDispatch = useDispatch();

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  //const { cart } = state

  const addToCart = () => {
    const itemInCart = reduxCart.cart.find((cartItem) => cartItem._id === _id)
    console.log(itemInCart);
    if (itemInCart) {
      /* dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      }); */

      //redux way to update cart quantity
      reduxDispatch(updateCartQuantity({
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      }));

      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      /* dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      }); */

      reduxDispatch(add2Cart({...item, purchaseQuantity: 1}));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
