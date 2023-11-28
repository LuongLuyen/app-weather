import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View,Image,TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [weather, setWeather]= useState(null)
  const [textInput, setTextInput]= useState('')

  const searchWeatherLocation =  async(city)=>{
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=abe21a18f799047cd1c3d452a52fc204&units=metric&lang=vi`)
    setWeather(res.data)
  }
  useEffect(()=>{
    searchWeatherLocation('Hà Nội')
  },[])
  const handleSearch = ()=>{
    if(textInput !== ''){
      searchWeatherLocation(textInput)
    }
  }
  if(weather === null) return null
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.input} 
          placeholder='Tìm kiếm thành phố ?'
          onChangeText={setTextInput}
          value={textInput}
        />
        <TouchableOpacity onPress={()=> {
            handleSearch()
          }
        }>
        <FontAwesome5 style={styles.searchIcon} name="search-location" size={24} color="black" />
      </TouchableOpacity>
      </View>
        <View>
          <Text>{weather.name}</Text>
        </View>
        <View>
          <Text>{weather.weather[0].description}</Text>
        </View>
        <Image style={styles.iconWeather}  source={{ uri:`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}}/>
        <View>
          <Text>{weather.main.temp} °C</Text>
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
    justifyContent: 'center'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 100,
    width: 190,
    borderWidth: 0.5,
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
