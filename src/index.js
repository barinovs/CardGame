import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux'
// import store from './store/index'
import MainComponent from './components/maincomponent'

import { rootReducer } from './reducers/index'
import { createStore } from 'redux'

const store = createStore(rootReducer)

ReactDOM.render(<Provider store={store}>
                    <MainComponent />
                </Provider>,
    document.getElementById('app')
)

import './css/style.css';
