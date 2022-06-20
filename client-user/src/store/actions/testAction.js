export default function testAction(payload){
    return(dispatch,getState)=>{
        dispatch({type:'test',payload})
    }
}