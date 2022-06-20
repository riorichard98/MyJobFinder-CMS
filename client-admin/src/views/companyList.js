import { Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchAlldata from "../store/actions/fetchAction";
import { fetchCompany } from "../store/actions/companyAction";
import deleteData from "../store/actions/deleteAction";
// import { useNavigate } from "react-router-dom";
import { url } from "../url";
import buttonClose from '../assets/buttonClose.png'
import addData from "../store/actions/addAction";
import NavBar from './navBar.js';
import swal from 'sweetalert'

export default function Company() {
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const { companies } = useSelector(function (state) {
        return state.companyReducer
    })
    const [adding, setAdding] = useState(false)
    const [companyData, setCompanyData] = useState({})
    useEffect(() => {
        dispatch(fetchAlldata(url + '/companies', fetchCompany))
            .catch((err) => {
                swal(JSON.parse(err.message).message)
            })
    }, [])
    function setCompanyDataFunct(input, key) {
        let obj = companyData
        obj[key] = input
        setCompanyData(obj)
        // console.log(jobData);
    }
    function cancelAdding() {
        setAdding(false)
    }
    function addFunct(e) {
        e.preventDefault()
        dispatch(addData(url + '/companies', companyData, fetchCompany, companies))
            .then(resp => {
                cancelAdding()
            })
            .catch((err) => {
                swal(JSON.parse(err.message).message)
            })
    }
    function deleteButton(id) {
        dispatch(deleteData(url + '/companies', id, fetchCompany, companies))
            .then(() => {
                swal('success deleted')
            })
            .catch((err) => {
                swal(JSON.parse(err.message).message)
            });
    }
    function ButtonOption(id) {
        return <td className="d-flex"><Button onClick={() => deleteButton(id)}>Delete</Button></td>
    }
    function ButtonAdding() {
        return <td className="d-flex"><Button onClick={() => setAdding(true)} >Add Company</Button></td>
    }
    function searchCompany(e) {
        console.log(e.target.value);
        dispatch(fetchAlldata(url + '/companies' + `?search=${e.target.value}`, fetchCompany))
    }
    function formAdd() {
        if (adding) {
            return (
                <div className="position-absolute formAdd p-4 text-start">
                    <Form>
                        <div className="d-flex justify-content-end"><img onClick={cancelAdding} className="imgButton" src={buttonClose}></img></div>
                        <Form.Group className="mb-1" >
                            <Form.Label className="fw-bolder">Company Name</Form.Label>
                            <Form.Control onChange={e => setCompanyDataFunct(e.target.value, 'name')} type="text" placeholder="company name" />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label className="fw-bolder">Company Logo</Form.Label>
                            <Form.Control onChange={e => setCompanyDataFunct(e.target.value, 'companyLogo')} type="text" placeholder="company logo url" />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label className="fw-bolder">Company Location</Form.Label>
                            <Form.Control onChange={e => setCompanyDataFunct(e.target.value, 'location')} type="text" placeholder="company location" />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label className="fw-bolder">Company Email</Form.Label>
                            <Form.Control onChange={e => setCompanyDataFunct(e.target.value, 'email')} type="email" placeholder="company email" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label className="fw-bolder">Description</Form.Label>
                            <div>
                                <textarea onChange={e => setCompanyDataFunct(e.target.value, 'description')} className="h-100 descInput" placeholder="description of company"></textarea>
                            </div>
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button onClick={addFunct} variant="primary" type="submit">
                                Add company
                            </Button>
                        </div>
                    </Form>
                </div>
            )
        }
    }
    function getClass() {
        if (adding) {
            return "disabled"
        } else {
            return "none"
        }
    }
    return (
        <div><NavBar></NavBar>
            <div className="mt-3 p-3 position-relative">
                {
                    formAdd()
                }
                <div className={getClass()}>
                    <div className="d-flex justify-content-start mb-2">
                        <div>
                            {ButtonAdding()}
                        </div>
                        <div className="mt-1 ms-2 w-50">
                            <input onChange={searchCompany} placeholder="search company" className="w-100"></input>
                        </div>
                    </div>
                    <Table className=" border border-5" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Company Name</th>
                                <th>Company Logo</th>
                                <th>Location</th>
                                <th>Email</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                companies.map((e, i) => {
                                    return (
                                        <tr key={e.id}>
                                            <td>{i + 1}</td>
                                            <td>{e.name}</td>
                                            <td><img className="w-50" src={e.companyLogo}></img></td>
                                            <td>{e.location}</td>
                                            <td>{e.email}</td>
                                            <td>{e.description}</td>
                                            {ButtonOption(e.id)}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
