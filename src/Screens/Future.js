import { StyleSheet, Text, View,Image,TouchableOpacity ,Button, FlatList} from 'react-native';
import moment from 'moment';

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
              <Text>Độ ẩm: {item.main.humidity}%</Text>
              <Text>Gió: {(item.wind.speed *3.6).toFixed(2)}Km/h</Text>
            </View>
            <View style={styles.weatherC}>
               <Text>{item.dt_txt}</Text>
            </View>
        </View>
      );


    return ( 
        <View style={styles.container}>
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
      alignItems: 'center',
      backgroundColor: '#eeeeee',
      justifyContent: 'center'
    },
    iconWeather: {
      width: 200,
      height: 200,
    },
    weather: {
      width: 340,
      margin:5,
      borderRadius: 10,
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'center'
    },
    weatherC: {
        display: 'flex',
        alignItems: 'center',
    }
  });

export default Future;