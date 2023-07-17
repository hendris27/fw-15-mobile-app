import { View, Image, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { RadioButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import http from '../helpers/https';
import globalStyles from '../assets/css/globalStyles';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import FeatherIcon from 'react-native-vector-icons/Feather';

const EditProfile = ({ navigation }) => {
  const token = useSelector(state => state.auth.token);
  const [editUsername, setEditUsername] = React.useState(false);
  const [editName, setEditName] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = React.useState(false);
  const [editGender, setEditGender] = React.useState(false);
  const [male, setMale] = React.useState(false);
  const [female, setFemale] = React.useState(false);
  const [nation, setNationality] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [profession, setProfession] = React.useState('');
  const [fileResponse, setFileResponse] = React.useState([]);
  const [profile, setProfile] = React.useState([]);
  const defaultimg = require('../assets/img/default-profile.jpg');
  const [selectedPicture, setSelectedPicture] = React.useState();

  const getImage = async source => {
    let results;
    if (!source) {
      results = await launchImageLibrary();
    } else {
      results = await launchCamera({
        quality: 0.5,
      });
    }
    const data = results.assets[0];
    console.log(data);
    if (data.uri) {
      setSelectedPicture({
        name: data.fileName,
        type: data.type,
        uri: Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
      });
    }
  };
  const takePicture = async source => {
    let results;
    if (source) {
      results = await launchImageLibrary();
    } else {
      results = await launchCamera({
        quality: 0.5,
      });
    }
    const data = results.assets[0];
    console.log(data);
    if (data.uri) {
      setSelectedPicture({
        name: data.fileName,
        type: data.type,
        uri: Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
      });
    }
  };

  const uploadFile = React.useCallback(
    async file => {
      const form = new FormData();
      form.append('picture', file);
      const { data } = await http(token).patch('/profile', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    [token],
  );

  React.useEffect(() => {
    if (selectedPicture) {
      uploadFile(selectedPicture);
    }
  }, [selectedPicture, uploadFile]);

  React.useEffect(() => {
    const getProfile = async () => {
      const { data } = await http(token).get('/profile');
      setProfile(data.results);
    };
    getProfile();
  }, []);

  const editProfile = async values => {
    const form = new FormData();

    Object.keys(values).forEach(key => {
      if (values[key]) {
        form.append(key, values[key]);
      }
    });

    if (fileResponse.length > 1) {
      form.append('picture', fileImage);
    }
    if (fileResponse) {
      form.append('picture', fileResponse);
    }
    if (profession) {
      form.append('profession', profession);
    }
    if (nation) {
      form.append('Nationality', nation);
    }
    if (date) {
      form.append('birthDate', moment(date).format('DD-MM-YYYY'));
    }
    if (male === true) {
      form.append('gender', true);
    }
    if (female === true) {
      form.append('gender', false);
    }
    const getProfile = async () => {
      const { data } = await http(token).get('/profile');
      setProfile(data.results);
    };
    try {
      const { data } = await http(token).patch('/profile', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfile(data.results);
    } catch (err) {
      console.warn(err);
    }

    setEditEmail(false);
    setEditPhoneNumber(false);
    setEditUsername(false);
    setEditName(false);
    setEditGender(false);
    getProfile();
  };

  const nationality = ['Indonesia', 'Malaysia', 'Singapore', 'Thailand', 'Laos', 'Japan'];
  const selectProfession = ['Backend Enginer', 'Mobile Developer', 'Web Developer', 'Data Analyst'];
  return (
    <ScrollView style={globalStyles.containerTitleNav}>
      <View style={globalStyles.navContainerChild}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <FeatherIcon name="arrow-left" size={25} color="#FFF" />
        </TouchableOpacity>
        <View>
          <Text style={globalStyles.textTitleWhite}>Edit Profile</Text>
        </View>
        <View>
          <Text />
        </View>
      </View>
      <Formik
        initialValues={{
          fullName: profile?.fullName,
          email: profile?.email,
          phoneNumber: profile?.phoneNumber,
          profession: profile?.profession,
          Nationality: profile?.Nationality,
          birthDate: profile?.birthDate,
        }}
        onSubmit={editProfile}>
        {({ values, handleBlur, handleChange, handleSubmit }) => {
          return (
            <>
              <View style={styles.PictureWrapper}>
                <View style={globalStyles.fotoProfil}>
                  {selectedPicture ? (
                    <Image style={globalStyles.img} src={selectedPicture.uri} width={90} height={90} />
                  ) : profile.picture ? (
                    <Image style={globalStyles.img} source={{ uri: profile.picture }} width={90} height={90} />
                  ) : (
                    <Icon name="user" size={70} color="blue" />
                  )}

                  {/* {profile?.picture === null && <Image style={globalStyles.img} source={defaultimg} />} */}
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#0E8388',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      margin: 5,
                    }}
                    onPress={getImage}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: 'white',
                        padding: 5,
                      }}>
                      From Galeri
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#0E8388',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      margin: 5,
                    }}
                    onPress={takePicture}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: 'white',
                        padding: 5,
                      }}>
                      Take Picture
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.ProfileContentWrapper}>
                <View>
                  <Text style={styles.ProfileContentHeader}>Name</Text>
                  <View style={styles.ProfileValueWrapper}>
                    {!editName && <Text style={globalStyles.textColor}>{profile?.fullName}</Text>}
                    {!editName && (
                      <Text onPress={() => setEditName(true)} style={styles.EditText}>
                        Edit
                      </Text>
                    )}
                    {editName && (
                      <TextInput
                        style={styles.ProfileNameInput}
                        onChangeText={handleChange('fullName')}
                        onBlur={handleBlur('fullName')}
                        value={values.fullName}></TextInput>
                    )}
                  </View>
                </View>
                <View>
                  <Text style={styles.ProfileContentHeader}>Username</Text>
                  <View style={styles.ProfileValueWrapper}>
                    {!editUsername && <Text style={globalStyles.textColor}>{profile?.username}</Text>}
                    {!editUsername && (
                      <Text onPress={() => setEditUsername(true)} style={styles.EditText}>
                        Edit
                      </Text>
                    )}
                    {editUsername && (
                      <TextInput
                        style={styles.ProfileNameInput}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}></TextInput>
                    )}
                  </View>
                </View>
                <View>
                  <Text style={styles.ProfileContentHeader}>Email</Text>
                  <View style={styles.ProfileValueWrapper}>
                    {!editEmail && <Text style={globalStyles.textColor}>{profile?.email}</Text>}
                    {!editEmail && (
                      <Text onPress={() => setEditEmail(true)} style={styles.EditText}>
                        Edit
                      </Text>
                    )}
                    {editEmail && (
                      <TextInput
                        style={styles.ProfileNameInput}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}></TextInput>
                    )}
                  </View>
                </View>
                <View>
                  <Text style={styles.ProfileContentHeader}>Phone Number</Text>
                  <View style={styles.ProfileValueWrapper}>
                    {!editPhoneNumber && <Text style={globalStyles.textColor}>{profile?.phoneNumber}</Text>}
                    {!editPhoneNumber && (
                      <Text onPress={() => setEditPhoneNumber(true)} style={styles.EditText}>
                        Edit
                      </Text>
                    )}
                    {editPhoneNumber && (
                      <TextInput
                        style={styles.ProfileNameInput}
                        placeholder={profile?.phoneNumber ? profile?.phoneNumber : '0812XXX'}
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        value={values.phoneNumber}></TextInput>
                    )}
                  </View>
                </View>
                <View>
                  <Text style={styles.ProfileContentHeader}>Gender</Text>
                  <View style={styles.GenderWrapperStyle}>
                    {editGender && (
                      <>
                        <View style={styles.RadioWrapperStyle}>
                          <RadioButton
                            value="1"
                            status={male ? 'checked' : 'unchecked'}
                            onPress={function () {
                              setMale(!male);
                              setFemale(false);
                            }}
                          />
                          <Text
                            onPress={function () {
                              setMale(!male);
                              setFemale(false);
                            }}
                            style={globalStyles.textColor}>
                            Male
                          </Text>
                        </View>
                        <View style={styles.RadioWrapperStyle}>
                          <RadioButton
                            value="0"
                            status={female ? 'checked' : 'unchecked'}
                            onPress={function () {
                              setFemale(!female);
                              setMale(false);
                            }}
                          />
                          <Text
                            onPress={function () {
                              setFemale(!female);
                              setMale(false);
                            }}
                            style={globalStyles.textColor}>
                            Female
                          </Text>
                        </View>
                      </>
                    )}
                    {!editGender && (
                      <>
                        <View style={styles.RadioWrapperStyle}>
                          <Text style={globalStyles.textColor}>{profile?.gender === true ? 'Male' : 'Female'}</Text>
                        </View>
                      </>
                    )}
                    <Text
                      onPress={() => setEditGender(true)}
                      style={{
                        fontFamily: 'Poppins-Medium',
                        color: '#0E8388',
                        marginLeft: 10,
                      }}>
                      Edit
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.ProfileContentHeader}>Select Profession</Text>
                  <SelectDropdown
                    data={selectProfession}
                    defaultButtonText={profile?.profession}
                    dropdownStyle={{ backgroundColor: '#EFEFEF' }}
                    buttonStyle={styles.SelectDropdownStyle}
                    buttonTextStyle={{ color: '#444', textAlign: 'left' }}
                    rowStyle={{
                      backgroundColor: '#EFEFEF',
                      borderBottomColor: '#C5C5C5',
                    }}
                    rowTextStyle={{ color: '#444', textAlign: 'left' }}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesomeIcon icon={isOpened ? faChevronUp : faChevronDown} color={'#444'} size={18} />;
                    }}
                    onSelect={selectedItem => {
                      setProfession(selectedItem);
                    }}
                    buttonTextAfterSelection={selectedItem => {
                      return selectedItem;
                    }}
                    rowTextForSelection={item => {
                      return item;
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.ProfileContentHeader}>Select Nationality</Text>
                  <SelectDropdown
                    data={nationality}
                    defaultButtonText={profile?.Nationality}
                    dropdownStyle={{ backgroundColor: '#EFEFEF' }}
                    buttonTextStyle={{ color: '#444', textAlign: 'left' }}
                    rowStyle={{
                      backgroundColor: '#EFEFEF',
                      borderBottomColor: '#C5C5C5',
                    }}
                    rowTextStyle={{ color: '#444', textAlign: 'left' }}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesomeIcon icon={isOpened ? faChevronUp : faChevronDown} color={'#444'} size={18} />;
                    }}
                    buttonStyle={styles.SelectDropdownStyle}
                    onSelect={selectedItem => {
                      setNationality(selectedItem);
                    }}
                    buttonTextAfterSelection={selectedItem => {
                      return selectedItem;
                    }}
                    rowTextForSelection={item => {
                      return item;
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.ProfileContentHeader}>Birth Date</Text>
                  <View>
                    <View style={styles.BirthDateWrapper}>
                      <View style={styles.DateWrapper}>
                        <Text style={globalStyles.textColor}>{moment(profile?.birthDate).format('DD/MM/YYYY')}</Text>
                      </View>
                      <TouchableOpacity>
                        <Text style={styles.EditText} onPress={() => setOpen(true)}>
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <DatePicker
                      value={new Date()}
                      modal
                      open={open}
                      mode="date"
                      date={date}
                      onConfirm={NewDate => {
                        setOpen(false);
                        setDate(NewDate);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />
                    {/* { showDate && <DateTimePicker value={new Date()} />}
                 <TouchableOpacity onPress={buttonShowDate}>
                  <Text style={globalStyles.textColor}>
                    Edit
                  </Text>
                 </TouchableOpacity> */}
                  </View>
                </View>
                <View>
                  <Button onPress={handleSubmit} btnTitle="Update">
                    Update
                  </Button>
                </View>
              </View>
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ContentWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  PictureWrapper: {
    alignItems: 'center',
    height: 200,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  PictureChildWrapper: {
    overflow: 'hidden',
    width: '50%',
    height: '100%',
    marginTop: 30,
  },
  ImageStyle: {
    objectFit: 'contain',
    width: '80%',
    height: '80%',
    borderRadius: 100,
    marginLeft: 20,
    borderWidth: 3,
    borderColor: '#19a7ce',
  },
  ProfileContentWrapper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    backgroundColor: 'white',
  },
  ProfileContentHeader: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: 'black',
  },
  ProfileNameInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    width: '100%',
    fontFamily: 'Poppins-Medium',
    paddingVertical: 13,
    color: 'black',
  },
  EditText: {
    fontFamily: 'Poppins-Medium',
    color: '#0E8388',
  },
  ProfileValueWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  GenderWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  RadioWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  SelectDropdownStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    fontFamily: 'Poppins-Medium',
  },
  BirthDateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  SaveBtnStyle: {
    width: '100%',
    backgroundColor: '#0E8388',
    padding: 12,
    borderRadius: 10,
  },
  SaveTextStyle: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    textAlign: 'center',
  },
});
export default EditProfile;
