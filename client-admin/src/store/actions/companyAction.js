import { ADDCOMPANY, DELETECOMPANY, FETCHCOMPANIES } from "./actionType";

export const fetchCompany = (payload) =>{
    return({type:FETCHCOMPANIES,payload})
}

export const addCompany = (payload) =>{
    return({type:ADDCOMPANY,payload})
}

export const deleteCompany = (payload) =>{
    return({type:DELETECOMPANY,payload})
}