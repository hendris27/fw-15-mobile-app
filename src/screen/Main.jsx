import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ReloadScreen from './ReloadScreen';
import {useDispatch, useSelector} from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {logout} from '../redux/reducers/auth';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import DetailEvent from './DetailEvent';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Profile from './Profile';
import MyBooking from './MyBooking';
import MyWishlist from './MyWishlist';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import Settings from './Settings';

const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelColor="red"
        onPress={() => dispatch(logout())}
        icon={({focused, color, size}) => (
          <FeatherIcon name="log-out" color="red" size={size} />
        )}
      />
    </DrawerContentScrollView>
  );
}

function DrawerComponent() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#eaeaea',
          width: 240,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="ReloadScreen"
        component={ReloadScreen}
        options={{drawerLabel: () => null}}
      />
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({color, size}) => (
            <FontAwesome5Icon name="home" color={color} size={size} />
          ),
          drawerLabel: 'Dashboard',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color, size}) => (
            <FeatherIcon name="user" color={color} size={size} />
          ),

          drawerLabel: 'Profile',
        }}
      />
      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          drawerIcon: ({color, size}) => (
            <FeatherIcon name="user" color={color} size={size} />
          ),
          drawerItemStyle: {
            display: 'none',
          },
          drawerLabel: 'EditProfile',
        }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          drawerIcon: ({color, size}) => (
            <FeatherIcon name="user" color={color} size={size} />
          ),
          drawerItemStyle: {
            display: 'none',
          },
          drawerLabel: 'Change Password',
        }}
      />
      <Drawer.Screen
        name="DetailEvent"
        component={DetailEvent}
        options={{
          drawerIcon: ({color, size}) => (
            <FeatherIcon name="list" color={color} size={size} />
          ),
          drawerLabel: 'Detail Event',
        }}
      />
      <Drawer.Screen
        name="MyBooking"
        component={MyBooking}
        options={{
          drawerIcon: ({color, size}) => (
            <FeatherIcon name="list" color={color} size={size} />
          ),
          drawerLabel: 'My Booking',
        }}
      />
      <Drawer.Screen
        name="MyWishlist"
        component={MyWishlist}
        options={{
          drawerIcon: ({color, size}) => (
            <FeatherIcon name="heart" color={color} size={size} />
          ),
          drawerLabel: 'My Wishlist',
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={Settings}
        options={{
          drawerIcon: ({color, size}) => (
            <FeatherIcon name="settings" color={color} size={size} />
          ),
          drawerLabel: 'Settings',
        }}
      />
    </Drawer.Navigator>
  );
}

const Main = () => {
  const token = useSelector(state => state.auth.token);
  return (
    <NavigationContainer>
      {!token && (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
          <AuthStack.Screen name="ReloadScreen" component={ReloadScreen} />
          <AuthStack.Screen name="Register" component={Register} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
          <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
        </AuthStack.Navigator>
      )}

      {token && (
        <>
          <DrawerComponent />
        </>
      )}
    </NavigationContainer>
  );
};

export default Main;
