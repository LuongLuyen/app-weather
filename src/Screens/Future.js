import { View, Text } from "react-native";

function Future({ route }) {
    const listWeather = route.params?.listWeather || 'No data !'
    console.log(listWeather)
    return ( 
        <View>
            <Text>ok</Text>
        </View>
     );
}

export default Future;