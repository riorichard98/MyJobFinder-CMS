import { ADDCOMPANY, DELETECOMPANY, FETCHCOMPANIES } from "../actions/actionType";

const initialState = {
    companies:[],
    company:null
}

const reducer = (state=initialState,action) =>{
    if(action.type === ADDCOMPANY){
        return {...state,companies:action.payload}
    }
    if(action.type === DELETECOMPANY){
        return {...state,companies:action.payload}
    }
    if(action.type === FETCHCOMPANIES){
        return {...state,companies:action.payload}
    }
    return state
}

export default reducer