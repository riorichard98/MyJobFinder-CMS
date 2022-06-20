import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import testAction from "../store/actions/testAction"

export default function JobDetail(){
    const navigate = useNavigate
    const dispatch = useDispatch()
    const {value,lat} = useSelector(function(state){
        return state.testReducer
    })
    function balik(){
        navigate('/')
    }


    // console.log(value);
    // useEffect(()=>{
    //     function test(){
    //         console.log('testing....');
    //         // console.log(value);
    //         dispatch(testAction(1)) // 
    //     }
    //     const test2 = setInterval(test, 1000);
    // },[])
    useEffect(()=>{
        console.log('useEffect1');
        dispatch({type:'test2',payload:5})
    },[])
    useEffect(()=>{
        console.log('useEffect2');
        dispatch({type:'test2',payload:5})
        console.log('masuk2222',value);
    },[value])

    useEffect(()=>{
        // console.log(value);
        console.log('value berubah',value);
    },[value])
    return(
        <div>
        <button onClick={balik}>balik</button>
        <h1>this is JobDetail</h1>
        </div>
    )
}