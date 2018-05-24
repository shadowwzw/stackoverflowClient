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
import registerServiceWorker from './registerServiceWorker'
import reducers from './reducers'
import MainPanel from './components/MainPanel'
import SearchPanel from './components/SearchPanel'
import PanelOfResult from './containers/PanelOfResult'

const history = createHistory()

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)),
)

const ConnectedSwitch = connect(state => ({
    location: state.location
}))(Switch)

const AppContainer = () => (
    <ConnectedSwitch>
        <MainPanel>
            <Grid fluid>
                <Route exact path="/" component={SearchPanel} />
                <PanelOfResult/>
                {/*<Route path="/about" component={() => (<h1>About <Link to="/">Home</Link></h1>)} />*/}
            </Grid>
        </MainPanel>
    </ConnectedSwitch>
)

const App = connect(state => ({
    location: state.location,
}))(AppContainer)

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
)

registerServiceWorker()