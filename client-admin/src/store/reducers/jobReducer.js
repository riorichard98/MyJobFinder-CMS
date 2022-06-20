import { ADDJOB, DELETEJOB, FETCHJOBS, UPDATEJOB,FETCHONEJOB } from "../actions/actionType"

const initialState = {
    jobs:[],
    job:null
}

const reducer = (state=initialState,action) =>{
    if(action.type === ADDJOB){
        return {...state,jobs:action.payload}
    }
    if(action.type === DELETEJOB){
        return {...state,jobs:action.payload}
    }
    if(action.type === FETCHJOBS){
        return {...state,jobs:action.payload}
    }
    if(action.type === UPDATEJOB){
        return {...state,jobs:action.payload}
    }
    if(action.type === FETCHONEJOB){
        return {...state,job:action.payload}
    }
    return state
}

export default reducer