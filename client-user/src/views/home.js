import { Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchAlldata from "../store/actions/fetchAction";
import swal from "sweetalert"
import '../App.css'
export default function Home() {
    const dispatch = useDispatch()
    const { jobs } = useSelector(function (state) {
        return state.jobReducer
    })
    useEffect(() => {
        dispatch(fetchAlldata())
        .catch((err) => {
            swal(JSON.parse(err.message).message)
        })
    }, [])
    return (
        <div className="row p-3">
            {
                jobs.map(e => {
                    return (
                        <div key={e.id} className="card col-2 p-3 mb-1 me-1">
                            <img src={e.Company.companyLogo} className="card-img-top mb-2 w-70" ></img>
                            <a className="btn btn-primary">Detail</a>
                            <div className="card-body">
                                <h5 className="card-title">{e.title}</h5>
                                <p className="card-text">{e.description}</p>
                                
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}