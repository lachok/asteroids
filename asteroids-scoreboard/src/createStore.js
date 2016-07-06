import { createStore, combineReducers, compose } from 'redux';
import {score} from './reducers';


export default (data = {}) => {
    const rootReducer = combineReducers({score})

    const finalCreateStore = compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore)

    return finalCreateStore(rootReducer)
}
