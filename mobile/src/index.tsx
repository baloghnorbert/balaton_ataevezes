import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { IAppState } from './state/app.state';
import { Store } from "ts-lite-store/store";
import { initialState } from './state/app.initial';
import * as StoreContext from 'ts-lite-store/store.provider';
import { Extensions } from './library/extensions';

const store: Store<IAppState> = new Store<IAppState>(initialState);

const ext = Extensions;

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.StoreProvider store={store}>
      <App />
    </StoreContext.StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
