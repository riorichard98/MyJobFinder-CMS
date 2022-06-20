import { fetchOneJob } from "./jobAction"


export default function gettingOneJob(id) {
    return (dispatch, getState) => {
        return fetch(`http://localhost:3000/jobs/${id}`, { headers: { token: localStorage.getItem('token') } })
            .then((resp) => {
                if (!resp.ok) {
                    return resp.text()
                        .then(text => { throw new Error(text) })
                }
                return resp.json();
            })
            .then((resp) => {
                dispatch(fetchOneJob(resp))
            })

    }
}