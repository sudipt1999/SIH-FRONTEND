import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import Reducer from "./Reducer/Reducer";
import { composeWithDevTools } from 'redux-devtools-extension'

const persistConfig = {
    key: 'user',
    storage,
    whitelist: ['user', 'isLoggedIn']
  }


const persistedReducer = persistReducer(persistConfig, Reducer)
 

  const store = createStore(persistedReducer, composeWithDevTools( ));
  let persistor = persistStore(store)
  export { store, persistor }




