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
        add2Cart: (state, action) => { 
            state.cartOpen = true; 
            state.cart = [...state.cart, action.payload];
        },
        addMultipleToCart: (state, action) => {
            state.cart = [...state.card, ...action.products];
        },
        updateCartQuantity: (state, action) => {
            state.cartOpen = true;
            state.cart = state.cart.map((product) => {
                if(action.payload._id === product._id) {
                    product.purchaseQuantity = action.payload.purchaseQuantity;
                }
                return product;
            })
        },
        cartRemoval: (state, action) => {
            state.cart = state.cart.filter((product) => {
                return product._id !== action.payload;
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
    add2Cart,
    addMultipleToCart,
    updateCartQuantity,
    cartRemoval,
    clearCart,
    cartToggle,
    updateCategories,
    updateCurrentCategory
} = cartSlice.actions;

export default cartSlice.reducer;