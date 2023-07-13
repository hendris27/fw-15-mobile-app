import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import globalStyles from '../assets/css/globalStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import http from '../helpers/https';
import { useSelector } from 'react-redux';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

const DetailsEvents = ({ route, ...rest }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const [events, setEvents] = React.useState([]);
  const token = useSelector(state => state.auth.token);
  const [wishlistButton, setWishlistButton] = React.useState(false);
  const [wishlist, setWishlist] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function getEventDetails() {
        const { data } = await http().get(`/event/${id}`);
        setEvents(data.results);
      }

      getEventDetails();
    }),
  );
  useFocusEffect(
    React.useCallback(() => {
      const eventId = { eventId: id };
      const qString = new URLSearchParams(eventId).toString();
      const fetchData = async () => {
        const { data } = await http(token).get(`/wishlist/check?${qString}`);
        const btnStatus = data.results;
        if (btnStatus) {
          setWishlistButton(true);
        } else {
          setWishlistButton(false);
        }
      };
      fetchData();
    }, [token, id]),
  );
  async function addWishlists() {
    try {
      const eventId = { eventId: id };
      const eventDetailId = new URLSearchParams(eventId).toString();
      const { data } = await http(token).post('/wishlist', eventDetailId);
      console.log(data);
      if (wishlistButton) {
        setWishlistButton(false);
      } else {
        setWishlistButton(true);
      }
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) {
        console.log(message);
      }
    }
  }

  // const doDelete = async itemId => {
  //   try {
  //     await http (token).delete(`/wishlist/managedeleted/${itemId}`);
  //     setWishlist(wishlist.filter(items => items.id !== itemId));
  //   } catch (err) {
  //     const message = err?.response?.data?.message;

  //     if (message) {
  //       console.warn(message);
  //     }
  //   }
  // };

  async function actionBooking() {
    const eventId = id;
    const statusId = 1;
    const paymentMethodId = 1;
    const body = new URLSearchParams({
      eventId,
      statusId,
      paymentMethodId,
    }).toString();
    const { data } = await http(token).post('/reservation', body);
    if (data.success === true) {
      navigation.navigate('Booking', {
        reservationId: data.results.reservation.id,
        eventTitle: data.results.tittle,
      });
    }
  }
  return (
    <View style={style.container}>
      <View style={globalStyles.boxEventDetail}>
        <Image style={globalStyles.img} source={{ uri: events.picture }} />
        <View style={globalStyles.navContainerEventDetail}>
          <View>
            <FeatherIcon name="arrow-left" size={30} color="white" />
          </View>
          <View>
            <TouchableOpacity onPress={addWishlists}>
              {wishlistButton === true ? (
                <AntDesignIcon name="hearto" size={30} color="white" />
              ) : (
                <AntDesignIcon name="heart" size={30} color="red" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <LinearGradient colors={['#61616122', '#78787899', '#3c3c3c']} {...rest} style={globalStyles.wrapperTitleText}>
          <Text style={globalStyles.textTitleMain}>{events?.tittle}</Text>
          <View style={globalStyles.wrapperTitleDetail}>
            <View>
              <IoniconsIcon name="location" size={20} color="white" />
            </View>
            <View>
              <Text style={globalStyles.textTitleDetail}>{events?.location}</Text>
            </View>
          </View>
          <View style={globalStyles.wrapperTitleDetail}>
            <View>
              <FeatherIcon name="clock" size={20} color="white" />
            </View>
            <View>
              <Text style={globalStyles.textTitleDetail}>{moment(events?.date).format('LLL')}</Text>
            </View>
          </View>
          <Text style={globalStyles.textTitleDetail}>Attendees</Text>

          <View style={globalStyles.btnArrowRight}>
            <View />
          </View>
        </LinearGradient>
      </View>
      <View style={style.contDetail}>
        <View style={style.contTextDetail}>
          <Text style={style.textDetails}>Event Detail</Text>
          <Text style={style.textDetailEvents}>{events.descriptions}</Text>
        </View>
        <View style={style.contOut}>
          <View style={style.contOutBtn}>
            <View style={style.boxOut}>
              <View style={style.boxTic}>
                <Text style={style.textOut}>Ticket</Text>
                <Text style={style.textItem}>VIP</Text>
              </View>
              <View style={style.boxQty}>
                <Text style={style.textOut}>Quantity</Text>
                <Text style={style.textItem}>2</Text>
              </View>
              <View style={style.boxPrc}>
                <Text style={style.textOut}>Price</Text>
                <Text style={style.textItem}>$70</Text>
              </View>
            </View>
            <View style={style.touchButton}>
              <TouchableOpacity onPress={actionBooking}>
                <Text style={style.textTouch}>Buy Tickets</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
  },
  containerImg: {
    gap: 15,
    justifyContent: 'center',
    width: '90%',
    height: 243,
    paddingHorizontal: 30,
    marginTop: 30,
  },
  textContTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: 'white',
  },
  textContLoc: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'semibold',
  },
  contDetail: {
    backgroundColor: '#0E8388',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -25,
  },
  contTextDetail: {
    padding: 25,
    gap: 15,
  },
  textEvents: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  textDetailEvents: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  contOut: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 30,
    marginBottom: 50,
  },
  boxOut: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  boxTic: {
    backgroundColor: '#884DFF',
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxQty: {
    backgroundColor: '#FF3D71',
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxPrc: {
    backgroundColor: '#FF8900',
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchButton: {
    backgroundColor: '#0E8388',
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  textTouch: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contOutBtn: {
    gap: 30,
  },
  textOut: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  textItem: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DetailsEvents;
