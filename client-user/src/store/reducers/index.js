import { combineReducers } from "redux";
import jobReducer from './jobReducer.js'
import testReducer from './blablaReducer.js'
const rootReducer = combineReducers({
    jobReducer,
    testReducer
})

export default rootReducer