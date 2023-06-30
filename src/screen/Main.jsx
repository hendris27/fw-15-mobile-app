import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';
import Index from './Index';
import ForgotPassword from './ForgotPassword';
import {useSelector} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';

const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Main = () => {
  const token = useSelector(state => state.auth.token);
  return (
    <NavigationContainer>
      {!token && (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
          <AuthStack.Screen name="Register" component={Register} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
        </AuthStack.Navigator>
      )}

      {token && (
        <>
          <Drawer.Navigator>
            <Drawer.Screen name="Index" component={Index} />
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
          </Drawer.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default Main;
