import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import globalStyles from '../assets/css/globalStyles';
import http from '../helpers/https';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import { useFocusEffect } from '@react-navigation/native';
import { Modal } from 'react-native';
import Loader from '../components/Loader';

const UpdateEvent = ({ navigation, route }) => {
  const [category, setCategory] = React.useState([]);
  const nameCategory = [];
  const nameLocation = [];
  const [city, setCity] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [filePicture, setFilePicture] = React.useState([]);
  const token = useSelector(state => state.auth.token);
  const [selectedPicture, setSelectedPicture] = React.useState();
  const defaultimgEvent = require('../assets/img/defaultIMGEvent.png');
  const { eventId } = route.params;
  const [editLocation, setEditLocation] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const [editTitle, setEditTitle] = React.useState(false);
  const [editCategory, setEditCategory] = React.useState(false);
  const [editDescription, setEditDescription] = React.useState(false);
  const [editDate, setEditDate] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function getEvents() {
        const { data } = await http(token).get(`/event/manage/${eventId}`);
        setEvents(data.results);
      }

      getEvents();
    }, [token, eventId]),
  );
  console.log(eventId, 'eventId');

  React.useEffect(() => {
    async function getCategory() {
      try {
        const { data } = await http().get('/category?limit=7');
        setCategory(data.results);
      } catch (err) {
        console.warn(err);
      }
    }
    async function getLocation() {
      try {
        const { data } = await http().get('/city');
        setCity(data.results);
      } catch (err) {
        console.warn(err);
      }
    }
    getCategory();
    getLocation();
  }, []);

  const getImageLibrary = async source => {
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
    // setFilePicture(data.uri);
  };

  category.map(dataCategory => {
    nameCategory.push(dataCategory.name);
  });

  city.map(dataCity => {
    nameLocation.push(dataCity.name);
  });

  const actionUpdate = async values => {
    setModalVisible(true);

    const form = new FormData();

    Object.keys(values).forEach(key => {
      if (values[key]) {
        form.append(key, values[key]);
      }
    });

    if (selectedCategory == 0) {
      form.append('categoryId', 1);
    } else {
      form.append('categoryId', selectedCategory);
    }
    if (selectedLocation == 0) {
      form.append('cityId', 1);
    } else {
      form.append('cityId', selectedLocation);
    }
    if (date) {
      form.append('date', moment(date).format('DD-MM-YYYY'));
    }

    if (filePicture.length > 1) {
      form.append('picture', filePicture);
    }
    if (filePicture) {
      form.append('picture', filePicture);
    }
    if (selectedPicture) {
      form.append('picture', selectedPicture);
    }
    console.log(form);
    try {
      const { data } = await http(token).patch(`/event/manageupdate/${eventId}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigation.navigate('ManageEvent');

      console.log(data, 'a');
    } catch (err) {
      console.warn(err);
    }

    setModalVisible(false);
    setEditTitle(false);
    setEditCategory(false);
    setEditLocation(false);
    setEditDate(false);
    setEditDescription(false);
  };

  return (
    <ScrollView style={globalStyles.containerTitleNav}>
      <View style={globalStyles.navContainerChild}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <FeatherIcon name="arrow-left" size={25} color="#FFF" />
        </TouchableOpacity>
        <View>
          <Text style={globalStyles.textTitleWhite}>Update Event</Text>
        </View>
        <View>
          <Text />
        </View>
      </View>
      <View style={{ backgroundColor: 'white' }}>
        <Formik
          initialValues={{
            tittle: events?.tittle,
            descriptions: events?.descriptions,
            date: events?.date,
            cityId: events?.cityId,
            categoryId: events?.categoryId,
          }}
          onSubmit={actionUpdate}>
          {({ values, handleBlur, handleChange, handleSubmit }) => {
            return (
              <View style={{ margin: 30 }}>
                <View
                  style={{
                    width: '100%',
                    height: 300,
                    backgroundColor: 'gray',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderBlockColor: 'red',
                    borderWidth: 5,
                    borderColor: '#0E8388',
                  }}>
                  {selectedPicture ? (
                    <Image style={globalStyles.img} src={selectedPicture.uri} />
                  ) : (
                    <Image style={globalStyles.img} source={defaultimgEvent} />
                  )}
                </View>
                <TouchableOpacity onPress={getImageLibrary}>
                  <View style={styles.selectPicture}>
                    <Text style={globalStyles.textColor}>Select Picture Event</Text>
                    <FeatherIcon name="upload" size={25} color="#0E8388" />
                  </View>
                </TouchableOpacity>

                <View>
                  <Text style={{ color: 'black', marginBottom: 5 }}>Name Event</Text>
                  <View style={styles.wrapperSelect}>
                    {!editTitle && <Text style={styles.FontStyle}>{events?.tittle}</Text>}
                    {!editTitle && (
                      <Text onPress={() => setEditTitle(true)} style={styles.btnEdit}>
                        Edit
                      </Text>
                    )}
                    {editTitle && (
                      <TextInput
                        style={styles.inputContent}
                        placeholder="name event"
                        placeholderTextColor="gray"
                        onChangeText={handleChange('tittle')}
                        onBlur={handleBlur('tittle')}
                        value={values.tittle}></TextInput>
                    )}
                  </View>
                </View>
                <View>
                  <Text style={{ margin: 5, color: 'black' }}>Category</Text>
                  <View style={styles.wrapperSelect}>
                    {!editCategory && <Text style={styles.FontStyle}>{events?.category}</Text>}
                    {!editCategory && (
                      <Text onPress={() => (a = setEditCategory(true))} style={styles.btnEdit}>
                        Edit
                      </Text>
                    )}
                    {editCategory && (
                      <SelectDropdown
                        data={nameCategory}
                        defaultButtonText="Select Category"
                        dropdownStyle={{ backgroundColor: '#C0C0C0' }}
                        buttonStyle={styles.DropdownSelected}
                        buttonTextStyle={styles.btnSelected}
                        rowStyle={{
                          backgroundColor: '#E0E0DC',
                          borderBottomColor: '#C5C5C5',
                        }}
                        rowTextStyle={{ color: '#444', textAlign: 'left' }}
                        renderDropdownIcon={isOpened => {
                          return (
                            <FontAwesomeIcon icon={isOpened ? faChevronUp : faChevronDown} color={'#444'} size={18} />
                          );
                        }}
                        onSelect={(selectedItem, index) => {
                          setSelectedCategory(index);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem;
                        }}
                        rowTextForSelection={item => {
                          return item;
                        }}
                      />
                    )}
                  </View>
                </View>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    marginBottom: 5,
                    marginTop: 5,
                    color: 'black',
                  }}>
                  Location
                </Text>
                <View style={styles.wrapperSelect}>
                  {!editLocation && <Text style={styles.FontStyle}>{events?.location}</Text>}
                  {!editLocation && (
                    <Text onPress={() => (a = setEditLocation(true))} style={styles.btnEdit}>
                      Edit
                    </Text>
                  )}
                  {editLocation && (
                    <SelectDropdown
                      data={nameLocation}
                      defaultButtonText="Category"
                      dropdownStyle={{ backgroundColor: '#EFEFEF' }}
                      buttonStyle={styles.SelectDropdownStyle}
                      buttonTextStyle={{
                        textAlign: 'left',
                        fontFamily: 'Poppins-Medium',
                        color: 'gray',
                        fontSize: 16,
                        paddingTop: 3,
                      }}
                      rowStyle={{
                        backgroundColor: '#EFEFEF',
                        borderBottomColor: '#C5C5C5',
                      }}
                      rowTextStyle={{ color: '#444', textAlign: 'left' }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesomeIcon icon={isOpened ? faChevronUp : faChevronDown} color={'#444'} size={18} />
                        );
                      }}
                      onSelect={(selectedItem, index) => {
                        setSelectedCategory(index);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={item => {
                        return item;
                      }}
                    />
                  )}
                </View>

                <View>
                  <Text style={globalStyles.textColor}>Date / Time</Text>
                  <View style={styles.wrapperSelect}>
                    {!editDate && <Text style={styles.FontStyle}>{moment(events.date).format('LLL')}</Text>}
                    {!editDate && (
                      <Text onPress={() => (a = setEditDate(true))} style={styles.btnEdit}>
                        Edit
                      </Text>
                    )}
                    {editDate && (
                      <TouchableOpacity style={styles.selectPicture} onPress={() => setOpen(true)}>
                        <Text style={globalStyles.textColor}>{moment(date).format('DD/MM/YYYY')}</Text>
                        <FeatherIcon name="calendar" size={25} color="#0E8388" />
                        <DatePicker
                          modal
                          open={open}
                          mode="date"
                          date={date}
                          onConfirm={date => {
                            setOpen(false);
                            setDate(date);
                          }}
                          onCancel={() => {
                            setOpen(false);
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <View>
                  <Text style={{ fontFamily: 'Poppins-Medium', marginTop: 5, color: 'black' }}>Descriptions</Text>
                  {!editDescription && <Text style={styles.FontStyle}>{events?.descriptions}</Text>}
                  {!editDescription && (
                    <Text onPress={() => (a = setEditDescription(true))} style={styles.btnEdit}>
                      Edit
                    </Text>
                  )}
                  {editDescription && (
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingLeft: 10,
                        width: '100%',
                        height: 200,
                        color: 'black',
                      }}>
                      <TextInput
                        placeholder="Description"
                        placeholderTextColor="gray"
                        onChangeText={handleChange('descriptions')}
                        onBlur={handleBlur('descriptions')}
                        style={{ color: 'black' }}
                        value={values.descriptions}></TextInput>
                    </View>
                  )}
                </View>
                <View style={{ marginTop: 10 }}>
                  <Button style={globalStyles.textColor} onPress={handleSubmit} btnTitle="Update">
                    Update
                  </Button>
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 25,
            backgroundColor: 'white',
          }}>
          <Loader />
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  inputContent: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    width: '100%',
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  DropdownSelected: {
    width: '100%',
    height: 50,
    backgroundColor: '#E0E0DC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    fontFamily: 'Poppins-Medium',
  },
  selectPicture: {
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  btnSelected: {
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
    color: 'gray',
    fontSize: 16,
    paddingTop: 3,
  },
  wrapperSelect: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  btnEdit: {
    fontFamily: 'Poppins-Medium',
    color: '#0E8388',
  },
});

export default UpdateEvent;
