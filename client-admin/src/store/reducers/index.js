import { combineReducers } from "redux";
import companyReducer from './companyReducer.js'
import jobReducer from './jobReducer.js'
import skillReducer from './skillReducer.js'
import generalReducer from './generalReducer.js'

const rootReducer = combineReducers({
    companyReducer,
    jobReducer,
    skillReducer,
    generalReducer
})

export default rootReducer