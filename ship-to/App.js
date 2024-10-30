import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, FlatList } from 'react-native';
import left from './assets/Left.png'
import add from './assets/Plus.png'



const deliveryInfo =[
  {
    name: 'Priscekila',
    address:'3711 Spring Hill Rd undefined Tallahassee, Nevada 52874 United States',
    number : '+99 1234567890',
    
  },
]

const renderDelivery = ({item}) =>{
  return(
    <TouchableOpacity style = {styles.item}>
      <Text style={{fontWeight:'bold', fontSize:15, marginTop:15}}>{item.name}</Text>
      <Text style={{marginRight:10, marginTop:15}}>{item.address}</Text>
      <Text style={{marginTop:15, marginBottom:15}}>{item.number}</Text>
      <View style = {styles.option}>
        <TouchableOpacity style ={styles.edit}>
          <Text style ={{color:'white', fontWeight:'bold'}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('./assets/Trash.png')} style={{marginTop:8}} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style = {styles.header}>
      <SafeAreaView style ={styles.headerLeft}>
        <TouchableOpacity>
          <Image source={left} style ={{marginLeft:10,marginRight:10}} />
        </TouchableOpacity>
        <Text style={{fontWeight:'bold', fontSize:15}}>Ship To</Text>
        </SafeAreaView>
        <SafeAreaView>
        <Image source={add} style={{marginRight:15}} />
        </SafeAreaView>
       </SafeAreaView>
        <View style ={styles.hr} />

      <SafeAreaView style={styles.deliveryView}>
        <FlatList
        data ={deliveryInfo}
        renderItem = {renderDelivery}
        keyExtractor ={(item) => item.address}
        showsVerticalScrollIndicator = {false}
        />
      </SafeAreaView>

    <TouchableOpacity style={styles.nextBtn}>
      <Text style ={{color:'white', fontWeight:'bold'}}>Next</Text>
    </TouchableOpacity>

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
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:10
  },
  headerLeft:{
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
    marginLeft:20,
    borderWidth:2,
    borderColor:'#EBF0FF',
    paddingLeft:20,
    marginRight:20

  },
  deliveryView:{
    flex:1
  },
  option:{
    flexDirection:'row',
  },
  edit:{
    width:70,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#40BFFF',
    height:40,
    borderRadius:6,
    marginRight:30,
    marginBottom:15
  },
  nextBtn:{
    flexDirection:'row',
    width:300,
    backgroundColor:'#40BFFF',
    height:40,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    borderRadius:6,
    marginBottom:20
  }
});
export default App;
