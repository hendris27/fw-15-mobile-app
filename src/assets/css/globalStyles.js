import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  wrapper: {
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  btn: {
    width: '100%',
    marginTop: 30,
    backgroundColor: '#0E8388',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
  parentInput: {
    rowGap: 20,
    marginTop: 20,
  },
  input: {
    height: 55,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    color: 'black',
    fontSize: 18,
    marginTop: 0,
    paddingHorizontal: 10,
  },
  inputComponents: {
    flex: 1,
    color: 'black',
  },
  textTitle: {
    color: 'black',
    marginTop: 30,
    flexDirection: 'coloumn',
    rowGap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  textSubTitle: {
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
  },
  textColor: {
    color: 'black',
  },
  textPrimary: {color: '#0E8388'},
  textForgotPassword: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    textAlign: 'right',
    paddingRight: 10,
  },
  loginWith: {
    flexBasis: 'coloumn',
    rowGap: 20,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconloginWith: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    columnGap: 40,
  },
});
export default globalStyles;
