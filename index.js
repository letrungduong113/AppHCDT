import { AppRegistry } from 'react-native';
import setup from './src/setup';
import bgMessaging from './configPush/bgMessaging'; 
import {name as appName} from './app.json';
//import NotificationService from './configPush/NotificationService';

console.disableYellowBox = true

AppRegistry.registerComponent(appName, setup);
//AppRegistry.registerComponent(appName, () => NotificationService);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
