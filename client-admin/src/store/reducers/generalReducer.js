import { FETCHERROR } from "../actions/actionType";

const initialState = {
    error:null
}

const reducer = (state=initialState,action) =>{
    if(action.type === FETCHERROR){
        return {...state,error:action.payload}
    }
    return state
}


export default reducer