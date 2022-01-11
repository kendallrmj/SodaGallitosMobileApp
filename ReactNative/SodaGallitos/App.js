import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity, View } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import OrderFormScreen from "./screens/OrderFormScreen";
import LoginScreen from "./screens/LoginScreen";
import StartScreen from "./screens/StartScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Ordenes",
            headerStyle: {
              backgroundColor: "#222f3e",
            },
            headerTitleStyle: {
              color: "#ffffff",
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("OrderFormScreen")}
              >
                <Text style={{ color: "#fff", marginRight: 20, fontSize: 15 }}>
                  Nueva Orden
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="OrderFormScreen"
          component={OrderFormScreen}
          options={{
            title: 'Crear Orden',
            headerStyle: {
              backgroundColor: "#222f3e",
            },
            headerTintColor: "#fff",

            headerTitleStyle: {
              color: "#ffffff",
            },
          }}
        />
        <Stack.Screen name="StartScreen" 
          component={StartScreen}           
          options={{
            title: 'Inicio',
            headerStyle: {
              backgroundColor: "#222f3e",
            },
            headerTintColor: "#fff",

            headerTitleStyle: {
              color: "#ffffff",
            },
          }}/>
        <Stack.Screen name="LoginScreen" 
        component={LoginScreen}
        options={{
          title: 'Iniciar sesion',
          headerStyle: {
            backgroundColor: "#222f3e",
          },
          headerTintColor: "#fff",

          headerTitleStyle: {
            color: "#ffffff",
          },
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
