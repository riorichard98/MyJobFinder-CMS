import { url } from "../../url"


export default function login(email, password) {
    return () => {
        return fetch(url + '/users/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
    }
}