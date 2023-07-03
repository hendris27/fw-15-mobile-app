import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import globalStyles from '../assets/css/globalStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import http from '../helpers/https';
import moment from 'moment';

const Index = () => {
  const [events, setEvents] = React.useState([]);
  const defaultimg = require('../assets/img/default-profile.jpg');
  async function getDataEvent() {
    try {
      const {data} = await http().get('/event?limit=10');
      setEvents(data.results);
    } catch (error) {
      const message = error?.response?.data?.message;
      if (message) {
        console.log(message);
      }
    }
  }
  getDataEvent();
  const navigation = useNavigation();
  return (
    <View style={globalStyles.wrapperDasboard}>
      <View>
        <View style={globalStyles.navContainer}>
          <View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <FeatherIcon name="menu" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <FeatherIcon name="message-square" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={globalStyles.inputDashboard}>
        <TextInput
          style={globalStyles.inputComponentsDashboard}
          placeholder="Search event..."
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
      </View>
      <ScrollView style={globalStyles.container} horizontal={false}>
        <View style={globalStyles.eventContainer}>
          <Text style={globalStyles.textTitleEvent}>Events For You</Text>
          <FeatherIcon name="sliders" size={30} color="black" />
        </View>
        <ScrollView horizontal={true} style={globalStyles.wrapperBox}>
          {events.map(event => {
            return (
              <TouchableOpacity
                key={`events-detail${event.id}`}
                onPress={() => navigation.navigate('DetailEvent')}
                style={globalStyles.boxEvent}>
                {!event.picture && (
                  <Image
                    style={globalStyles.img}
                    source={
                      event.picture(defaultimg)
                        ? event.picture
                        : `${import.meta.env.BACKEND_URL}/uploads/${
                            event.picture
                          }`
                    }
                  />
                )}
                {event.picture && (
                  <Image
                    style={globalStyles.img}
                    source={{
                      uri: event.picture,
                    }}
                  />
                )}

                <View style={globalStyles.wrapperTitleTextHome}>
                  <Text style={globalStyles.textTitleDetail}>
                    {moment(event.date).format('LLLL')}
                  </Text>
                  <Text style={globalStyles.textTitleMain}>
                    {event?.tittle}
                  </Text>
                  <TouchableOpacity
                    style={globalStyles.btnArrowRight}
                    onPress={() => navigation.navigate('Events')}>
                    <View>
                      <FeatherIcon name="arrow-right" size={30} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailEvent')}
            style={globalStyles.boxEvent}>
            <Image
              source={require('../assets/img/event2.jpg')}
              style={globalStyles.img}
            />

            <View style={globalStyles.wrapperTitleTextHome}>
              <Text style={globalStyles.textTitleDetail}>
                Wed, 10 Nov, 4:00 PM
              </Text>
              <Text style={globalStyles.textTitleMain}>
                Sights & Sounds Exhibition
              </Text>
              <TouchableOpacity
                style={globalStyles.btnArrowRight}
                onPress={() => navigation.navigate('Events')}>
                <View>
                  <FeatherIcon name="arrow-right" size={30} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailEvent')}
            style={globalStyles.boxEvent}>
            <Image
              source={require('../assets/img/event3.jpg')}
              style={globalStyles.img}
            />

            <View style={globalStyles.wrapperTitleTextHome}>
              <Text style={globalStyles.textTitleDetail}>
                Wed, 10 Nov, 4:00 PM
              </Text>
              <Text style={globalStyles.textTitleMain}>
                Sights & Sounds Exhibition
              </Text>
              <TouchableOpacity
                style={globalStyles.btnArrowRight}
                onPress={() => navigation.navigate('Events')}>
                <View>
                  <FeatherIcon name="arrow-right" size={30} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailEvent')}
            style={globalStyles.boxEvent}>
            <Image
              source={require('../assets/img/event2.jpg')}
              style={globalStyles.img}
            />

            <View style={globalStyles.wrapperTitleTextHome}>
              <Text style={globalStyles.textTitleDetail}>
                Wed, 10 Nov, 4:00 PM
              </Text>
              <Text style={globalStyles.textTitleMain}>
                Sights & Sounds Exhibition
              </Text>
              <TouchableOpacity
                style={globalStyles.btnArrowRight}
                onPress={() => navigation.navigate('Events')}>
                <View>
                  <FeatherIcon name="arrow-right" size={30} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <View>
          <Text style={globalStyles.textTitleDiscover}>Discover</Text>
        </View>
        <ScrollView style={globalStyles.wrapperBox} horizontal={true}>
          <View style={globalStyles.wrapperBoxNew}>
            <TouchableOpacity
              style={globalStyles.wrapperBoxDiscover}
              onPress={() => navigation.navigate('MyBooking')}>
              <View style={globalStyles.iconDiscover}>
                <EntypoIcon name="location-pin" size={30} color="black" />
              </View>
              <Text style={globalStyles.textDiscover}>Location</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyWishlist')}
            style={globalStyles.wrapperBoxNew}>
            <View style={globalStyles.wrapperBoxDiscover}>
              <View style={globalStyles.iconDiscover}>
                <FeatherIcon name="music" size={30} color="black" />
              </View>
              <Text style={globalStyles.textDiscover}>Music</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ManageEvent')}
            style={globalStyles.wrapperBoxNew}>
            <View style={globalStyles.wrapperBoxDiscover}>
              <View style={globalStyles.iconDiscover}>
                <FeatherIcon name="sliders" size={30} color="black" />
              </View>
              <Text style={globalStyles.textDiscover}>Technologi</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <View style={globalStyles.containerUpcoming}>
          <Text style={globalStyles.containerTextUpcoming}>Upcoming</Text>
          <Text style={globalStyles.textColor}>See all</Text>
        </View>
        <View style={globalStyles.monthTextCont}>
          <Text style={globalStyles.monthText}>SEP</Text>
        </View>
        <View style={globalStyles.eventUpcoming}>
          <View style={globalStyles.upcomingTextCont}>
            <View style={globalStyles.textContDay}>
              <Text style={globalStyles.textDay}>16</Text>
              <Text style={globalStyles.textDay}>Thu</Text>
            </View>
          </View>
          <View style={globalStyles.contentUpcoming}>
            <ScrollView horizontal={true} style={globalStyles.wrapperBox}>
              <TouchableOpacity
                onPress={() => navigation.navigate('DetailEvent')}
                style={globalStyles.boxEvent}>
                <Image
                  source={require('../assets/img/event.png')}
                  style={globalStyles.img}
                />

                <View style={globalStyles.wrapperTitleTextHome}>
                  <Text style={globalStyles.textTitleDetail}>
                    Wed, 10 Nov, 4:00 PM
                  </Text>
                  <Text style={globalStyles.textTitleMain}>
                    Sights & Sounds Exhibition
                  </Text>
                  <TouchableOpacity
                    style={globalStyles.btnArrowRight}
                    onPress={() => navigation.navigate('Events')}>
                    <View>
                      <FeatherIcon name="arrow-right" size={30} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('DetailEvent')}
                style={globalStyles.boxEvent}>
                <Image
                  source={require('../assets/img/event2.jpg')}
                  style={globalStyles.img}
                />

                <View style={globalStyles.wrapperTitleTextHome}>
                  <Text style={globalStyles.textTitleDetail}>
                    Wed, 10 Nov, 4:00 PM
                  </Text>
                  <Text style={globalStyles.textTitleMain}>
                    Sights & Sounds Exhibition
                  </Text>
                  <TouchableOpacity
                    style={globalStyles.btnArrowRight}
                    onPress={() => navigation.navigate('Events')}>
                    <View>
                      <FeatherIcon name="arrow-right" size={30} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('DetailEvent')}
                style={globalStyles.boxEvent}>
                <Image
                  source={require('../assets/img/event3.jpg')}
                  style={globalStyles.img}
                />

                <View style={globalStyles.wrapperTitleTextHome}>
                  <Text style={globalStyles.textTitleDetail}>
                    Wed, 10 Nov, 4:00 PM
                  </Text>
                  <Text style={globalStyles.textTitleMain}>
                    Sights & Sounds Exhibition
                  </Text>
                  <TouchableOpacity
                    style={globalStyles.btnArrowRight}
                    onPress={() => navigation.navigate('Events')}>
                    <View>
                      <FeatherIcon name="arrow-right" size={30} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('DetailEvent')}
                style={globalStyles.boxEvent}>
                <Image
                  source={require('../assets/img/event2.jpg')}
                  style={globalStyles.img}
                />

                <View style={globalStyles.wrapperTitleTextHome}>
                  <Text style={globalStyles.textTitleDetail}>
                    Wed, 10 Nov, 4:00 PM
                  </Text>
                  <Text style={globalStyles.textTitleMain}>
                    Sights & Sounds Exhibition
                  </Text>
                  <TouchableOpacity
                    style={globalStyles.btnArrowRight}
                    onPress={() => navigation.navigate('Events')}>
                    <View>
                      <FeatherIcon name="arrow-right" size={30} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={globalStyles.buttonUpcoming}>
              <Text style={globalStyles.textButton}>Show All 5 Events</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={globalStyles.eventUpcoming}>
          <View style={globalStyles.upcomingTextCont}>
            <View style={globalStyles.textContDay}>
              <Text style={globalStyles.textDay}>16</Text>
              <Text style={globalStyles.textDay}>Thu</Text>
            </View>
          </View>
          <ScrollView horizontal={true} style={globalStyles.wrapperBox}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailEvent')}
              style={globalStyles.boxEvent}>
              <Image
                source={require('../assets/img/event.png')}
                style={globalStyles.img}
              />

              <View style={globalStyles.wrapperTitleTextHome}>
                <Text style={globalStyles.textTitleDetail}>
                  Wed, 10 Nov, 4:00 PM
                </Text>
                <Text style={globalStyles.textTitleMain}>
                  Sights & Sounds Exhibition
                </Text>
                <TouchableOpacity
                  style={globalStyles.btnArrowRight}
                  onPress={() => navigation.navigate('Events')}>
                  <View>
                    <FeatherIcon name="arrow-right" size={30} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailEvent')}
              style={globalStyles.boxEvent}>
              <Image
                source={require('../assets/img/event2.jpg')}
                style={globalStyles.img}
              />

              <View style={globalStyles.wrapperTitleTextHome}>
                <Text style={globalStyles.textTitleDetail}>
                  Wed, 10 Nov, 4:00 PM
                </Text>
                <Text style={globalStyles.textTitleMain}>
                  Sights & Sounds Exhibition
                </Text>
                <TouchableOpacity
                  style={globalStyles.btnArrowRight}
                  onPress={() => navigation.navigate('Events')}>
                  <View>
                    <FeatherIcon name="arrow-right" size={30} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailEvent')}
              style={globalStyles.boxEvent}>
              <Image
                source={require('../assets/img/event3.jpg')}
                style={globalStyles.img}
              />

              <View style={globalStyles.wrapperTitleTextHome}>
                <Text style={globalStyles.textTitleDetail}>
                  Wed, 10 Nov, 4:00 PM
                </Text>
                <Text style={globalStyles.textTitleMain}>
                  Sights & Sounds Exhibition
                </Text>
                <TouchableOpacity
                  style={globalStyles.btnArrowRight}
                  onPress={() => navigation.navigate('Events')}>
                  <View>
                    <FeatherIcon name="arrow-right" size={30} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailEvent')}
              style={globalStyles.boxEvent}>
              <Image
                source={require('../assets/img/event2.jpg')}
                style={globalStyles.img}
              />

              <View style={globalStyles.wrapperTitleTextHome}>
                <Text style={globalStyles.textTitleDetail}>
                  Wed, 10 Nov, 4:00 PM
                </Text>
                <Text style={globalStyles.textTitleMain}>
                  Sights & Sounds Exhibition
                </Text>
                <TouchableOpacity
                  style={globalStyles.btnArrowRight}
                  onPress={() => navigation.navigate('Events')}>
                  <View>
                    <FeatherIcon name="arrow-right" size={30} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
