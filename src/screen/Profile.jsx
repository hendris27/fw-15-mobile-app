import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import globalStyles from '../assets/css/globalStyles';
import Headers from '../components/Headers';
import {useSelector} from 'react-redux';
import http from '../helpers/https';

const Profile = () => {
  const defaultimg = require('../assets/img/default-profile.jpg');
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    const getProfile = async () => {
      const {data} = await http(token).get('/profile');
      console.log(data);
      setProfile(data.results);
    };
    getProfile();
  }, [token]);
  return (
    <ScrollView style={globalStyles.containerTitleNav}>
      <Headers>Profil</Headers>
      <View style={globalStyles.wrapperContent}>
        <View style={globalStyles.wrapperProfileName}>
          <View style={globalStyles.foto}>
            <View style={globalStyles.fotoProfil}>
              {!profile.picture && (
                <Image style={globalStyles.img} source={defaultimg} />
              )}
              {profile.picture && (
                <Image
                  style={globalStyles.img}
                  source={{
                    uri: profile.picture,
                  }}
                />
              )}
            </View>
          </View>
          <View style={globalStyles.wrapperProfileName}>
            <Text style={globalStyles.name}>{profile?.fullName}</Text>
            <Text style={globalStyles.Profession}>{profile?.profession} </Text>
          </View>
        </View>
        <View style={globalStyles.cardContent}>
          <View style={globalStyles.cardNav}>
            <Text style={globalStyles.cardText}>Card</Text>
            <View>
              <TouchableOpacity style={globalStyles.buttonAddCard}>
                <Text style={globalStyles.textColor}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView horizontal={true}>
            <View style={globalStyles.cardMember}>
              <View style={globalStyles.cardMemberDetail}>
                <Image
                  source={require('../assets/img/card.png')}
                  style={globalStyles.img}
                />
              </View>
              <View style={globalStyles.cardMemberDetail}>
                <Image
                  source={require('../assets/img/card.png')}
                  style={globalStyles.img}
                />
              </View>
            </View>
          </ScrollView>
          <View style={globalStyles.containerProfile}>
            <View style={globalStyles.navEditProfile}>
              <View style={globalStyles.wrapperTextTitleNav}>
                <View>
                  <FeatherIcon name="edit-3" size={25} color="black" />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditProfile')}>
                  <Text style={globalStyles.textTitleNav}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <FeatherIcon name="arrow-right" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <View style={globalStyles.changePassword}>
              <View style={globalStyles.wrapperTextTitleNav}>
                <View>
                  <FeatherIcon name="unlock" size={25} color="black" />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ChangePassword')}>
                  <Text style={globalStyles.textTitleNav}>Change Password</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <FeatherIcon name="arrow-right" size={25} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
