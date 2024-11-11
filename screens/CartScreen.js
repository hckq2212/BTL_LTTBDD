import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite, removeFromCart, updateCartItemQuantity, fetchCart } from '../reduxToolkit/productsSlice';
import favorite from '../assets/Cart/Favorite.png';
import trash from '../assets/Cart/Trash.png';
import { useNavigation } from '@react-navigation/native';

const coupons = [
  { code: 'DISCOUNT10', discount: 0.10 },
  { code: 'SAVE50', discount: 50 },
  { code: 'FREESHIP', discount: 'shipping' },
];

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.products.cartProducts);
  console.log(cartProducts);
  const accountLoggedIn = useSelector((state) => state.products.accountLoggedIn);

  const [freeShipping, setFreeShipping] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [shippingFee, setShippingFee] = useState(40.00);

  useEffect(() => {
    if (accountLoggedIn) {
      dispatch(fetchCart(accountLoggedIn)); // Fetch cart on load
    }
  }, [dispatch, accountLoggedIn]);

  useEffect(() => {
    // Nếu giỏ hàng trống, đặt phí vận chuyển bằng 0
    if (cartProducts.length === 0) {
      setShippingFee(0);
    } else {
      setShippingFee(40.00); // Giá trị mặc định của phí vận chuyển
    }
  }, [cartProducts]);

  const handleApplyCoupon = (couponCode) => {
    const coupon = coupons.find((c) => c.code === couponCode);
    if (coupon) {
      if (coupon.discount === 'shipping') {
        setShippingFee(0);
        setFreeShipping(true);
        setAppliedDiscount(0);
      } else if (coupon.discount < 1) {
        setAppliedDiscount(getTotalItemPrice() * coupon.discount);
        setFreeShipping(false);
        setShippingFee(40.00);
      } else {
        setAppliedDiscount(coupon.discount);
        setFreeShipping(false);
        setShippingFee(40.00);
      }
      Alert.alert('Coupon Applied', `Coupon code "${coupon.code}" applied successfully!`);
    } else {
      Alert.alert('Invalid Coupon', 'The coupon code you entered is not valid.');
      setAppliedDiscount(0);
      setFreeShipping(false);
      setShippingFee(40.00);
    }
  };

  const getTotalPrice = () => {
    const totalItemPrice = getTotalItemPrice();
    const shipping = freeShipping || cartProducts.length === 0 ? 0 : shippingFee;
    const discountedTotal = totalItemPrice - appliedDiscount;
    return (discountedTotal + shipping).toFixed(2);
  };

  const getTotalItemPrice = () => {
    return cartProducts.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleToggleFavorite = (productId) => {
    if (!accountLoggedIn) {
      Alert.alert('Error', 'Please log in to toggle favorite status.');
      return;
    }
    dispatch(toggleFavorite({ productId, uid: accountLoggedIn }));
  };

  const getTotalItemCount = () => {
    return cartProducts.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartProducts.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty.');
      return;
    }
    navigation.navigate('ShipToScreen', {
      totalItems: getTotalItemCount(),
      totalPrice: getTotalPrice(),
    });
  };

  const increaseCount = (productId, size, color) => {
    dispatch(updateCartItemQuantity({ uid: accountLoggedIn, productId, size, color, increment: true }));
  };

  const decreaseCount = (productId, size, color) => {
    const product = cartProducts.find((item) => item.productId === productId && item.size === size && item.color === color);
    if (product.quantity > 1) {
      dispatch(updateCartItemQuantity({ uid: accountLoggedIn, productId, size, color, increment: false }));
    } else {
      Alert.alert('Invalid Quantity', 'Minimum quantity is 1.');
    }
  };

  const handleRemoveProduct = (productId, size, color) => {
    dispatch(removeFromCart({ uid: accountLoggedIn, productId, size, color }));
    dispatch(fetchCart(accountLoggedIn));
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.info}>
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={() => handleToggleFavorite(item.productId)}>
              <Image source={favorite} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleRemoveProduct(item.productId, item.size, item.color)}>
              <Image source={trash} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sizeColorRow}>
          <Text style={styles.sizeColorText}>Size: {item.size}</Text>
          <Text style={styles.sizeColorText}>Color: {item.color}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <Counter
            count={item.quantity}
            increaseCount={() => increaseCount(item.productId, item.size, item.color)}
            decreaseCount={() => decreaseCount(item.productId, item.size, item.color)}
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>Your Cart</Text>
      </SafeAreaView>
      <View style={styles.hr} />
      <FlatList
        data={cartProducts}
        renderItem={renderCartItem}
        keyExtractor={(item) => `${item.productId}-${item.size}-${item.color}`}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.coupon}>
        <TextInput
          placeholder="Enter Coupon Code"
          style={styles.couponInp}
          value={couponCode}
          onChangeText={setCouponCode}
        />
        <TouchableOpacity style={styles.applyBtn} onPress={() => handleApplyCoupon(couponCode)}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Apply</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.receipt}>
        <View style={styles.totalItemsContainer}>
          <Text>Total Items ({getTotalItemCount()})</Text>
          <Text>${getTotalItemPrice().toFixed(2)}</Text>
        </View>
        <View style={styles.totalItemsContainer}>
          <Text>Shipping Fee</Text>
          <Text>${shippingFee.toFixed(2)}</Text>
        </View>
        <View style={styles.hr} />
        <View style={styles.totalItemsContainer}>
          <Text>Total Price</Text>
          <Text>${getTotalPrice()}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.checkout, { opacity: cartProducts.length === 0 ? 0.5 : 1 }]}
        onPress={handleCheckout}
        disabled={cartProducts.length === 0}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Check Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const Counter = ({ count, increaseCount, decreaseCount }) => (
  <View style={styles.counterContainer}>
    <TouchableOpacity style={styles.button} onPress={decreaseCount}>
      <Text style={styles.buttonText}>-</Text>
    </TouchableOpacity>
    <View style={styles.countContainer}>
      <Text style={styles.countText}>{count}</Text>
    </View>
    <TouchableOpacity style={styles.button} onPress={increaseCount}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 10,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#223263',
  },
  hr: {
    width: '100%',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#223263',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    color: '#40BFFF',
    fontWeight: 'bold',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 35,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#7F8C8D',
  },
  countContainer: {
    width: 40,
    alignItems: 'center',
  },
  countText: {
    fontSize: 16,
    color: '#223263',
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  coupon: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    height: 45,
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#FFF',
  },
  couponInp: {
    flex: 1,
    paddingLeft: 15,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  applyBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 80,
    backgroundColor: '#40BFFF',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  totalItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  receipt: {
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginVertical: 20,
    paddingVertical: 15,
    elevation: 2,
  },
  checkout: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#40BFFF',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sizeColorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sizeColorText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
});

export default CartScreen;
