import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: '',
    },
    reducers: {
        updateProducts: (state, action) => {
            state.products = [...state.products, action.products];
        },
        addToCart: (state, action) => { 
            state.cartOpen = true; 
            state.cart = [...state.cart, action.product];
        },
        addMultipleToCart: (state, action) => {
            state.cart = [...state.card, ...action.products];
        },
        updateCartQuantity: (state, action) => {
            state.cartOpen = true;
            state.cart = state.cart.map((product) => {
                if(action._id === product._id) {
                    product.purchaseQuantity = action.purchaseQuantity;
                }
                return product;
            })
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((product) => {
                return product._id !== action._id;
            });

            state.cartOpen = state.cart.length > 0;
        },
        clearCart: state => {
            state.cartOpen = false;
            state.cart.splice(0, state.cart.length);
        },
        cartToggle: state => {
            state.cartOpen = !state.cartOpen;
        },
        updateCategories: (state, action) => {
            state.categories = [...action.categories];
        },
        updateCurrentCategory: (state, action) => {
            state.currentCategory = action.currentCategory;
        }
    }
});

export const {
    updateProducts,
    addToCart,
    addMultipleToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartToggle,
    updateCategories,
    updateCurrentCategory
} = cartSlice.actions;

export default cartSlice.reducer;