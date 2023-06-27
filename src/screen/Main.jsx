import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Register from './Register';
import Index from './Index';
import ForgotPassword from './ForgotPassword';

const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      </AuthStack.Navigator>

      {/* <Stack.Navigator>
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default Main;
