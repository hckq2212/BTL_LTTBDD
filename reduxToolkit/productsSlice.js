import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, realtimeDB } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set, get, remove, update } from 'firebase/database';

// Async Thunks

// Đăng ký tài khoản
export const register = createAsyncThunk(
    'auth/register',
    async ({ email, password, fullName, phoneNumber }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const profileData = {
                fullName: fullName || 'N/A',
                phoneNumber: phoneNumber || 'N/A',
                email: email,
                birthdate: "2003-01-01", // Default value
                gender: "Male" // Default value
            };

            await set(ref(realtimeDB, `profileInfo/${user.uid}`), profileData);

            return user.uid; // Chỉ trả về UID
        } catch (error) {
            return rejectWithValue({ id: Date.now(), error: error.message });
        }
    }
);

// Đăng nhập
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            console.log('Attempting to login:', email, password);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful:', userCredential.user);
            return userCredential.user.uid; // Chỉ trả về UID
        } catch (error) {
            console.error('Login error:', error.message);
            return rejectWithValue({ id: Date.now(), error: error.message });
        }
    }
);


// Đăng xuất
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await signOut(auth);
    } catch (error) {
        return rejectWithValue({ id: Date.now(), error: error.message });
    }
});

// Lấy thông tin người dùng
export const fetchUserProfile = createAsyncThunk(
    'auth/fetchUserProfile',
    async (uid, { rejectWithValue }) => {
        try {
            const snapshot = await get(ref(realtimeDB, `profileInfo/${uid}`));
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                throw new Error('Profile not found');
            }
        } catch (error) {
            return rejectWithValue({ id: Date.now(), error: error.message });
        }
    }
);

// Lấy danh sách sản phẩm
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const snapshot = await get(ref(realtimeDB, 'products'));
            if (snapshot.exists()) {
                return Object.values(snapshot.val());
            } else {
                throw new Error('No products found');
            }
        } catch (error) {
            return rejectWithValue({ id: Date.now(), error: error.message });
        }
    }
);

// Thêm sản phẩm vào giỏ hàng
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ uid, productId, size, color }, { getState, rejectWithValue }) => {
        try {
            const state = getState().products;
            const product = state.products.find((p) => p.id === productId);

            if (!product) {
                throw new Error('Product not found');
            }

            // Encode color to avoid invalid characters in Firebase path
            const encodedColor = color.replace(/#/g, '-');

            const cartRef = ref(realtimeDB, `carts/${uid}/${productId}_${size}_${encodedColor}`);
            const snapshot = await get(cartRef);

            if (snapshot.exists()) {
                await set(cartRef, {
                    ...snapshot.val(),
                    quantity: snapshot.val().quantity + 1,
                });
            } else {
                await set(cartRef, {
                    productId,
                    size,
                    color,
                    quantity: 1,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                });
            }

            return { productId, size, color };
        } catch (error) {
            return rejectWithValue({ id: Date.now(), error: error.message });
        }
    }
);

// Lấy giỏ hàng từ Firebase
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (uid, { rejectWithValue }) => {
        try {
            const cartRef = ref(realtimeDB, `carts/${uid}`);
            const snapshot = await get(cartRef);

            if (snapshot.exists()) {
                const data = Object.values(snapshot.val()).map((item) => ({
                    ...item,
                    color: item.color.replace(/-/g, '#'), // Decode color
                }));
                return data;
            } else {
                return [];
            }
        } catch (error) {
            return rejectWithValue({ id: Date.now(), error: error.message });
        }
    }
);

