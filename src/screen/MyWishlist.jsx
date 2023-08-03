import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import globalStyles from '../assets/css/globalStyles';
import http from '../helpers/https';
import FeatherIcon from 'react-native-vector-icons/Feather';

const MyWishlists = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);
  const token = useSelector(state => state.auth.token);

  useFocusEffect(
    React.useCallback(() => {
      async function getWishlists() {
        try {
          const { data } = await http(token).get('/wishlist');
          setWishlist(data.results);
        } catch (err) {
          console.warn(err);
        }
      }

      getWishlists();
    }, []),
  );

  const doDelete = async itemId => {
    try {
      await http(token).delete(`/wishlist/managedeleted/${itemId}`);
      setWishlist(wishlist.filter(items => items.id !== itemId));
    } catch (err) {
      const message = err?.response?.data?.message;

      if (message) {
        console.warn(message);
      }
    }
  };

  return (
    <View style={globalStyles.containerTitleNav}>
      <View style={globalStyles.navContainerChild}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <FeatherIcon name="arrow-left" size={25} color="#FFF" />
        </TouchableOpacity>
        <View>
          <Text style={globalStyles.textTitleWhite}>My Wishlist</Text>
        </View>
        <View>
          <Text />
        </View>
      </View>
      <ScrollView style={{ backgroundColor: 'white' }}>
        {wishlist.map(items => {
          return (
            <View style={styles.ManageWrapperStyle} key={items.id}>
              <View style={styles.ManageWrapperChildStyle}>
                <View style={styles.DateWrapper}>
                  <Text style={styles.TextDate}>{moment(items.date).format('DD')}</Text>
                  <Text style={globalStyles.textColor}>{moment(items.date).format('ddd')}</Text>
                </View>
                <TouchableOpacity style={styles.HeartWrapper} onPress={() => doDelete(items.id)}>
                  <FeatherIcon name="trash-2" size={25} color="red" />
                </TouchableOpacity>
              </View>
              <View style={styles.TitleWrapper}>
                <View>
                  <Text style={styles.TitleStyles}>{items.tittle}</Text>
                </View>
                <View>
                  <View>
                    <Text style={globalStyles.textColor}>{items.location}</Text>
                  </View>
                  <View>
                    <Text style={globalStyles.textColor}>{moment(items.date).format('LLL')}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        {wishlist.length <= 0 && (
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 20,
                textAlign: 'center',
                marginTop: 20,
                color: 'red',
              }}>
              Data Wishlist Empty!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  ManageWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    paddingTop: 20,
    paddingBottom: 10,
    paddingRight: 40,
    paddingLeft: 40,
    backgroundColor: 'white',
  },
  ManageWrapperChildStyle: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  DateWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  TextDate: {
    fontFamily: 'Poppins-Bold',
    color: 'orange',
    fontSize: 18,
  },
  FontStyle: {
    fontFamily: 'Poppins-Regular',
  },
  HeartWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  TitleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  TitleStyles: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
});

export default MyWishlists;
