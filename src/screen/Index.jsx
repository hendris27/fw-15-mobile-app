import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {useNavigation} from '@react-navigation/native';
import {IconButton, Checkbox} from 'react-native-paper';

const Index = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View>
            <FontAwesomeIcon icon={faBars} color="white" />
          </View>
          <View>
            <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
          </View>
        </TouchableOpacity>
        <View />
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <TextInput
          style={styles.input}
          placeholder="Search event..."
          placeholderTextColor="white"
        />
      </View>

      <View>
        <Text>this content</Text>
        <View>
          <Checkbox.Item label="Item" status="checked" />
        </View>
      </View>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0E8388',
    paddingLeft: 10,
    paddingRight: 10,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  img: {
    width: 50,
    height: 50,
  },
  input: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    width: '90%',
    height: 55,
    paddingLeft: 30,
  },
});
export default Index;
