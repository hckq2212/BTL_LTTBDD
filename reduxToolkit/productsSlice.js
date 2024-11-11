import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, realtimeDB } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set, get, remove, update, push } from 'firebase/database';
import axios from 'axios';

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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
export const fetchUserProfile = createAsyncThunk(
    'auth/fetchUserProfile',
    async (uid, { rejectWithValue }) => {
        try {
            console.log('Fetching profile for UID:', uid); // Kiểm tra UID được truyền
            const snapshot = await get(ref(realtimeDB, `profileInfo/${uid}`));
            if (snapshot.exists()) {
                console.log('Snapshot data:', snapshot.val()); // Kiểm tra dữ liệu trả về
                return { uid, ...snapshot.val() };
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
// Thêm thông tin giao hàng vào Firebase
export const addDeliveryInfo = createAsyncThunk(
    'delivery/addDeliveryInfo',
    async ({ uid, deliveryInfo }, { rejectWithValue }) => {
        try {
            const deliveryRef = ref(realtimeDB, `deliveryInfo/${uid}`);
            const newDeliveryRef = push(deliveryRef); // Tạo ref mới trong deliveryInfo
            await set(newDeliveryRef, { ...deliveryInfo, id: newDeliveryRef.key }); // Thêm thông tin mới
            return { ...deliveryInfo, id: newDeliveryRef.key };
        } catch (error) {
            return rejectWithValue({ id: Date.now(), error: error.message });
        }
    }
);

// Lấy danh sách thông tin giao hàng từ Firebase
export const fetchDeliveryInfo = createAsyncThunk(
    'delivery/fetchDeliveryInfo',
    async (uid, { rejectWithValue }) => {
        try {
            const deliveryRef = ref(realtimeDB, `deliveryInfo/${uid}`);
            const snapshot = await get(deliveryRef);

            if (snapshot.exists()) {
                return Object.values(snapshot.val());
            } else {
                return [];
            }
        } catch (error) {
            return rejectWithValue({ id: Date.now(), error: error.message });
        }
    }
);

// Xóa thông tin giao hàng
export const removeDeliveryInfo = createAsyncThunk(
    'delivery/removeDeliveryInfo',
    async ({ uid, id }, { rejectWithValue }) => {
        try {
            const deliveryRef = ref(realtimeDB, `deliveryInfo/${uid}/${id}`);
            await remove(deliveryRef);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Cập nhật thông tin giao hàng
export const updateDeliveryInfo = createAsyncThunk(
    'delivery/updateDeliveryInfo',
    async ({ uid, id, updatedInfo }, { rejectWithValue }) => {
        try {
            const deliveryRef = ref(realtimeDB, `deliveryInfo/${uid}/${id}`);
            await update(deliveryRef, updatedInfo);
            return { id, updatedInfo };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const fetchPaymentMethods = createAsyncThunk(
    'products/fetchPaymentMethods',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://67231a7a2108960b9cc6ac7c.mockapi.io/paymentMethods');
            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thêm phương thức thanh toán mới
export const addPaymentMethod = createAsyncThunk(
    'products/addPaymentMethod',
    async (newMethod, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://67231a7a2108960b9cc6ac7c.mockapi.io/paymentMethods', newMethod);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Cập nhật phương thức thanh toán
export const updatePaymentMethod = createAsyncThunk(
    'products/updatePaymentMethod',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            console.log("Updated Data: ", updatedData);
            console.log("ID: ", id);
            const response = await axios.put(`https://67231a7a2108960b9cc6ac7c.mockapi.io/paymentMethods/${id}`, updatedData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
// Lấy danh sách lịch sử tìm kiếm
export const fetchHistorySearch = createAsyncThunk(
    'products/fetchHistorySearch',
    async (uid, { rejectWithValue }) => {
        try {
            const historyRef = ref(realtimeDB, `historySearch/${uid}`);
            const snapshot = await get(historyRef);

            if (snapshot.exists()) {
                return Object.entries(snapshot.val()).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
            } else {
                return [];
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thêm từ khóa tìm kiếm
export const addHistorySearch = createAsyncThunk(
    'products/addHistorySearch',
    async ({ uid, search }, { getState, rejectWithValue }) => {
        try {
            const state = getState().products.historySearch;
            const existingItem = state.find(item => item.search.toLowerCase() === search.toLowerCase());

            const historyRef = ref(realtimeDB, `historySearch/${uid}`);

            if (existingItem) {
                // Nếu từ khóa đã tồn tại, cập nhật lại giá trị
                const existingKey = existingItem.id;
                await update(child(historyRef, existingKey), { search });
            } else {
                // Nếu từ khóa chưa tồn tại, thêm mới
                const newRef = push(historyRef);
                await set(newRef, { search });
            }

            return { search };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
// Xóa từ khóa tìm kiếm
export const removeHistorySearch = createAsyncThunk(
    'products/removeHistorySearch',
    async ({ uid, id }, { rejectWithValue }) => {
        try {
            const historyRef = ref(realtimeDB, `historySearch/${uid}/${id}`);
            await remove(historyRef);
            return id; // Trả về id của từ khóa đã xóa
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
// Cập nhật thông tin hồ sơ người dùng
export const updateProfileInfo = createAsyncThunk(
    'auth/updateProfileInfo',
    async ({ uid, updatedData }, { rejectWithValue }) => {
        try {
            const profileRef = ref(realtimeDB, `profileInfo/${uid}`);
            await update(profileRef, updatedData);
            return { uid, updatedData };
        } catch (error) {
            return rejectWithValue({ id: Date.now(), error: error.message });
        }
    }
);

// Initial State
const initialState = {
    products: [],
    profile: null,
    accountLoggedIn: null,
    cartProducts: [],
    historySearch: [],
    fetchCartError: null,
    paymentMethods: [],
    fetchPaymentMethodsError: null,
    addPaymentMethodError: null,
    updatePaymentMethodError: null,
    deliveryInfo: [],
    deliveryErrors: [],
    loginErrors: [],
    registerErrors: [],
    fetchProfileErrors: [],
    fetchProductsErrors: [],
    loginSuccess: false,
    registerSuccess: false,
    loading: false,

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
                console.log('Reducer fulfilled:', action.payload); // Kiểm tra xem reducer có chạy không
                state.profile = action.payload;
                state.fetchProfileErrors = [];
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                console.log('Reducer rejected:', action.payload); // Kiểm tra lỗi nếu có
                state.fetchProfileErrors.push(action.payload);
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartProducts = action.payload;
                state.fetchCartError = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.fetchCartError = action.payload;
                console.error('Fetch Cart Failed:', action.payload);
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
            // Thêm thông tin giao hàng
            .addCase(addDeliveryInfo.fulfilled, (state, action) => {
                state.deliveryInfo.push(action.payload);
            })
            .addCase(addDeliveryInfo.rejected, (state, action) => {
                state.deliveryErrors.push(action.payload);
            })

            // Lấy thông tin giao hàng
            .addCase(fetchDeliveryInfo.fulfilled, (state, action) => {
                state.deliveryInfo = action.payload;
            })
            .addCase(fetchDeliveryInfo.rejected, (state, action) => {
                state.deliveryErrors.push(action.payload);
            })

            // Xóa thông tin giao hàng
            .addCase(removeDeliveryInfo.fulfilled, (state, action) => {
                state.deliveryInfo = state.deliveryInfo.filter(
                    (info) => info.id !== action.payload
                );
            })
            .addCase(removeDeliveryInfo.rejected, (state, action) => {
                state.deliveryErrors.push(action.payload);
            })

            // Cập nhật thông tin giao hàng
            .addCase(updateDeliveryInfo.fulfilled, (state, action) => {
                const { id, updatedInfo } = action.payload;
                const existingInfo = state.deliveryInfo.find((info) => info.id === id);
                if (existingInfo) {
                    Object.assign(existingInfo, updatedInfo); // Cập nhật dữ liệu trong state
                }
            })
            .addCase(updateDeliveryInfo.rejected, (state, action) => {
                state.deliveryErrors.push(action.payload);
            })
            .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
                state.paymentMethods = action.payload;
                state.fetchPaymentMethodsError = null;
            })
            .addCase(fetchPaymentMethods.rejected, (state, action) => {
                state.fetchPaymentMethodsError = action.payload;
            })
            .addCase(addPaymentMethod.fulfilled, (state, action) => {
                state.paymentMethods.push(action.payload);
                state.addPaymentMethodError = null;
            })
            .addCase(addPaymentMethod.rejected, (state, action) => {
                state.addPaymentMethodError = action.payload;
            })
            .addCase(updatePaymentMethod.fulfilled, (state, action) => {
                const index = state.paymentMethods.findIndex((method) => method.id === action.payload.id);
                if (index !== -1) {
                    state.paymentMethods[index] = action.payload;
                }
                state.updatePaymentMethodError = null;
            })
            .addCase(updatePaymentMethod.rejected, (state, action) => {
                state.updatePaymentMethodError = action.payload;
            })
            .addCase(fetchHistorySearch.fulfilled, (state, action) => {
                state.historySearch = action.payload;
            })
            .addCase(fetchHistorySearch.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(addHistorySearch.fulfilled, (state, action) => {
                const existingIndex = state.historySearch.findIndex(
                    (item) => item.search.toLowerCase() === action.payload.search.toLowerCase()
                );

                if (existingIndex !== -1) {
                    const [existingItem] = state.historySearch.splice(existingIndex, 1);
                    state.historySearch.unshift(existingItem);
                } else {
                    state.historySearch.unshift(action.payload);
                }

                if (state.historySearch.length > 10) {
                    state.historySearch.pop();
                }
            })
            .addCase(addHistorySearch.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(removeHistorySearch.fulfilled, (state, action) => {
                state.historySearch = state.historySearch.filter(item => item.id !== action.payload);
            })
            .addCase(removeHistorySearch.rejected, (state, action) => {
                state.error = action.payload;
            }).addCase(updateProfileInfo.fulfilled, (state, action) => {
                const { uid, updatedData } = action.payload;
                if (state.profile && state.profile.uid === uid) {
                    state.profile = { ...state.profile, ...updatedData }; // Cập nhật hồ sơ trong Redux
                }
                console.log('Profile updated successfully:', updatedData);
            })
            .addCase(updateProfileInfo.rejected, (state, action) => {
                console.error('Update Profile Failed:', action.payload);
            });

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
