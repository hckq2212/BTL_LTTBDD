import { createSlice } from '@reduxjs/toolkit';
import Products from '../data/data.js';

const initialState = {
    products: Products,
    favoriteProducts: Products.filter(product => product.isFavorite),
    historySearch: ['adi', 'ab', 'ac', 'dsa', 'axzc', 'b', 'c'],
    cartProducts: [], // Cart items
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        toggleFavorite: (state, action) => {
            const productId = action.payload;
            const product = state.products.find((p) => p.id === productId);
            if (product) {
                product.isFavorite = !product.isFavorite;
                if (product.isFavorite) {
                    state.favoriteProducts.push(product);
                } else {
                    state.favoriteProducts = state.favoriteProducts.filter((p) => p.id !== productId);
                }
            }
        },
        addHistorySearch: (state, action) => {
            if (!state.historySearch.includes(action.payload)) {
                state.historySearch.unshift(action.payload); // Add the latest search at the start
            }
        },
        removeHistorySearch: (state, action) => {
            state.historySearch = state.historySearch.filter((item) => item !== action.payload);
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        addToCart: (state, action) => {
            const { productId, size, color } = action.payload;
            const existingProduct = state.cartProducts.find(
                (item) => item.productId === productId && item.size === size && item.color === color
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                const product = state.products.find((p) => p.id === productId);
                if (product) {
                    state.cartProducts.push({
                        productId,
                        size,
                        color,
                        quantity: 1,
                        name: product.name,
                        price: product.price,
                        image: product.image
                    });
                }
            }
        },
        removeFromCart: (state, action) => {
            const { productId, size, color } = action.payload;
            state.cartProducts = state.cartProducts.filter(
                (item) => !(item.productId === productId && item.size === size && item.color === color)
            );
        },
        increaseQuantity: (state, action) => {
            const { productId, size, color } = action.payload;
            const product = state.cartProducts.find(
                (item) => item.productId === productId && item.size === size && item.color === color
            );
            if (product) product.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const { productId, size, color } = action.payload;
            const product = state.cartProducts.find(
                (item) => item.productId === productId && item.size === size && item.color === color
            );
            if (product && product.quantity > 1) product.quantity -= 1;
        },
        updateCartItemQuantity: (state, action) => {
            const { productId, size, color, increment } = action.payload;
            const cartItem = state.cartProducts.find(
                (item) => item.productId === productId && item.size === size && item.color === color
            );

            if (cartItem) {
                if (increment) {
                    cartItem.quantity += 1;
                } else if (cartItem.quantity > 1) {
                    cartItem.quantity -= 1;
                }
            }
        },


    },
});

export const {
    setProducts,
    toggleFavorite,
    addHistorySearch,
    removeHistorySearch,
    setSearchTerm,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateCartItemQuantity,
} = productsSlice.actions;

export default productsSlice.reducer;
