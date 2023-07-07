import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {React, useState} from 'react';
import {RadioButton} from 'react-native-paper';
import globalStyles from '../assets/css/globalStyles';
import Input from '../components/Input';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import SelectDropdown from 'react-native-select-dropdown';
import Headers from '../components/Headers';

const EditProfile = () => {
  const Profession = ['Programmer', 'Akuntan', 'Farmer', 'Atlet'];
  const countries = ['Indonesia', 'Singapura', 'Australia', 'Ireland'];
  const [gender, setGender] = useState('');
  const handleRadioPress = value => {
    setGender(value);
  };
  return (
    <ScrollView style={globalStyles.containerTitleNav}>
      <Headers>Edit Profil</Headers>
      <View style={globalStyles.wrapperContent}>
        <View style={globalStyles.wrapperProfileName}>
          <View style={globalStyles.foto}>
            <View style={globalStyles.fotoProfil}>
              <Image
                source={require('../assets/img/default-profile.jpg')}
                style={globalStyles.img}
              />
            </View>
          </View>
          <View>
            <Text style={globalStyles.textColor}>foto</Text>
          </View>
          <View>
            <Text style={globalStyles.textColor}>foto</Text>
          </View>
        </View>
        <View style={style.titleName}>
          <Text style={style.subTitleName}>Name</Text>
          <View style={style.subTitleContent}>
            <View style={{flex: 1}}>
              <Input placeholder="Input Your Name" />
            </View>
            <TouchableOpacity>
              <FeatherIcon name="edit-3" size={25} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.titleName}>
          <Text style={style.subTitleName}>Username</Text>
          <View style={style.subTitleContent}>
            <View style={{flex: 1}}>
              <Input placeholder="Input Your Name" />
            </View>
            <TouchableOpacity>
              <FeatherIcon name="edit-3" size={25} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.titleName}>
          <Text style={style.subTitleName}>Email</Text>
          <View style={style.subTitleContent}>
            <View style={{flex: 1}}>
              <Input placeholder="Input Your Name" />
            </View>
            <TouchableOpacity>
              <FeatherIcon name="edit-3" size={25} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.titleName}>
          <Text style={style.subTitleName}>Phone Number</Text>
          <View style={style.subTitleContent}>
            <View style={{flex: 1}}>
              <Input placeholder="Input Your Name" />
            </View>
            <TouchableOpacity>
              <FeatherIcon name="edit-3" size={25} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.titleName}>
          <Text style={style.subTitleName}>Gender</Text>
          <RadioButton.Group onValueChange={handleRadioPress} value={gender}>
            <View style={style.flexCont}>
              <View style={style.flexContGender}>
                <RadioButton.Android value="male" />
                <Text style={globalStyles.textColor}>Male</Text>
              </View>
              <View style={style.flexContGender}>
                <RadioButton.Android value="female" />
                <Text style={globalStyles.textColor}>Female</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <View style={style.titleName}>
          <Text style={style.subTitleName}>Profession</Text>
          <SelectDropdown
            data={Profession}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>
        <View style={style.titleName}>
          <Text style={style.subTitleName}>Nationality</Text>
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>
        <View style={style.titleName}>
          <Text style={style.subTitleName}>Birthday Date</Text>
        </View>
        <Button btnTitle="Update">Update</Button>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(51, 102, 255, 1)',
  },
  textEditPr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  contTextPr: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  contEditProf: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    gap: 20,
  },
  foto: {
    width: 137,
    height: 137,
    borderWidth: 5,
    borderColor: 'blue',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  fotoIcon: {
    width: 110,
    height: 110,
    backgroundColor: 'gray',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fotoCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 16,
    padding: 14,
    borderWidth: 1,
    borderRadius: 15,
  },
  titleName: {
    gap: 10,
  },
  flexCont: {
    flexDirection: 'row',
    gap: 10,
  },
  flexContGender: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  touchCheckOut: {
    backgroundColor: 'blue',
    width: '100%',
    height: 61,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  textCheckout: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textEdit: {
    color: 'blue',
  },
  subTitleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  subTitleContent: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditProfile;
