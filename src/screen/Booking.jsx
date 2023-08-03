import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../assets/css/globalStyles';
import Headers from '../components/Headers';
import Alert from '../components/Alert';
import http from '../helpers/https';
import { useSelector } from 'react-redux';
import FAwesome from 'react-native-vector-icons/FontAwesome';

const Booking = ({ route }) => {
  const navigation = useNavigation();
  const bookingSeat = require('../assets/img/Booking.png');
  const { id } = route.params;
  const token = useSelector(state => state.auth.token);
  const [message, setMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [section, setSection] = React.useState([]);
  const [valueQuantity, setValueQuantity] = React.useState({
    id: 0,
    quantity: 0,
  });

  React.useEffect(() => {
    async function getSection() {
      try {
        const { data } = await http(token).get('/section');
        setSection(data.results);
      } catch (error) {
        const message = error?.response?.data?.message;
        if (message) {
          console.log(message);
        }
      }
    }
    getSection();
  }, [token]);

  function reduceQuantity(id) {
    const quantityMinus = valueQuantity.quantity - 1;
    if (quantityMinus < 0) {
      setMessage('min 1 tickets');
    } else {
      setValueQuantity({
        id,
        quantity: quantityMinus,
      });
      setMessage(' ');
    }
  }

  function addQuantity(id) {
    const quantityPlus = valueQuantity.quantity + 1;
    if (quantityPlus > 5) {
      setMessage('Max your buy is 5 Tickets');
    } else {
      setValueQuantity({
        id,
        quantity: quantityPlus,
      });
      setMessage(' ');
      setErrorMessage('');
    }
  }

  const selectSection = valueQuantity && section.filter(event => event.id === valueQuantity.id)[0];

  const actionBooking = async () => {
    setErrorMessage('');
    try {
      const body = new URLSearchParams({
        sectionId: valueQuantity.id,
        quantity: valueQuantity.quantity,
        eventId: id,
      }).toString();

      if (valueQuantity.quantity === 0) {
        setErrorMessage('you must buy min 1 tickets');
      } else {
        const { data } = await http(token).post('/reservation', body);
        if (data.results) {
          navigation.navigate('Payment', {
            dataBooking: {
              eventId: id,
              reservationId: data.results.reservationId,
              totalPayment: data.results.totalPayment,
            },
          });
        }
      }
    } catch (error) {
      const msg = error?.response?.data?.message;
      console.log(msg);
      setTimeout(() => {
        setErrorMessage(msg);
      }, 3000);
    }
  };
  return (
    <ScrollView style={globalStyles.containerTitleNav} horizontal={false}>
      <Headers>Booking</Headers>

      <View style={globalStyles.container}>
        <View style={style.contPrice}>
          <View style={style.sectCont}>
            <Image source={bookingSeat} />
          </View>
          <View style={style.contOut}>
            <View style={style.contOne}>
              <View>
                <Text style={style.textTic}>Tickets</Text>
              </View>
              <View>
                <Text style={style.textTic2}>BY PRICE</Text>
              </View>
            </View>
            {section.map(items => {
              return (
                <View key={`section${items.id}`} style={style.contItem}>
                  <View style={style.contIcon}>
                    <View style={style.contSect}>
                      <View>
                        <Text style={style.textSect}>Sect {items.name}, ROW 2</Text>
                        <Text style={style.contSeat}>12 Seats available</Text>
                      </View>
                      <Text style={style.contQuty}>Quantity</Text>
                    </View>
                  </View>
                  <View style={style.contPriceOut}>
                    <View style={style.priceOut}>
                      <Text style={style.textSect}>{items.price}</Text>
                      <Text style={globalStyles.textColor}>/person</Text>
                    </View>
                    <View style={style.count}>
                      <TouchableOpacity onPress={() => reduceQuantity(items.id)} style={style.countMin}>
                        <Text style={globalStyles.textColor}>-</Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: '#9ca3af',
                          fontSize: 16,
                          fontWeight: '600',
                        }}>
                        {items.id === valueQuantity.id ? valueQuantity.quantity : 0}
                      </Text>
                      <TouchableOpacity style={style.countMin}>
                        <Text onPress={() => addQuantity(items.id)} style={globalStyles.textColor}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {message === 'min 1 tickets' && (
                      <Text
                        style={{
                          color: 'red',
                          textAlign: 'right',
                        }}>
                        {message}
                      </Text>
                    )}
                    {message === 'Max Your Buy is 5 Tickets' && (
                      <Text
                        style={{
                          color: 'red',
                          textAlign: 'right',
                        }}>
                        {message}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
            {errorMessage && <Alert>{errorMessage}</Alert>}
          </View>
        </View>
        <View style={style.checkOut}>
          <View style={{ padding: 5 }}>
            <Text style={style.results}>
              {selectSection?.name || '-'} . <FAwesome name="ticket" size={15} style={{ color: '#9ca3af' }} /> ={' '}
              {valueQuantity.quantity}
            </Text>
            <View style={style.getOwnCont}>
              <Text style={style.getOwn}>
                Total Price = Rp,-{selectSection?.price * valueQuantity?.quantity || '0'}
              </Text>
            </View>
          </View>
          <View style={{ padding: 5 }}>
            <TouchableOpacity onPress={actionBooking} style={style.touchCheckOut}>
              <Text style={style.textCheckout}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#3366FF',
  },
  containerOne: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contPrice: {
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    paddingTop: 30,
    paddingHorizontal: 0,
  },
  chechText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  sectCont: {
    width: '100%',
    height: 210,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    borderRadius: 30,
  },
  contOut: {
    padding: 20,
    gap: 10,
    width: '100%',
    backgroundColor: 'white',
  },
  contOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingRight: 20,
    paddingVertical: 20,
  },
  textTic: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  textTic2: {
    color: 'red',
    fontWeight: 'semibold',
  },
  contItem: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    paddingHorizontal: 1,
    backgroundColor: '#F1EAFF',
  },
  contIcon: {
    width: 250,
    height: 45,
    borderRadius: 10,
    flex: 1,
  },
  contIcon2: {
    width: 45,
    height: 45,
    backgroundColor: '#FFEAEF',
    borderRadius: 10,
  },
  textSect: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  contSect: {
    gap: 10,
  },
  contSeat: {
    opacity: 0.7,
    color: 'black',
  },
  contQuty: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  contPriceOut: {
    gap: 10,
  },
  priceOut: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  count: {
    flexDirection: 'row',
    gap: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countMin: {
    width: 33,
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkOut: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'between',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 7,
    marginBottom: 50,
    paddingHorizontal: 20,
    width: 'full',
    gap: 80,
  },
  results: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  reslutsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  touchCheckOut: {
    backgroundColor: '#0E8388',
    width: 120,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCheckout: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  getOwn: {
    fontSize: 12,
    color: 'black',
  },
  getOwnCont: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
});
export default Booking;
