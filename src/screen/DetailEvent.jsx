import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../assets/css/globalStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const DetailsEvents = () => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <View style={globalStyles.boxEventDetail}>
        <Image
          source={require('../assets/img/event.png')}
          style={globalStyles.img}
        />
        <View style={globalStyles.navContainerEventDetail}>
          <View>
            <FeatherIcon name="arrow-left" size={30} color="white" />
          </View>
          <View>
            <TouchableOpacity>
              <FeatherIcon name="heart" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={globalStyles.wrapperTitleText}>
          <Text style={globalStyles.textTitleMain}>
            Sights & Sounds Exhibition
          </Text>
          <View style={globalStyles.wrapperTitleDetail}>
            <View>
              <IoniconsIcon name="location" size={20} color="white" />
            </View>
            <View>
              <Text style={globalStyles.textTitleDetail}>
                Jakarta, Indonesia
              </Text>
            </View>
          </View>
          <View style={globalStyles.wrapperTitleDetail}>
            <View>
              <FeatherIcon name="clock" size={20} color="white" />
            </View>
            <View>
              <Text style={globalStyles.textTitleDetail}>
                Wed, 15 Nov, 4:00 PM
              </Text>
            </View>
          </View>
          <Text style={globalStyles.textTitleDetail}>Attendees</Text>

          <View style={globalStyles.btnArrowRight}>
            <View />
          </View>
        </View>
      </View>
      <View style={style.contDetail}>
        <View style={style.contTextDetail}>
          <Text style={style.textDetails}>Event Detail</Text>
          <Text style={style.textDetailEvents}>
            After his controversial art exhibition "Tear and Consume" back in
            November 2018, in which guests were invited to tear up…
          </Text>
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
              <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
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
    shadowOffset: {width: 0, height: 3},
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
