import { url } from "../../url"


export default function register(data) {
    return () => {
        return fetch(url + '/users/register', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            }
        })
    }
}