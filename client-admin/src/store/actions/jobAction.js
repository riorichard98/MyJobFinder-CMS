import { ADDJOB, DELETEJOB, FETCHJOBS, UPDATEJOB,FETCHONEJOB } from "./actionType";

export const fetchJob = (payload) =>{
    return({type:FETCHJOBS,payload})
}

export const addJob = (payload) =>{
    return({type:ADDJOB,payload})
}

export const updateJob = (payload) =>{
    return({type:UPDATEJOB,payload})
}

export const deleteJob = (payload) =>{
    return({type:DELETEJOB,payload})
}

export const fetchOneJob2 = (payload) =>{
    return({type:FETCHONEJOB,payload})
}
