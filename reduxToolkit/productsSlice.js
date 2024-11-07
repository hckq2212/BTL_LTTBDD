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
            const existingAccount = state.account.find((acc) => acc.email === action.payload.email);
            if (existingAccount) {
                throw new Error('Email already exists!');
            } else {
                state.account.push({ ...action.payload, id: Date.now() });
            }
        },
        updateAccount: (state, action) => {
    const { id, updatedData } = action.payload;
    const index = state.account.findIndex((account) => account.id === id);
    if (index >= 0) {
        state.account[index] = { ...state.account[index], ...updatedData };
        if (state.accountLoggedIn?.id === id) {
            state.accountLoggedIn = { ...state.accountLoggedIn, ...updatedData };
        }
    }
},
        deleteAccount: (state, action) => {
            state.account = state.account.filter((account) => account.id !== action.payload);
        },
         login: (state, action) => {
            const { email, password } = action.payload;
            console.log(email);
            console.log(password);
            const account = state.account.find((acc) => acc.email === email && acc.password === password);
            console.log(account);
            if (account) {
                state.accountLoggedIn = account;
                state.loginError = null;
            } else {
                state.loginError = 'Invalid email or password'; 
            }
        },

        logout: (state) => {
            state.accountLoggedIn = null;
        },
        addUserProfile: (state, action) => {
            const existingProfile = state.profile.find((p) => p.phoneNumber === action.payload.phoneNumber);
            if (existingProfile) {
                throw new Error('Phone number already exists!');
            } else {
                state.profile.push({ ...action.payload, id: Date.now() });
            }
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
