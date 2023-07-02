import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  wrapper: {
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  wrapperDasboard: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#0E8388',
    gap: 30,
  },
  containerTitleNav: {
    backgroundColor: '#0E8388',
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
  inputDashboard: {
    height: 55,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    fontSize: 18,
    paddingHorizontal: 20,
  },
  inputComponents: {
    flex: 1,
    color: 'black',
  },
  inputComponentsDashboard: {
    flex: 1,
    color: 'green',
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
  eventContainer: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navContainer: {
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navContainerChild: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 35,
  },
  containerChild: {
    backgroundColor: '#0E8388',
  },
  textTitleWhite: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  //Profile
  wrapperContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    gap: 15,
    paddingBottom: 20,
    paddingTop: 40,
  },
  wrapperProfileName: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  foto: {
    width: 130,
    height: 130,
    borderWidth: 5,
    borderColor: '#0E8388',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    overflow: 'hidden',
  },
  fotoProfil: {
    width: 130,
    height: 130,
    backgroundColor: 'yellow',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  Profession: {
    fontSize: 16,
    color: 'black',
    opacity: 0.7,
  },
  cardContent: {
    gap: 15,
  },
  cardNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonAddCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: 'orange',
    borderStyle: 'dashed',
    borderRadius: 10,
    marginLeft: 30,
  },
  cardMemberDetail: {
    width: 288,
    height: 172,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    overflow: 'hidden',
  },
  cardMember: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navEditProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  changePassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 80,
  },
  textTitleNav: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  wrapperTextTitleNav: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerProfile: {
    gap: 20,
    marginTop: 20,
  },
  // css style dashboard
  container: {
    backgroundColor: 'white',
    border: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    gap: 10,
  },

  textInput: {
    opacity: 0.8,
    color: 'white',
    borderColor: 'white',
    fontSize: 17,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    margin: 20,
  },
  textTitleEvent: {
    color: 'black',
    fontSize: 25,
    fontWeight: '700',
  },
  textTitleDiscover: {
    color: 'black',
    fontSize: 30,
    fontWeight: '700',
    padding: 30,
  },
  boxEvent: {
    position: 'relative',
    width: 260,
    height: 376,
    backgroundColor: 'gray',
    borderRadius: 40,
    marginLeft: 20,
    marginRight: 20,
    gap: 10,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  textContaninerNew: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  textNew: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'white',
  },
  wrapperTitleText: {
    position: 'absolute',
    bottom: 25,
    left: 25,
    gap: 10,
  },
  wrapperBox: {
    flexDirection: 'row',
    gap: 10,
  },
  wrapperBoxNew: {
    margin: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginLeft: 30,
    width: 165,
    height: 66,
    borderRadius: 30,
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  btnArrowRight: {
    backgroundColor: '#0E8388',
    width: 45,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDiscover: {
    fontSize: 16,
    color: '#884DFF',
  },
  iconDiscover: {
    width: 45,
    height: 45,
    backgroundColor: 'yellow',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperBoxDiscover: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTextUpcoming: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  containerUpcoming: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventUpcoming: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  upcomingTextCont: {
    width: 60,
    height: 85,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0E8388',
  },
  monthTextCont: {
    paddingLeft: 20,
  },
  textContDay: {
    alignItems: 'center',
  },
  textDay: {
    color: '#FF8900',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonUpcoming: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#0E8388',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 50,
    width: '80%',
    height: 50,
    borderTopColor: '#FF8900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#0E8388',
    fontWeight: 'bold',
  },
  contentUpcoming: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorsText: {
    color: '#FF9191',
  },
  pickerContainer: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
});
export default globalStyles;