// Thêm/xóa sản phẩm yêu thích
export const toggleFavorite = createAsyncThunk(
    'products/toggleFavorite',
    async ({ productId }, { getState, rejectWithValue }) => {
        try {
            const state = getState().products;
            const product = state.products.find((p) => p.id === productId);

            if (!product) {
                throw new Error('Product not found');
            }

            const productRef = ref(realtimeDB, `products/${productId}/isFavorite`);
            const updatedFavoriteStatus = !product.isFavorite;

            // Cập nhật trạng thái isFavorite trong Firebase
            await set(productRef, updatedFavoriteStatus);

            return { productId, isFavorite: updatedFavoriteStatus };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ uid, productId, size, color }, { rejectWithValue }) => {
        try {
            const encodedColor = color.replace(/#/g, '-');
            const cartRef = ref(realtimeDB, `carts/${uid}/${productId}_${size}_${encodedColor}`);
            await remove(cartRef);
            return { productId, size, color };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartItemQuantity = createAsyncThunk(
    'cart/updateCartItemQuantity',
    async ({ uid, productId, size, color, increment }, { rejectWithValue }) => {
        try {
            const encodedColor = color.replace(/#/g, '-');
            const cartRef = ref(realtimeDB, `carts/${uid}/${productId}_${size}_${encodedColor}`);
            const snapshot = await get(cartRef);

            if (snapshot.exists()) {
                const currentQuantity = snapshot.val().quantity || 1;
                const newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;

                if (newQuantity < 1) {
                    throw new Error('Quantity cannot be less than 1');
                }

                await set(cartRef, { ...snapshot.val(), quantity: newQuantity });
                return { productId, size, color, quantity: newQuantity };
            } else {
                throw new Error('Cart item not found');
            }
        } catch (error) {
            console.log("Update Cart Error: ", error);
            return rejectWithValue(error.message);
        }
    }
);

// Initial State
const initialState = {
    products: [],
    profile: null,
    accountLoggedIn: null,
    cartProducts: [],
    loginErrors: [],
    registerErrors: [],
    fetchProfileErrors: [],
    fetchProductsErrors: [],
    loginSuccess: false,
    registerSuccess: false,
};

// Slice
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetLoginError: (state) => {
            state.loginErrors = [];
        },
        resetRegisterError: (state) => {
            state.registerErrors = [];
        },
        resetFetchProfileError: (state) => {
            state.fetchProfileErrors = [];
        },
        resetFetchProductsError: (state) => {
            state.fetchProductsErrors = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state) => {
                state.registerSuccess = true;
                state.registerErrors = [];
            })
            .addCase(register.rejected, (state, action) => {
                state.registerSuccess = false;
                state.registerErrors.push(action.payload);
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loginSuccess = true;
                state.accountLoggedIn = action.payload;
                state.loginErrors = [];
            })
            .addCase(login.rejected, (state, action) => {
                state.loginSuccess = false;
                state.loginErrors.push(action.payload);
            })
            .addCase(logout.fulfilled, (state) => {
                state.accountLoggedIn = null;
                state.loginSuccess = false;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.fetchProfileErrors = [];
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.fetchProfileErrors.push(action.payload);
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload || [];
                state.fetchProductsErrors = [];
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.fetchProductsErrors.push(action.payload);
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                const { productId, isFavorite } = action.payload;
                const product = state.products.find((p) => p.id === productId);
                if (product) {
                    product.isFavorite = isFavorite;
                }
            })
            .addCase(toggleFavorite.rejected, (state, action) => {
                console.error('Toggle Favorite Failed:', action.payload);
            })
            .addCase(addToCart.fulfilled, (state, action) => {
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
                            image: product.image,
                        });
                    }
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                console.error('Add to Cart Failed:', action.payload);
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                console.log("Updated quantity:", action.payload);
                const { productId, size, color, quantity } = action.payload;
                const item = state.cartProducts.find(
                    (p) => p.productId === productId && p.size === size && p.color === color
                );
                if (item) {
                    item.quantity = quantity;
                }
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                const { productId, size, color } = action.payload;
                state.cartProducts = state.cartProducts.filter(
                    (item) => !(item.productId === productId && item.size === size && item.color === color)
                );
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                console.error('Remove from Cart Failed:', action.payload);
            })
            ;
    },
});

// Export Actions
export const {
    resetLoginError,
    resetRegisterError,
    resetFetchProfileError,
    resetFetchProductsError,
} = productsSlice.actions;

// Export Reducer
export default productsSlice.reducer;
