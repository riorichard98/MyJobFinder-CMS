import { ADDSKILL, DELETESKILL, FETCHSKILLS } from "../actions/actionType";;

const initialState = {
    skills:[],
    skill:null
}

const reducer = (state=initialState,action) =>{
    if(action.type === ADDSKILL){
        return {...state,skills:action.payload}
    }
    if(action.type === DELETESKILL){
        return {...state,skills:action.payload}
    }
    if(action.type === FETCHSKILLS){
        return {...state,skills:action.payload}
    }
    return state
}

export default reducer