import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, FlatList } from 'react-native';
import left from './assets/Category/Left.png'



const category =[
  {
    type:'Shirt',
    image:require('./assets/Category/shirt.png')
  },
    {
    type:'Bikini',
    image:require('./assets/Category/bikini.png')
  },
    {
    type:'Dress',
    image:require('./assets/Category/dress.png')
  },
    {
    type:'Work equpiment',
    image:require('./assets/Category/man_bag.png')
  },
    {
    type:'Man Pants',
    image:require('./assets/Category/man_pants.png')
  },
    {
    type:'Man Shoes',
    image:require('./assets/Category/man_shoes.png')
  },
  
]

const renderCategory = ({item}) =>{
  return(
    <TouchableOpacity style = {styles.item}>
      <Image source ={item.image} style={{marginRight:15}}/>
      <Text>{item.type}</Text>
    </TouchableOpacity>
  )
}

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style = {styles.header}>
        <TouchableOpacity><Image source={left} style ={{marginLeft:10,marginRight:10}} /></TouchableOpacity>
        <Text style={{fontWeight:'bold', fontSize:15}}>Category</Text>
       </SafeAreaView>
        <View style ={styles.hr} />

      <SafeAreaView style={styles.categoryView}>
        <FlatList
        data ={category}
        renderItem = {renderCategory}
        keyExtractor ={(item) => item.type}
        showsVerticalScrollIndicator = {false}
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
    flexDirection:'row',
    marginLeft:15

  },
  categoryView:{
    flex:1
  }
});
export default App;
