import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View,Image,TouchableOpacity ,Button} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

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
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <TextInput style={styles.input} 
              placeholder='Tìm kiếm thành phố ?'
              onChangeText={setTextInput}
              value={textInput}
            />
            <TouchableOpacity onPress={()=> {handleSearch()}}>
              <FontAwesome5 style={styles.searchIcon} name="search-location" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
          <View style={styles.main}>
              <Text>{weather.name}</Text>
              <Text>{weather.weather[0].description}</Text>
            <Image style={styles.iconWeather}  source={{ uri:`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}}/>
              <Text>{weather.main.temp} °C</Text>
              <Text>Mặt trời mọc: {moment.unix(weather.sys.sunrise).format('H:mm')}</Text>
              <Text>Mặt trời lặn: {moment.unix(weather.sys.sunset).format('H:mm')}</Text>
              <Text>Độ ẩm: {weather.main.humidity}%</Text>
              <Text>Gió: {(weather.wind.speed *3.6).toFixed(2)}Km/h</Text>
          </View>
          <View style={styles.navi}>
            <TouchableOpacity onPress={()=> navigation.navigate('Future',{listWeather: listWeather})}>
              <Text>Dự báo</Text>
            </TouchableOpacity>
          </View>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
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
  },
  main: {
    width: 200,
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingLeft: 10,
  },
  searchIcon: {
    padding: 10
  },
  iconWeather: {
    width: 50,
    height: 50,
  },

});