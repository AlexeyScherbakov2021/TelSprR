import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer, store } from './redux/RootReducer';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

//const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={baseUrl}>
                <App />
        </BrowserRouter>
    </Provider>,
  rootElement);

registerServiceWorker();

