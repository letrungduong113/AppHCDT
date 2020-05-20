import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,Keyboard,
  FlatList
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Picker,
} from "native-base";
import DatePicker from "react-native-datepicker";
import Text from "../../custom-view/text";
import PropTypes from "prop-types";
import { scale, verticalScale, moderateScale } from "../utilities/Scale";
import MasterAPI from "../../../services/api-service/master-api";
import CommonAPI from "../../../services/api-service/common-api";
import SuccessModal from "../Messages/success";
import moment from 'moment'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { convertFileSize } from "../utilities/converter";
import AppIndicator from '../AppIndicator';
import CustomHeader from "../CustomHeader";

const win = Dimensions.get("window");
var khungHeight = verticalScale(120);
var textSize = scale(30);


export default class NoiDungMauScreen extends Component {
  static propTypes = {
    itemId: PropTypes.string,
    ideaType: PropTypes.string,
    postCallBack: PropTypes.func,
    referUserID: PropTypes.array,
    orgID: PropTypes.string,
    referIDSelectSo: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      listNoiDungMau: [],
    };
  }

  
  componentDidMount() {
    CommonAPI.getNoiDungMau(22,1).then(res=>{
      if(res!=null){
        this.setState({
          listNoiDungMau: res,
        });
      }
    });
  }


  _renderItem = ({item}) => (
    <TouchableOpacity key={item.id} onPress={() => {alert("ahihi")}    
    }>
      <View style={{flexDirection: "row", height: khungHeight, width: '100%', backgroundColor: 'white'}}>
          <View style={{flex: 15, justifyContent: "center", alignItems: "center"}}>
            <View style={{width: scale(80), height: scale(80), justifyContent: "center", alignItems: "center", borderColor: 'lightgrey', borderWidth: 1, borderRadius: 10}}>
              <Image source={require('../../../../assets/images/user-controls/noidungmau.png')} style={{width: scale(60), height: scale(60)}} />  
            </View> 
              
          </View>
          
          <View style={{flex: 75, justifyContent: "center"}}>
              <Text style={{color: 'grey', fontSize: textSize, fontWeight: 'bold'}}>{item.message}</Text>
          </View>

          <View style={{flex: 10, justifyContent: "center", alignItems: "center"}}>
              <Icon name='ios-arrow-forward' style={{color: 'lightgrey'}}/>
          </View>
      </View>
      <View style={{width: '100%', height: 1, flexDirection: 'row'}}>
        <View style={{flex: 15}}></View>
        <View style={{flex: 85, backgroundColor: 'lightgrey'}}></View>
      </View>
    </TouchableOpacity>
)

  render() {
    return (
      <Container style={{backgroundColor: "white"}}>
        <CustomHeader title="Chọn mẫu nội dung" />
        <Content>
        <View>
                <FlatList
                    data={this.state.listNoiDungMau}
                    // keyExtractor={(item, index) => item.id.toString()}
                    renderItem={this._renderItem}
                    numColumns={1}
                />
            </View>
        </Content>
      </Container>
      
    )
  }

  getHeightRatio(width, width_new, height_new) {
    let height = (height_new * width) / width_new;
    return height;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: scale(24)
  },
  textModal: {
    color: "#333333",
    fontSize: scale(26)
  },
  border: {
    borderColor: "#b4b4b4",
    borderWidth: scale(1)
  }
});
