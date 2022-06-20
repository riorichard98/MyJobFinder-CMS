import { FETCHJOBS,FETCHONEJOB } from "./actionType";

export const fetchJob = (payload) =>{
    return({type:FETCHJOBS,payload})
}

export const fetchOneJob = (payload) =>{
    return({type:FETCHONEJOB,payload})
}
