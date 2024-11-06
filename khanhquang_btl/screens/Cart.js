import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import favorite from '../assets/Cart/Favorite.png';
import trash from '../assets/Cart/Trash.png';

const initialProducts = [
  {
    id: 1,
    image: require('../assets/Cart/shoes.png'),
    name: 'Nike Air',
    price: 534.43,
  },
  {
    id: 2,
    image: require('../assets/Cart/shoes.png'),
    name: 'Adidas Boost',
    price: 450.23,
  },
  // Add more products as needed
];

const coupons = [
  { code: 'DISCOUNT10', discount: 0.10 }, // 10% discount
  { code: 'SAVE50', discount: 50 }, // $50 off
  { code: 'FREESHIP', discount: 'shipping' }, // Free shipping
];

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

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [counts, setCounts] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);

  const shippingFee = 40.00;

  const increaseCount = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 1) + 1,
    }));
  };

  const decreaseCount = (id) => {
    setCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      if (updatedCounts[id] > 1) {
        updatedCounts[id] -= 1;
      }
      return updatedCounts;
    });
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    setCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      delete updatedCounts[id];
      return updatedCounts;
    });
  };

  const getTotalCount = () => {
    return Object.values(counts).reduce((total, count) => total + count, 0);
  };

  const getTotalItemPrice = () => {
    return products.reduce((total, item) => {
      const count = counts[item.id] || 1;
      return total + item.price * count;
    }, 0);
  };

  const getTotalPrice = () => {
    const totalItemPrice = getTotalItemPrice();
    const shipping = freeShipping ? 0 : shippingFee;
    const discountedTotal = totalItemPrice - appliedDiscount;
    return (discountedTotal + shipping).toFixed(2);
  };

  const applyCoupon = () => {
    const coupon = coupons.find((c) => c.code === couponCode);
    if (coupon) {
      if (coupon.discount === 'shipping') {
        setFreeShipping(true);
        setAppliedDiscount(0);
      } else if (coupon.discount < 1) {
        setAppliedDiscount(getTotalItemPrice() * coupon.discount);
        setFreeShipping(false);
      } else {
        setAppliedDiscount(coupon.discount);
        setFreeShipping(false);
      }
      Alert.alert('Coupon Applied', `Coupon code "${coupon.code}" applied successfully!`);
    } else {
      Alert.alert('Invalid Coupon', 'The coupon code you entered is not valid.');
      setAppliedDiscount(0);
      setFreeShipping(false);
    }
  };

  const renderFavProduct = ({ item }) => {
    const count = counts[item.id] || 1;
    return (
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={styles.info}>
          <View style={styles.detailsContainer}>
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity>
                <Image source={favorite} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeProduct(item.id)}>
                <Image source={trash} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${item.price}</Text>
            <View style={{ marginLeft: 20 }}>
              <Counter
                count={count}
                increaseCount={() => increaseCount(item.id)}
                decreaseCount={() => decreaseCount(item.id)}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>Your Cart</Text>
      </SafeAreaView>
      <View style={styles.hr} />
      <FlatList
        data={products}
        renderItem={renderFavProduct}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.coupon}>
        <TextInput
          placeholder="Enter Coupon Code"
          style={styles.couponInp}
          value={couponCode}
          onChangeText={setCouponCode}
        />
        <TouchableOpacity style={styles.applyBtn} onPress={applyCoupon}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Apply</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.receipt}>
        <View style={styles.totalItemsContainer}>
          <Text style={styles}>Items ({getTotalCount()})</Text>
          <Text style={styles}>${getTotalItemPrice().toFixed(2)}</Text>
        </View>
        <View style={styles.totalItemsContainer}>
          <Text>Shipping fee</Text>
          <Text>${freeShipping ? '0.00' : shippingFee.toFixed(2)}</Text>
        </View>
        <View style={styles.hr} />
        <View style={styles.totalItemsContainer}>
          <Text>Total Price</Text>
          <Text>${getTotalPrice()}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.checkout}>
        <Text style={{ color: 'white', fontSize: 18 }}>Check Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 8,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 15,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 15,
  },
  hr: {
    width: '100%',
    borderBottomColor: '#edf1ff',
    borderBottomWidth: 2,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#edf1ff',
    borderRadius: 10,
    width: 340,
    marginLeft: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  detailsContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  price: {
    fontSize: 14,
    color: '#40BFFF',
    fontWeight: 'bold',
  },
  counterContainer: {
    marginLeft:40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    borderRadius: 10,
    padding: 5,
    height: 30,
    borderWidth: 2,
  },
  button: {
  padding:10,
},

  buttonText: {
    fontSize: 20,
    color: '#7F8C8D',
    marginBottom:6
  },
  countContainer: {
    width: 40,
    alignItems: 'center',
  },
  countText: {
    fontSize: 14,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  coupon: {
    flexDirection: 'row',
    width: 300,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#edf1ff',
    height: 40,
    alignItems: 'center',
    marginTop:10
  },
  couponInp: {
    width: 230,
    paddingLeft: 20,
    height: 40,
  },
  applyBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 40,
    width: 70,
    borderColor: '#edf1ff',
    backgroundColor: '#40BFFF',
  },
  totalItemsContainer: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },

  receipt:{
    paddingLeft:20,
    paddingRight:20,
    borderWidth:1,
    borderColor: '#edf1ff',
    marginLeft:10,
    marginRight:10,
    marginTop:10,
    marginBottom:20,
    paddingBottom:10
  },
  checkout:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#40BFFF',
    width:300,
    alignSelf:'center',
    height:40,
    borderRadius:10,
    marginBottom:20
  }
});

export default App;
