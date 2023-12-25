import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View,Image,TouchableOpacity ,Button,ImageBackground} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import bg from '../../assets/mua1.gif'

export default function Home({navigation}) {
  const [weather, setWeather]= useState(null)
  const [textInput, setTextInput]= useState('')
  const [listWeather, setListWeather]= useState([])

  const searchWeatherLocation =  async(city)=>{
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=abe21a18f799047cd1c3d452a52fc204&units=metric&lang=vi`)
    setWeather(res.data)
  }
  const searchListWeatherLocation =  async(city)=>{
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=abe21a18f799047cd1c3d452a52fc204&lang=vi&units=metric`)
    setListWeather(res.data)
  }
  useEffect(()=>{
    searchWeatherLocation('Hà Nội')
    searchListWeatherLocation('Hà Nội')
  },[])
  const handleSearch = ()=>{
    if(textInput !== ''){
      searchWeatherLocation(textInput)
      searchListWeatherLocation(textInput)
    }
  }
  if(weather === null || listWeather === null) return null
  return (
    <ImageBackground
    source={bg}
    style={styles.backgroundImage}
  >
        <View style={styles.container}>
            <View style={styles.main}>
              <View style={styles.header}>
                <TextInput style={styles.input} 
                  placeholder='Tìm kiếm thành phố ?'
                  onChangeText={setTextInput}
                  value={textInput}
                />
                <TouchableOpacity onPress={()=> {handleSearch()}}>
                  <FontAwesome5 style={styles.searchIcon} name="search-location" size={24} color="blue" />
                </TouchableOpacity>
              </View>
                <Text style={styles.homeTitle}>{weather.name}</Text>
                <Text style={styles.colorText}>{weather.weather[0].description}</Text>
                <Image style={styles.iconWeather}  source={{ uri:`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}}/>
                <Text style={styles.doC}>{weather.main.temp} °C</Text>
                <Text style={styles.colorText}>Mặt trời mọc: {moment.unix(weather.sys.sunrise).format('H:mm')} AM</Text>
                <Text style={styles.colorText}>Mặt trời lặn: {moment.unix(weather.sys.sunset).format('H:mm')} PM</Text>
                <Text style={styles.colorText}>Độ ẩm: {weather.main.humidity}%</Text>
                <Text style={styles.colorText}>Gió: {(weather.wind.speed *3.6).toFixed(2)} Km/h</Text>
                <View style={styles.navi}>
                  <TouchableOpacity onPress={()=> navigation.navigate('Future',{listWeather: listWeather})}>
                    <Text>Dự báo</Text>
                  </TouchableOpacity>
                </View>
            </View>
          <StatusBar style="auto" />
        </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 1,
    width: '100%',
    height: '100%'
  },
  navi: {
    width: 80,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#00ff00'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 100,
    width: 190,
    borderWidth: 0.5,
    marginBottom: 20,
  },
  main: {
    paddingTop: 150,
    width: 200,
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingLeft: 10,
    color: '#fff'
  },
  searchIcon: {
    padding: 10
  },
  iconWeather: {
    width: 200,
    height: 170,
    // backgroundColor: 'rgb(242, 242, 242)',
    borderRadius: 10,
    margin: 10
  },
  homeTitle: {
    color: 'blue',
    fontSize: 30,
    margin: 5
  },
  doC: {
    color: 'blue',
    fontSize: 30
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorText: {
    color: '#fff'
  }

});