import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
// Import your images here
import left from './assets/Left.png';
import star from './assets/Star.png';
import emptyStar from './assets/emptyStar.png';
import search from './assets/Search.png';
import more from './assets/More.png';
import favorite from './assets/Favorite.png';

// Sample product detail data
const productDetail = [
  {
    name: 'Nike Air',
    image: require('./assets/Product.png'),
    price: '$534.43',
    colors: [
      { name: '#0000FF' }, 
      { name: '#FF0000' }, 
      { name: '#000000' },
      { name: '#000000' },
      { name: '#000000' },
      { name: '#000000' },
      { name: '#000000' },
      { name: '#000000' },
    ],
    sizes: [
      { size: '5' },
      { size: '7.5' },
      { size: '6' },
      { size: '6.5' },
      { size: '7' },
      { size: '7.5' },
      { size: '8' },
      { size: '8.5' },

    ],
    detail: "The Nike Air Max 270 React ENG combines a full-length React foam midsole with a 270 Max Air unit for unrivaled comfort and a striking visual experience.",
    reviews: [
      { 
        avatar: require('./assets/Profile.png'),
        name: "James Lawson",
        comment: "air max are always very comfortable fit, clean and just perfect in every way. just the box was too small and scrunched the sneakers up a little bit, not sure if the box was always this small but the 90s are and will always be one of my favorites."
      },
    ],
    similarProducts: [
      {
        image: require('./assets/shoes.png'),
        name: 'Nike Air',
        salePrice: '$299.43',
        price: '$534.43',
        sale: '24% Off',
      },
      {
        image: require('./assets/shoes.png'),
        name: 'Nike Air',
        salePrice: '$299.43',
        price: '$534.43',
        sale: '24% Off',
      },
      {
        image: require('./assets/shoes.png'),
        name: 'Nike Air',
        salePrice: '$299.43',
        price: '$534.43',
        sale: '24% Off',
      },
    ]
  },
];

// Render product detail component
const renderProductDetail = ({ item }) => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Image source={left} style={{ marginLeft: 10, marginRight: 10 }} />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.name}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Image source={search} style={{ marginLeft: 10, marginRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={more} style={{ marginRight: 10 }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Image source={item.image} style={{ marginBottom: 15 }} />

      <SafeAreaView>
        <SafeAreaView style={styles.info}>
          <Text style={{ marginLeft: 7, fontWeight: 'bold',fontSize:20 }}>{item.name}</Text>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Image source={favorite} />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.rating}>
          <Image source={star} style={{ marginRight: 4 }} />
          <Image source={star} style={{ marginRight: 4 }} />
          <Image source={star} style={{ marginRight: 4 }} />
          <Image source={star} style={{ marginRight: 4 }} />
          <Image source={emptyStar} />
        </View>

        <Text style={{ color: '#40BFFF', fontWeight: 'bold', marginLeft: 7 }}>{item.price}</Text>
      </SafeAreaView>
    </SafeAreaView>
  );
};

// Render size options
const renderSize = ({ item }) => {
  return (
    <View style={styles.choice}>
      <TouchableOpacity style={styles.sizeView}>
        <Text>{item.size}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Render color options
const renderColor = ({ item }) => {
  return (
    <View style={styles.choice}>
      <TouchableOpacity style={[styles.colorView, { backgroundColor: item.name }]} />
    </View>
  );
};

// Render product reviews
const renderReview = ({ item }) => {
  return (
    <View>
      <View style={styles.personalInfo}>
        <Image source={item.avatar} style={{ marginRight: 10 }} />
        <View style={styles.rate}>
          <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>{item.name}</Text>
          <View style={styles.rating}>
            <Image source={star} style={{ marginRight: 4 }} />
            <Image source={star} style={{ marginRight: 4 }} />
            <Image source={star} style={{ marginRight: 4 }} />
            <Image source={star} style={{ marginRight: 4 }} />
            <Image source={emptyStar} />
          </View>
        </View>
      </View>
      <Text style={{ marginLeft: 15, marginBottom: 15 }}>{item.comment}</Text>
    </View>
  );
};

// Render similar products
const renderSimilarProduct = ({ item }) => {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={{ margin: 10 }} />
      </View>
      <Text style={{ fontWeight: "bold", marginLeft: 7 }}>{item.name}</Text>
      <View style={styles.ratingProducts}>
        <Image source={star} />
        <Image source={star} />
        <Image source={star} />
        <Image source={star} />
        <Image source={emptyStar} />
      </View>
      <Text style={{ color: '#40BFFF', fontWeight: 'bold', marginLeft: 7 }}>{item.salePrice}</Text>
      <View style={styles.priceRow}>
        <Text style={{ textDecorationLine: 'line-through', color: '#9098B1', fontSize: 12, marginLeft:-3 }}>
          {item.price}
        </Text>
        <Text style={{ color: 'red', fontSize: 12 }}>{item.sale}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Main App component
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView style={styles.itemView}>
          <FlatList
            data={productDetail}
            renderItem={renderProductDetail}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>

        <Text style={styles.element}>Select Size</Text>
        <View style={styles.sizeChoice}>
          <FlatList
            data={productDetail[0].sizes}
            renderItem={renderSize}
            horizontal={true}
            keyExtractor={(item) => item.size}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <Text style={styles.element}>Select Color</Text>
        <View style={styles.sizeChoice}>
          <FlatList
            data={productDetail[0].colors}
            renderItem={renderColor}
            horizontal={true}
            keyExtractor={(item) => item.name}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <Text style={styles.element}>Description</Text>
        <Text style={{ marginLeft: 15, marginBottom: 15 }}>{productDetail[0].detail}</Text>

        <View style={styles.cmtSection}>
          <Text style={styles.element}>Review Product</Text>
          <TouchableOpacity>
            <Text style={{ color: '#40BFFF', marginRight: 10 }}>See more</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={productDetail[0].reviews}
          renderItem={renderReview}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
        />

        <Text style={styles.element}>You Might Also Like</Text>
        <SafeAreaView style={styles.itemView}>
          <FlatList
            data={productDetail[0].similarProducts}
            renderItem={renderSimilarProduct}
            horizontal={true}
            keyExtractor={(item) => item.name}
            showsHorizontalScrollIndicator={false}
          />
        </SafeAreaView>

        <TouchableOpacity style = {styles.addCart}>
          <Text style={{color:'white', fontSize:18}}>Add To Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 8,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
  },
  headerRight: {
    flexDirection: 'row',
    marginRight: 10,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 7,
    marginTop:10
  },
  sizeView: {
    borderRadius: 20,  
    borderWidth: 1,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  element: {
    marginLeft: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  choice: {
    marginLeft: 15,
  },
  colorView: {
    borderRadius: 20,  
    width: 40,
    height: 40,
  },
  personalInfo: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  rate: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  cmtSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    marginTop: 20,
    marginLeft: 15,
    borderWidth: 2,
    borderColor: '#edf1ff', 
    flex: 1,
    marginBottom:20
  },
  itemView: {
    flex: 1,
  },
  sizeChoice: {
    flexDirection: 'row',
    marginBottom: 15,
  },
    priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10, 
  },
    imageContainer: {
    alignItems: 'center', 
    marginVertical: 10,  
  },
  ratingProducts:{
    flexDirection:'row',
    marginBottom:10,
    marginLeft:7
  },
  addCart:{
    flex:1,
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
