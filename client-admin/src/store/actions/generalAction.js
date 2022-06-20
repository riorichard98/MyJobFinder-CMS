import { FETCHERROR } from "./actionType"

export default function fetchError(payload){
    return({type:FETCHERROR,payload})
}