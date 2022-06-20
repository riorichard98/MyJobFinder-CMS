import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap"
import { useDispatch } from "react-redux";
import '../App.css';
import login from "../store/actions/loginAction";
import swal from 'sweetalert'
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginReset = () => { 
        document.getElementById("login-form").reset();
      }
    const submitLogin = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
            .then(function (response) {
                if (!response.ok) {
                    return response.text()
                    .then(text => { throw new Error(text) })
                }
                return response.json();
            })
            .then(resp => {
                localStorage.setItem('token',resp.token)
                swal('you are logged in')
                navigate('/')
                loginReset()
            })
            .catch(err => {
                swal(JSON.parse(err.message).message)
                loginReset()
                
            })

    }

    return (
        <Container className="p-5 w-50 mt-5 d-flex justify-content-center">
            <Form id="login-form" className="w-50 p-4 rounded bg-grey">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={submitLogin} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}