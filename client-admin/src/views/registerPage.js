import NavBar from './navBar.js';
import { Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import '../App.css';
import register from "../store/actions/registerAction";
import swal from 'sweetalert'

export default function RegisterPage() {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({})
    function setUserDataFunct(input, key) {
        let obj = userData
        obj[key] = input
        setUserData(obj)
    }
    const registerReset = () => { 
        document.getElementById("login-form").reset();
        setUserData({})
      }
    function submitRegister(e) {
        e.preventDefault()
        dispatch(register(userData))
            .then(function (response) {
                if (!response.ok) {
                    return response.text()
                        .then(text => { throw new Error(text) })
                }
                return response.json();
            })
            .then(resp => {
                swal(resp.message)
                registerReset()
            })
            .catch(err => {
                swal(JSON.parse(err.message).message)
            })
    }
    return (
        <div><NavBar></NavBar>
            <Container className="w-50 mt-2">
                <Form id="login-form" className="p-3 rounded text-start bg-grey fw-bold">
                    <Form.Group className="mb-1" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={e => setUserDataFunct(e.target.value, 'username')} type="text" placeholder="username" />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={e => setUserDataFunct(e.target.value, 'email')} type="email" placeholder="email" />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={e => setUserDataFunct(e.target.value, 'password')} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="formBasicEmail">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control onChange={e => setUserDataFunct(e.target.value, 'phoneNumber')} type="text" placeholder="phone number" />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="formBasicEmail">
                        <Form.Label>Address</Form.Label>
                        <Form.Control onChange={e => setUserDataFunct(e.target.value, 'address')} type="text" placeholder="address" />
                    </Form.Group>
                    <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                        <Form.Label>Role</Form.Label>
                        <Form.Select onChange={e => setUserDataFunct(e.target.value, 'role')} >
                            <option className="d-none text-white-50" selected>Select Role</option>
                            <option value={'admin'}>Admin</option>
                        </Form.Select>
                    </Form.Group>
                    <Button onClick={submitRegister} variant="primary" type="submit">
                        Register new admin
                    </Button>
                </Form>
            </Container>
        </div>
    )
}