const initialState = {
    value:1,
    lat:null,
    lng:null
}


const reducer = (state=initialState,action) =>{
    if(action.type === 'test'){
        const newValue = state.value + action.payload
        return {value:newValue}
    }
    if(action.type === 'test2'){
        // const newValue = state.value + action.payload
        return {value:action.payload}
    }
    return state
}

export default reducer