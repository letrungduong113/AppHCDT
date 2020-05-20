import React, {Component} from "react";
import CommonAPI from "../../../services/api-service/common-api";
import {rootAPI} from "../../../services/api-service";
import {scale} from "../utilities/Scale";
import {convertTime} from "../utilities/converter";
import PropTypes from "prop-types";
import OpenFile from 'react-native-doc-viewer';

const FILE_TYPE_MAPPING = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/msword" : "doc",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.ms-excel": "xls",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
  "text/plain": "txt",
}

import {
  TouchableOpacity,
  Image,
  View,
  Text,
  Platform,
  Dimensions,
  Modal,
  TextInput,
  ScrollView,
  Linking,
  ActivityIndicator
} from "react-native";

var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(22);

export default class AttachmentBox extends Component {
  static propTypes = {
    itemId: PropTypes.string,
    callBackFunc: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      fileDinhKems: [],
      isLoading:false
    };
  }

  //Hiển thị ảnh .pdf or .doc
  getType(type) {
    switch (type) {
        case "application/vnd.ms-docx":
            return require("../../../../assets/images/anh_kieu_type/image_doc.png");
        case "application/pdf":
            return require("../../../../assets/images/anh_kieu_type/image_pdf.png");
        case "application/vnd.ms-excel":
        case "application/vnd.openxmlformats-officedocument.spre":
            return require("../../../../assets/images/anh_kieu_type/image_xls.png");
        case "application/vnd.ms-pptx":
            return require("../../../../assets/images/anh_kieu_type/image_ppt.png");
        case "image/jpeg":
        case "image/png":
            return require("../../../../assets/images/anh_kieu_type/image_jpg.png");
        default:
            return require("../../../../assets/images/anh_kieu_type/image_null.png");
    }
  }

  componentDidMount() {
    //alert(this.props.itemId);
    if (this.props.itemId) {
      CommonAPI.getDsAttachments(this.props.itemId).then((response)=>{
        if(response)
        this.setState({fileDinhKems: response});
      })
    }

  }
  xemTaiLieu(index) {
    console.log("Bam xem tai lieu...");
    this.setState({isLoading:true})
    rootAPI.apiFileDownload(
      this.state.fileDinhKems[index].link, 
      this.state.fileDinhKems[index].fileName
    ).then((localFile)=> {
      // this.setState({isLoading:false})
      if (localFile && localFile.length) {
        if(Platform.OS =='android'){
            localFile = "file://" + localFile;
        }
        console.log("Downloaded file: " + localFile);
        console.log("File type: " + this.state.fileDinhKems[index].fileType);
        
        OpenFile.openDoc([{
          url:localFile,
          fileName:this.state.fileDinhKems[index].fileName,
          fileType: FILE_TYPE_MAPPING[this.state.fileDinhKems[index].fileType],
          cache: true,
        }], (error, url) => {
          this.setState({isLoading:false})
           if (error) {
            console.log("ERROR: " + error);
           } else {
            this.setState({animating: false});
             console.log("SUCCESS: " + url);
           }
         })
      }
    })
  }

  
  listItems(value) {
    return value.map((data, i) => {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            width: "100%",
            height: scale(140),
            flexDirection: "row"
          }}
          key={i}
          onPress={() => {
            //todo anything
            this.xemTaiLieu(i);
          }}
        >
          <View
            style={{
              margin: 20,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{ width: scale(75), height: scale(98) }}
              source={this.getType(data.fileType)}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20
            }}
          >
            <Text style={{ fontSize: FONT_SIZE_MAIN, color: "#333333" }}>
              {data.fileName}
            </Text>
            <View style={{ flexDirection: "row" }}>
              {/* <View style={{ alignItems: "center"}}>
                <Text
                  style={{
                    marginRight: 5,
                    fontSize: FONT_SIZE_SUB,
                    color: "#999999"
                  }}>
                  Bên phát hành:{" "}</Text>
              </View> */}

              <View>
                <Text
                  style={{
                    fontSize: FONT_SIZE_SUB,
                    color: "#999999"
                  }}
                >
                  {data.uploader}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: FONT_SIZE_SUB, color: "#999999" }}>
              Ngày phát hành:&nbsp;{convertTime(data.uploadedTime)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
    <View style={{ backgroundColor: "white", paddingTop: 10, marginTop: 10 }}>
    <Modal
          animationType="fade"
          transparent={true}
          opacity={0.5}
          backdropOpacity={0.1}
          visible={this.state.isLoading}
          onRequestClose={() => {}}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
          >
            {/* <View style={{width: 150, height: 150, backgroundColor: "rgba(255,255,255,0.5)", justifyContent: 'center', alignItems: 'center'}}> */}
            <ActivityIndicator size="large" color="white" />
            {/* </View> */}
          </View>
        </Modal>
      <Text
        style={{
          marginTop: 5,
          padding: 5,
          marginLeft: 10,
          backgroundColor: "white",
          borderBottomColor: "#f3f3f3",
          borderBottomWidth: 1,
          color: "#494949",
          fontSize: FONT_SIZE_MAIN
        }}
      >
        BÁO CÁO VÀ CÁC VĂN BẢN KÈM THEO
      </Text>
      <View style={{marginTop: 10, width: "100%", backgroundColor: "white"}}>
        {this.listItems(this.state.fileDinhKems)}
      </View>
    </View>
    )
  }
}