import { StyleSheet, Text, View,Image,TouchableOpacity ,Button, FlatList} from 'react-native';

function Future({ route }) {
    const listWeather = route.params?.listWeather.list || []
    const city = route.params?.listWeather.city.name || 'Hà Nội'

    const renderItem = ({ item ,index}) => (
        <View key={index.toString()} style={styles.weather}>
            <View style={styles.weatherC}>
               <Text>{city}</Text>
            </View>
            <View style={styles.weatherC}>
               <Text>{item.weather[0].description}</Text>
            </View>
            <View style={styles.weatherC}>
                <Image style={styles.iconWeather}  source={{ uri:`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}}/>

            </View>
            <View style={styles.weatherC}>
               <Text>{item.main.temp} °C</Text>
            </View>
            <View style={styles.weatherC}>
               <Text>{item.dt_txt}</Text>
            </View>
        </View>
      );


    return ( 
        <View>
            <FlatList horizontal
                data={listWeather}
                renderItem={renderItem}
            />
        </View>
     );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    iconWeather: {
      width: 200,
      height: 200,
    },
    weather: {
        borderWidth: 0.5,
        width: 340,
        margin:10,
        borderRadius: 10
    },
    weatherC: {
        display: 'flex',
        alignItems: 'center'
    }
  });

export default Future;