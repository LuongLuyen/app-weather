import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Future from './src/Screens/Future'
import Home from './src/Screens/Home'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'rgb(48, 47, 47)' },
          headerTintColor: 'blue',
        }}
      >
        <Stack.Screen 
          name="Home" 
          options={{title: 'Home'}} 
          component={Home}
        />
        <Stack.Screen 
          name="Future" 
          options={{title: 'Dự báo trong vài ngày tới'}}
          component={Future}
        />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

