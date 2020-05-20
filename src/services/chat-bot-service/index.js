import UUIDGenerator from 'react-native-uuid-generator';
import StorageService from '../storage-service';
import {BOT_SETTING} from "./config";
import {API_LIST,rootAPI} from '../api-service/index'
// Callback interface

class ChatBotService {
    static botUUID = '';
    static botUUID2 = 'abc';
    static wsConnection = null;
    

    constructor() {
       
    }

    initService() {
        console.log("Chatbot : start service...")
        StorageService.loadValue("chat_bot_uuid").then((uuid)=> {
            if (uuid) {
                console.log("Chatbot : loaded UUID " + uuid);
                this.botUUID = uuid;
                this.connectWSS();
            }
            else {
                this.generateGUID();
            }
        })
        this.handlerList = {
            //'onMessage': this._onMessage.bind(this),
            'onMessage': [],
        }
        this.onMessage = null;
    };

    generateGUID() {
        UUIDGenerator.getRandomUUID((uuid) => {
            console.log("Chatbot : generate UUID " + uuid);
            this.botUUID = uuid;
            StorageService.saveValue("chat_bot_uuid", uuid);
            this.connectWSS();
        });
    
    }
    
    connectWSS() {
        url = "wss://bot.fpt.ai/ws/livechat/"+ BOT_SETTING.APP_CODE + "/" + this.botUUID + "/";
        console.log("Chatbot : connect to socket " + url);
        
        
        this.wsConnection = new WebSocket(url);
        this.wsConnection.onmessage = (e) => {
            if (this.onMessage) {
                this.onMessage(e.data);
            }
            console.log(e.data);
          };

        this.wsConnection.onerror = (e) => {
            // an error occurred
            console.log(e.message);
            // alert(e.data);
        };
        
        this.wsConnection.onclose = (e) => {
            // connection closed
            console.log(e.code, e.reason);
            // alert(e.data);
        };
    }
    closeWSS(){
        if(this.wsConnection){
            this.wsConnection.close()
        }
    }
    async sendMessage(message) {
        console.log("Chatbot : Send message: " + message);
        data = {
            "channel" : BOT_SETTING.BOT_CHANNEL,
            "type" : BOT_SETTING.BOT_TYPE,
            "sender_id" : this.botUUID,
            "app_code" : BOT_SETTING.APP_CODE,
            "message" : {
                "type" : "text",
                "content" : message,
            }
        }

        console.log(JSON.stringify(data));

        let url = BOT_SETTING.API_SEND_MESSAGE;
        token = "Bearer " + BOT_SETTING.TOKEN;
        try {
            let response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
            )
            let responseJson = await response.json();
            console.log(responseJson); 
        } catch (error) {
            //console.error(error);
            return null;
        }
    }
    async search(body,key){
        params ={
            searchKey: key?key:'',
            cateID: body.category.key,
            cateTypeId: body.sub.key,
            offset: 1,
            limit: 5,
            process:255,
            newsType:0
        }
        res = await rootAPI.postAItem(API_LIST.TIM_KIEM, params);
        return res;
    }
}
export default new ChatBotService();