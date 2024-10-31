import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, FlatList } from 'react-native';
import left from './assets/Favorite_Product/Left.png'
import star from './assets/Favorite_Product/Star.png'
import emptyStar from './assets/Favorite_Product/emptyStar.png'


const favProduct = [
  {
    image:require('./assets/Favorite_Product/shoes.png'),
    name:'Nike Air',
    salePrice:'$299.43',
    price:'$534.43',
    sale:'24% Off',
    remove:require('./assets/Favorite_Product/Trash.png')
  },
  {
    image:require('./assets/Favorite_Product/shoes.png'),
    name:'Nike Air Pro',
    salePrice:'$299.43',
    price:'$534.43',
    sale:'24% Off',
    remove:require('./assets/Favorite_Product/Trash.png')
  },
]


const renderFavProduct = ({item}) =>{
  return(
    <TouchableOpacity style = {styles.item}>
       <View style={styles.imageContainer}>
        <Image source={item.image} style={{ margin: 10 }} />
      </View>
      <Text style={{fontWeight:"bold",marginLeft:7}}>{item.name}</Text>
      <View style = {styles.rating}>
        <Image source={star} />
        <Image source={star} />
        <Image source={star} />
        <Image source={star} />
        <Image source={emptyStar} />
      </View>
      <Text style={{color:'#40BFFF', fontWeight:'bold',marginLeft:7}}>{item.salePrice}</Text>
      <View style={styles.priceRow}>
        <Text style={{ textDecorationLine: 'line-through', color: '#9098B1', fontSize: 12 }}>{item.price}
        </Text>
        <Text style={{ color: 'red', fontSize: 12 }}>{item.sale}</Text>
        <TouchableOpacity><Image source={item.remove} /></TouchableOpacity>
      </View>

    </TouchableOpacity>
  )
}

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style = {styles.header}>
        <TouchableOpacity><Image source={left} style ={{marginLeft:10,marginRight:10}} /></TouchableOpacity>
        <Text style={{fontWeight:'bold', fontSize:15}}>Favorite Product</Text>
       </SafeAreaView>
        <View style ={styles.hr} />


        <SafeAreaView style={styles.itemView}>
        <FlatList
        data ={favProduct}
        renderItem = {renderFavProduct}
        keyExtractor ={(item) => item.name}
        showsVerticalScrollIndicator = {false}
        numColumns={2}
        />
        </SafeAreaView>

    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 8,
  },
  
  header:{
    marginTop:20,
    flexDirection:'row',
    marginBottom:15

  },
    hr: {
    width:'100%',
    borderBottomColor: '#edf1ff',  
    borderBottomWidth: 2,               
  },
  item:{
    marginTop:20,
    marginLeft:15,
    borderWidth:2,
    borderColor: '#edf1ff', 
    flex:1 

  },
  itemView:{
    flex:1,
  },
  rating:{
    flexDirection:'row',
    marginBottom:10,
    marginLeft:7
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10, // Adjust padding as needed
  },
    imageContainer: {
    alignItems: 'center', // Center the image horizontally
    marginVertical: 10,   // Adjust vertical margin as needed
  },
  
});
export default App;
