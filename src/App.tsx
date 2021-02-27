import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import RootNavigator from './navigators/RootNavigator'
import {configureStore} from "./redux/store/configureStore";
import {Provider} from "react-redux";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
