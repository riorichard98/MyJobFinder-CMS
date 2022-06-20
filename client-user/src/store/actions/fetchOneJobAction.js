import { fetchOneJob2} from "./jobAction";
export default function fetchOneJob(url) {
    return (dispatch, getState) => {
        return fetch(url , { headers: { token: localStorage.getItem('token') } })
            .then((resp) => {
                if (!resp.ok) {
                    return resp.text()
                        .then(text => { throw new Error(text) })
                }
                return resp.json();
            })
            // .then((resp)=>{
            //     dispatch(fetchOneJob2(resp))
            //     return 'ok'
            // })
           
    }
}