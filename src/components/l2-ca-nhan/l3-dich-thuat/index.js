import React, { Component } from "react";
import {
    TouchableOpacity,
    Image,
    ActivityIndicator,
    TextInput,
    ImageBackground,
    Dimensions,
    Keyboard
} from "react-native";
import VoiceRecorderBox from '../../user-controls/VoiceRecorderBox';
import {
    Container,
    Content,
    Input,
    Button,
    Icon,
    View,
} from "native-base";

import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import CustomHeader from "../../user-controls/CustomHeader";
import { scale, verticalScale, moderateScale } from "../../user-controls/utilities/Scale";
import Footer, { footerMargin } from '../../user-controls/CustomFooter'
import Text from '../../custom-view/text';
import TranslationService from '../../../services/translation-service';

const win = Dimensions.get('window');

export default class DichThuatScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,  
            translatedText: '',
            typedText: '',
        }
    }

    decodeHtmlEntity(str) {
        return str.replace(/&#(\d+);/g, function(match, dec) {
          return String.fromCharCode(dec);
        });
      };

    translate() {
        if (this.state.typedText != "") {
            TranslationService.translate(this.state.typedText, "vi", "en").then(text=>{
                text = this.decodeHtmlEntity(text);
                String.form
                this.setState({translatedText: text});
            });
        }
    }
    renderContent() {
        return (
            <Content style={{backgroundColor: 'white'}}>
                <View style={{margin: 10}}>
                    <View>
                        <TextInput
                            style={{ borderColor: "#b4b4b4", borderRadius: 4,
                                    borderWidth: scale(1), height: verticalScale(250), padding: 5 }}
                            multiline={true}
                            autoCorrect={false}
                            returnKeyType="done"
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                                this.translate();
                            }}
                            underlineColorAndroid="transparent"
                            onChangeText={text => this.setState({typedText: text})}
                            textAlignVertical="top"
                            placeholder="Nội dung cần dịch"
                            placeholderTextColor="#888888"
                            value={this.state.typedText}
                            //defaultValue={this.state.typedText}
                        />
                        <View style={{position: 'absolute', bottom: 4, right: 4}}>
                            <VoiceRecorderBox onRecorded = {(text)=>{this.setState({typedText: text});}}/>
                        </View>
                    </View>

                    <TouchableOpacity onPress={()=> this.translate()} style={{marginVertical: 10}}>
                        <View style ={{
                                borderColor: "#a1e8fa", borderRadius: 4, height: scale(80), backgroundColor: '#d8f7ff', borderWidth: 1,
                                flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../../../../assets/images/canhan/ico_translate.png')} style={{width: scale(40), height: scale(40)}}/>
                            <Text> Dịch</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{borderColor: "#b4b4b4",  borderRadius: 4,
                                    borderWidth: scale(1), height: verticalScale(250), padding: 5 }}>
                        <Text multiline = {true}>
                            {this.state.translatedText}
                        </Text>
                    </View>
                </View>
            </Content>
        )
    }

    render() {
        return (
            <Container>
                <CustomHeader title='DỊCH THUẬT' />
                {this.renderContent()}
                <Footer select='0' />
            </Container>
        )
    }

}