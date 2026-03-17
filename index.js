import App from './App';
import './src/database/db';
import { Provider } from 'react-redux';
import 'react-native-url-polyfill/auto';
import { store } from './src/redux/store';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
