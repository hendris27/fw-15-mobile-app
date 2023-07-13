import React from 'react';
import { View, Text, Image } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import ReloadScreen from './ReloadScreen';
import { useDispatch, useSelector } from 'react-redux';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { logout } from '../redux/reducers/auth';
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
import ManageEvent from './ManageEvent';
import CreateEvent from './CreateEvent';
import Booking from './Booking';
import MyWishlist from './MyWishlist';
import EditProfile from './EditProfile';
import Payment from './Payment';
import ChangePassword from './ChangePassword';
import Settings from './Settings';
import globalStyles from '../assets/css/globalStyles';
import http from '../helpers/https';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const defaultimg = require('../assets/img/default-profile.jpg');
  const token = useSelector(state => state.auth.token);
  const [profile, setProfile] = React.useState({});

  useFocusEffect(
    React.useCallback(() => {
      const fetchDataProfile = async () => {
        try {
          const { data } = await http(token).get('/profile');
          console.log(data.results);
          setProfile(data.results);
        } catch (error) {
          const message = error?.response?.data?.message;
          if (message) {
            console.log(message);
          }
        }
      };
      fetchDataProfile();
    }, [token]),
  );

  React.useEffect(() => {
    const getProfile = async () => {
      const { data } = await http(token).get('/profile');
      console.log(data);
      setProfile(data.results);
    };
    getProfile();
  }, [token]);
  return (
    <DrawerContentScrollView {...props}>
      <View style={globalStyles.containerProfileDrawwer}>
        <View style={globalStyles.fotoDrawwer}>
          <View style={globalStyles.fotoIcon}>
            {profile?.picture === null && <Image style={globalStyles.img} source={defaultimg} />}
            {profile?.picture !== null && (
              <Image
                style={globalStyles.img}
                source={{
                  uri: profile.picture,
                }}
              />
            )}
          </View>
        </View>
        <View>
          <Text style={globalStyles.textFullname}>
            {profile?.fullName?.length < 12 && profile?.fullName}
            {profile?.fullName?.length >= 12 && profile?.fullName?.slice(0, 12) + ' ...'}
          </Text>
          <Text style={globalStyles.textProfession}>{profile.profession ? profile.profession : 'profession: -'}</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelColor="red"
        onPress={() => dispatch(logout())}
        icon={({ focused, color, size }) => <FeatherIcon name="log-out" color="red" size={size} />}
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
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({ color, size }) => <FontAwesome5Icon name="home" color={color} size={size} />,
          drawerLabel: 'Dashboard',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => <FeatherIcon name="user" color={color} size={size} />,

          drawerLabel: 'Profile',
        }}
      />
      <Drawer.Screen
        name="ManageEvent"
        component={ManageEvent}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="event-available" color={color} size={size} />,

          drawerLabel: 'Manage Event',
        }}
      />
      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          drawerIcon: ({ color, size }) => <FeatherIcon name="user" color={color} size={size} />,
          drawerItemStyle: {
            display: 'none',
          },
          drawerLabel: 'EditProfile',
        }}
      />
      <Drawer.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{
          drawerIcon: ({ color, size }) => <FeatherIcon name="user" color={color} size={size} />,
          drawerItemStyle: {
            display: 'none',
          },
          drawerLabel: 'Create Event',
        }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          drawerIcon: ({ color, size }) => <FeatherIcon name="user" color={color} size={size} />,
          drawerItemStyle: {
            display: 'none',
          },
          drawerLabel: 'Change Password',
        }}
      />
      <Drawer.Screen
        name="Payment"
        component={Payment}
        options={{
          drawerIcon: ({ color, size }) => <FeatherIcon name="user" color={color} size={size} />,
          drawerItemStyle: {
            display: 'none',
          },
          drawerLabel: 'payment',
        }}
      />
      <Drawer.Screen
        name="DetailEvent"
        component={DetailEvent}
        options={{
          drawerIcon: ({ color, size }) => <FeatherIcon name="list" color={color} size={size} />,
          drawerItemStyle: {
            display: 'none',
          },
          drawerLabel: 'Detail Event',
        }}
      />
      <Drawer.Screen
        name="Booking"
        component={Booking}
        options={{
          drawerIcon: ({ color, size }) => <FeatherIcon name="list" color={color} size={size} />,
          drawerItemStyle: {
            display: 'none',
          },
          drawerLabel: 'Booking',
        }}
      />
      <Drawer.Screen
        name="MyBooking"
        component={MyBooking}
        options={{
          drawerIcon: ({ color, size }) => <FeatherIcon name="list" color={color} size={size} />,
          drawerLabel: 'My Booking',
        }}
      />
      <Drawer.Screen
        name="MyWishlist"
        component={MyWishlist}
        options={{
          drawerIcon: ({ color, size }) => <FeatherIcon name="heart" color={color} size={size} />,
          drawerLabel: 'My Wishlist',
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={Settings}
        options={{
          drawerIcon: ({ color, size }) => <FeatherIcon name="settings" color={color} size={size} />,
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
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
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
