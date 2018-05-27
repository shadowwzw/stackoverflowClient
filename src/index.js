import 'es6-shim'
import React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'
import {Grid} from 'react-bootstrap'
import 'bootstrap3/dist/css/bootstrap.css'
import 'react-table/react-table.css'
import 'animate.css'
import registerServiceWorker from './registerServiceWorker'
import reducers from './reducers'
import MainPanel from './components/MainPanel'
import SearchPanelWrapped from './containers/SearchPanelWrapped'
import PanelOfResult from './containers/PanelOfResultWrapped'
import ModalOfDescription from './containers/ModalOfDescriptionWrapped'
import {selectorForLocation} from './selectors'
import packageObj from '../package.json'
const version = packageObj.version;
console.log('version ', version)

const basename = process.env.NODE_ENV === 'production' ? '/stackoverflow_client' : '/'
const history = createHistory({ basename })

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)),
)

const ConnectedSwitch = connect(selectorForLocation, null, null, {pure: false})(Switch)

const AppContainer = () => (
    <ConnectedSwitch>
        <MainPanel>
            <Grid fluid>
                <Route exact path="/" component={SearchPanelWrapped} />
                <Route path="/result" component={PanelOfResult} />
                <Route path="/result/description" component={ModalOfDescription} />
            </Grid>
        </MainPanel>
    </ConnectedSwitch>
)

const App = connect(selectorForLocation, null, null, {pure: false})(AppContainer)

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
)

registerServiceWorker()