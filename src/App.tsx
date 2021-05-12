import React, {useEffect, useRef} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from "@react-navigation/native";
import RootNavigator from './navigators/RootNavigator'
import {configureStore} from "./redux/store/configureStore";
import {Provider} from "react-redux";

const {store, persistor} = configureStore()

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator/>
        </PersistGate>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
