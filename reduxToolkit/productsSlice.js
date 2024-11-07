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
    account: [
        {
            id: 1,
            name: 'minhduc',
            email: 'minhduc@gmail.com',
            password: '123456',
        },
        {
            id: 2,
            name: 'khanhquang',
            email: 'khanhquang@gmail.com',
            password: '123456',
        }
    ],
    profile: [
        {
            id: 1,
            name: 'minhduc',
            gender: 'Male',
            phoneNumber: '0123456789',
            birthdate: '2003-10-14',
            account_id: 1
        },
        {
            id: 2,
            name: 'khanhquang',
            gender: 'Male',
            phoneNumber: '0123456789',
            birthdate: '2003-12-22',
            account_id: 2
        }
    ],
    accountLoggedIn: null,
    loginError: null,
    loginSuccess: false,
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
            const productIndex = state.products.findIndex((p) => p.id === productId);

            if (productIndex >= 0) {
                const updatedProduct = {
                    ...state.products[productIndex],
                    isFavorite: !state.products[productIndex].isFavorite,
                };

                state.products[productIndex] = updatedProduct;

                if (updatedProduct.isFavorite) {
                    state.favoriteProducts.push(updatedProduct);
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
        addAccount: (state, action) => {
            const {id, name, email, password }= action.payload;
            const existingAccount = state.account.find((acc) => acc.email === action.payload.email);
            if (existingAccount) {
                throw new Error('Email already exists!');
            } else {
                const newAccount = { id, name, email, password };
                state.account.push(newAccount);
            }
        },
        deleteAccount: (state, action) => {
            state.account = state.account.filter((account) => account.id !== action.payload);
        },
        login: (state, action) => {
            const { email, password } = action.payload;
            const account = state.account.filter((acc) => acc.email === email && acc.password === password);
            const size = account.length;
            if (size > 0) {
                state.loginSuccess = true;
                state.loginError = null;
                state.accountLoggedIn = account[0];
            } else {
                state.loginSuccess = false;
                state.loginError = 'Invalid email or password';
            }
        },
        updateAccount: (state, action) => {
            const { id, updatedData } = action.payload;
            const accountIndex = state.account.findIndex((acc) => acc.id === id);
            if (accountIndex !== -1) {
                state.account[accountIndex] = { ...state.account[accountIndex], ...updatedData };
            }
        },
        logout: (state) => {
            state.loginSuccess = false;
        },
        addUserProfile: (state, action) => {
            const { id, name, phoneNumber, gender = 'Male', birthdate = '2003-01-01', account_id } = action.payload;
            state.profile.push({
                id,
                name,
                phoneNumber,
                gender,
                birthdate,
                account_id,
            });
        },
        updateUserProfile: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.profile.findIndex((p) => p.id === id);
            if (index >= 0) {
                state.profile[index] = { ...state.profile[index], ...updatedData };
            }
        },
        deleteUserProfile: (state, action) => {
            state.profile = state.profile.filter((p) => p.id !== action.payload);
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
    addAccount,
    updateAccount,
    deleteAccount,
    login,
    logout,
    addUserProfile,
    updateUserProfile,
    deleteUserProfile
} = productsSlice.actions;

export default productsSlice.reducer;
