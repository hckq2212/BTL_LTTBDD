import { createSlice } from '@reduxjs/toolkit';
import Products from '../data/data.js';

const initialState = {
    products: Products,
    favoriteProducts: Products.filter(product => product.isFavorite),
    historySearch: ['adi', 'ab', 'ac', 'dsa', 'axzc', 'b', 'c'],
    cartProducts: [],
    deliveryInfo: [
        {
            id: 1,
            name: 'Priscekila',
            address: '3711 Spring Hill Rd undefined Tallahassee, Nevada 52874 United States',
            number: '+99 1234567890',
        },
    ],
    selectedAddressId: null,
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
                state.historySearch.unshift(action.payload);
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
        addDeliveryAddress: (state, action) => {
            const newAddress = { ...action.payload, id: Date.now() };
            state.deliveryInfo.push(newAddress);
        },
        editDeliveryAddress: (state, action) => {
            const { id, updatedAddress } = action.payload;
            const index = state.deliveryInfo.findIndex((address) => address.id === id);
            if (index >= 0) {
                state.deliveryInfo[index] = { ...state.deliveryInfo[index], ...updatedAddress };
            }
        },
        deleteDeliveryAddress: (state, action) => {
            state.deliveryInfo = state.deliveryInfo.filter((address) => address.id !== action.payload);
        },
        selectDeliveryAddress: (state, action) => {
            state.selectedAddressId = action.payload;
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
    addDeliveryAddress,
    editDeliveryAddress,
    deleteDeliveryAddress,
    selectDeliveryAddress,
} = productsSlice.actions;

export default productsSlice.reducer;
