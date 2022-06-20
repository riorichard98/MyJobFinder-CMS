import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function useFetch(url) {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        fetch(url)
        .then(resp=>{
            if(!resp.ok){
                throw new Error('Error')
            }
            return resp.json()
        })
        .then(resp=>{
            setData(resp)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    function deleteData(id,path){
        fetch(url+'/'+id,{method:'DELETE'})
        .then(()=>{
            navigate(path)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return {data,deleteData}
}

