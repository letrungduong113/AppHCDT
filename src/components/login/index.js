import React, { Component } from "react";
import { Image, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import ApiService from "../../services/api-service";
import StorageService from "../../services/storage-service";
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {
  Container,
  Content,
  Input,
  Button,
  Icon,
  View,
  Text
} from "native-base";
import { setUser } from "../../redux/actions/user";
import styles from "./styles";

const validate = values => {
  const error = {};
  error.email = "";
  error.password = "";
  var ema = values.email;
  var pw = values.password;
  if (values.email === undefined) {
    ema = "";
  }
  if (values.password === undefined) {
    pw = "";
  }
  if (ema.length < 8 && ema !== "") {
    error.email = "too short";
  }
  if (!ema.includes("@") && ema !== "") {
    error.email = "@ not included";
  }
  // if (pw.length > 12) {
  //   error.password = "max 11 characters";
  // }
  // if (pw.length < 5 && pw.length > 0) {
  //   error.password = "Weak";
  // }
  return error;
};

class Login extends Component {
  static propTypes = {
    setUser: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      userName: "",
      password: "",
      isLoginFailed: false,
      isLogging: false,
    };
  }
  componentDidMount() {
    StorageService.loadValue("username").then(value => {
      if (value != null) this.setState({userName: value});
    });

    StorageService.loadValue("password").then(value => {
      if (value != null) this.setState({password: value});
    });
  }
  setUser(name) {
    this.props.setUser(name);
  }
  
  executeLogin = ()=> {
    this.setState({isLoginFailed: false, isLogging: true});
    ApiService.logIn(this.state.userName, this.state.password).then((data) =>{
      if (true) { /** Replace by below code line if your LOGIN API is available **/
      //if (data && data.access_token) {
        ApiService.setToken(data.access_token);
        StorageService.saveValue("username",this.state.userName);
        StorageService.saveValue("password",this.state.password);
        this.props.navigation.navigate("HomeScreenOption2");
        
      }
      else {
        this.setState({isLoginFailed: true, isLogging: false});
      }
    })
    
  }
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Text style ={{color: 'green', margin: 10,marginTop:40, fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>LOG IN</Text>
              <Text style={{margin: 5}}>Đăng nhập vào hệ thống</Text>
            </View>
            <View style={styles.bg}>  
                <Text style ={{color: 'red', display: this.state.isLoginFailed? 'flex' : 'none'}}> Lỗi: Tên người dùng hoặc mật khẩu không đúng. </Text>
                <View style={{flex: 1, flexDirection: 'row', alignItems:'flex-end', marginLeft: 14, marginRight: 14}}>
                  <Icon active name="person" style={{fontSize: 40, marginRight: 5}}/>
                  <Input onChangeText = {(text)=> {this.setState({userName: text})}} placeholder="Tên người dùng"
                    value = {this.state.userName} secureTextEntry = {false}
                    style={{borderBottomWidth: 1, borderColor: '#aaaaaa'}}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems:'flex-end', marginLeft: 14, marginRight: 14}}>
                  <Icon active name="lock" style={{fontSize: 40, marginRight: 5}}/>
                  <Input onChangeText = {(text)=> {this.setState({password: text})}} placeholder="Mật khẩu"
                    value = {this.state.password} secureTextEntry = {true}
                    style={{borderBottomWidth: 1, borderColor: '#aaaaaa'}}/>
                </View>
                <Button
                  style={styles.btn}
                  onPress={this.executeLogin}>
                  <Text>Đăng nhập</Text>
                </Button>
            </View>
          </Content>
          <Modal animationType="fade"
              transparent={false} backdropOpacity = {0.5}
              visible={this.state.isLogging}
              onRequestClose={() => {
              }}>
            <View style={{marginTop: 100}}>
              <View style={{backgroundColor: 'white' }}>
                <ActivityIndicator size="large" color="#3c8dbc"></ActivityIndicator>
                <Text style={{textAlign: 'center'}}>Đang đăng nhập...</Text>
              </View>
            </View>
          </Modal>
        </View>
      </Container>
    );
  }
}
// const LoginSwag = reduxForm(
//   {
//     form: "test",
//     validate
//   },
//   function bindActions(dispatch) {
//     return {
//       setUser: name => dispatch(setUser(name)),
//       setSchoolId: schoolId => dispatch(setSchoolId(schoolId)),
//     };
//   }
// )(Login);
// LoginSwag.navigationOptions = {
//   header: null
// };
// export default LoginSwag;
function bindAction(dispatch) {
  return {
      setUser: name => dispatch(setUser(name)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
});

export default connect(mapStateToProps, bindAction)(Login);

