
export const MESSAGE_BUTTON_TYPE = {
    OK: '1',
    OKCANCEL: '2'
}
export default class MessageService {
    showMessage(title, message, type = MESSAGE_BUTTON_TYPE.OK) {
        // alert(message);
    }

}