/**
 * @format
 */

import {Buffer} from 'buffer';
global.Buffer = Buffer;
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Notifications from './src/Notifications';

Notifications();

AppRegistry.registerComponent(appName, () => App);
