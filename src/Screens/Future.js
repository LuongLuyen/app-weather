import { StyleSheet, Text, View,Image,TouchableOpacity ,ImageBackground,Button, FlatList} from 'react-native';
import moment from 'moment';
import bg from '../../assets/mua1.gif'

function Future({ route }) {
    const listWeather = route.params?.listWeather.list || []
    const city = route.params?.listWeather.city.name || 'Hà Nội'

    const renderItem = ({ item ,index}) => (
      <ImageBackground
      source={bg}
      style={styles.backgroundImage}
    >
        <View key={index.toString()} style={styles.weather}>
            <View style={styles.weatherC}>
               <Text style={styles.colorText}>{city}</Text>
            </View>
            <View style={styles.weatherC}>
               <Text style={styles.colorText}>{item.weather[0].description}</Text>
            </View>
            <View style={styles.weatherC}>
                <Image style={styles.iconWeather}  source={{ uri:`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}}/>

            </View>
            <View style={styles.weatherC}>
               <Text style={styles.colorText}>{item.main.temp} °C</Text>
            </View>
            <View style={styles.weatherC}>
              <Text style={styles.colorText}>Độ ẩm: {item.main.humidity}%</Text>
              <Text style={styles.colorText}>Gió: {(item.wind.speed *3.6).toFixed(2)}Km/h</Text>
            </View>
            <View style={styles.weatherC}>
               <Text style={styles.colorText}>{item.dt_txt}</Text>
            </View>
        </View>
        </ImageBackground>
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
    alignItems: 'center',
  },
    container: {
      alignItems: 'center',
      backgroundColor: '#eeeeee',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    },
    iconWeather: {
      width: 200,
      height: 200,
    },
    weather: {
      width: 340,
      margin:5,
      borderRadius: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      justifyContent: 'center'
    },
    weatherC: {
        display: 'flex',
        alignItems: 'center',
    },
    colorText: {
      color: '#fff'
    }
  
  });

export default Future;