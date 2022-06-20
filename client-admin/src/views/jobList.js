import { Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchAlldata from "../store/actions/fetchAction";
import deleteData from "../store/actions/deleteAction";
import { fetchJob, fetchOneJob2 } from "../store/actions/jobAction";
import { useNavigate } from "react-router-dom";
import { url } from "../url";
import '../App.css';
import { fetchCompany } from "../store/actions/companyAction";
import buttonClose from '../assets/buttonClose.png'
import addData from "../store/actions/addAction";
import NavBar from './navBar.js';
import swal from 'sweetalert'
import fetchOneJob from "../store/actions/fetchOneJobAction";
import editJob from "../store/actions/editAction";



export default function Job() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { jobs } = useSelector(function (state) {
        return state.jobReducer
    })
    const { companies } = useSelector(function (state) {
        return state.companyReducer
    })
    const [initialData, setInitialData] = useState(false)
    const [initialSkillsEdit, setInitialSkillsEdit] = useState(false)
    const [initialLevelsEdit, setInitialLevelsEdit] = useState(false)
    const [adding, setAdding] = useState(false)
    const [editing, setEditing] = useState(false)
    const [skillInput, setSkillInput] = useState(1)
    const [skillInputEdit, setSkillInputEdit] = useState(null)
    const [skills, setSkills] = useState([''])
    const [skillsEdit, setSkillsEdit] = useState(null)
    const [levels, setLevels] = useState([''])
    const [levelsEdit, setLevelsEdit] = useState(null)
    const [jobData, setJobData] = useState({})
    useEffect(() => {
        dispatch(fetchAlldata(url + '/jobs', fetchJob))
            .catch((err) => {
                swal(JSON.parse(err.message).message)
            })
        dispatch(fetchAlldata(url + '/companies', fetchCompany))
            .catch((err) => {
                swal(JSON.parse(err.message).message)
            })
    }, [])
    function deleteButton(id) {
        dispatch(deleteData(url + '/jobs', id, fetchJob, jobs))
            .then(() => {
                swal('success deleted')
            })
            .catch((err) => {
                swal(JSON.parse(err.message).message)
            });
    }
    function increaseSkillInput() {
        const newSkillInput = skillInput + 1
        setSkillInput(newSkillInput)
        let newSkills = skills
        newSkills.push('')
        setSkills(newSkills)
        let newLevels = levels
        newLevels.push('')
        setLevels(newLevels)
    }
    function skillState(e, i) {
        let newSkills = skills
        newSkills[i] = e.target.value
        setSkills(newSkills)
        // console.log(skills,'ini skill');
    }
    function levelState(e, i) {
        let newLevels = levels
        newLevels[i] = e.target.value
        setLevels(newLevels)
        // console.log(levels,'ini level');
    }
    function skillStateEdit(e, i) {
        let newSkills = skillsEdit
        newSkills[i] = e.target.value
        setSkillsEdit(newSkills)
        // console.log(skills,'ini skill');
    }
    function levelStateEdit(e, i) {
        let newLevels = levelsEdit
        newLevels[i] = e.target.value
        setLevelsEdit(newLevels)
        // console.log(levels,'ini level');
    }
    function renderSKillInput() {
        let output = []
        for (let i = 0; i < skillInput; i++) {
            output.push(<div className="d-flex mb-1">
                <Form.Group className="w-70" controlId="formBasicEmail">
                    <Form.Control onChange={e => skillState(e, i)} type="text" placeholder="skill" />
                </Form.Group>
                <Form.Group className="ms-3 d-flex" controlId="formBasicEmail">
                    <select onChange={e => levelState(e, i)} className="form-select " aria-label="Default select example">
                        <option className="d-none text-white-50" selected>Level</option>
                        <option value={'intermediate'}>intermediate</option>
                        <option value={'advanced'}>advanced</option>
                    </select>
                    <Button onClick={increaseSkillInput}>+</Button>
                </Form.Group>
            </div>)
        }
        return output
    }
    function ButtonOption(id) {
        return <td className="d-flex"><Button onClick={() => editButton(id)} className="me-1">Edit</Button><Button onClick={() => deleteButton(id)}>Delete</Button>
        </td>
    }
    function increaseSkillInputEdit() {
        const newSkillInput = skillInputEdit + 1
        setSkillInputEdit(newSkillInput)
        let newSkills = skillsEdit
        newSkills.push('')
        setSkillsEdit(newSkills)
        let newLevels = levelsEdit
        newLevels.push('')
        setLevelsEdit(newLevels)
    }
    function renderSKillInputEdit() {
        let output = []
        for (let i = 0; i < skillInputEdit; i++) {
            output.push(<div className="d-flex mb-1">
                <Form.Group className="w-70" controlId="formBasicEmail">
                    <Form.Control onChange={e => skillStateEdit(e, i)} type="text" placeholder="skill" value={initialSkillsEdit[i]} />
                </Form.Group>
                <Form.Group className="ms-3 d-flex" controlId="formBasicEmail">
                    <select value={initialLevelsEdit[i]} onChange={e => levelStateEdit(e, i)} className="form-select " aria-label="Default select example">
                        <option className="d-none text-white-50" selected>Level</option>
                        <option value={'intermediate'}>intermediate</option>
                        <option value={'advanced'}>advanced</option>
                    </select>
                    <Button onClick={increaseSkillInputEdit}>+</Button>
                </Form.Group>
            </div>)
        }
        return output
    }
    function deleteSkillButtonEdit() {
        if (skillInputEdit > 1) {
            return <Button onClick={deleteOneSkillInputEdit}> Delete Skill</Button>
        }
    }
    function deleteOneSkillInputEdit() {
        let newSkillInput = skillInputEdit - 1
        let newSkills = skillsEdit
        let newLevels = levelsEdit
        newSkills.pop()
        newLevels.pop()
        setSkillInputEdit(newSkillInput)
        setLevelsEdit(newLevels)
        setSkillsEdit(newSkills)
    }
    function ButtonAdding() {
        // return <td className="d-flex"><Button onClick={() => { navigate('/addJob') }}>Add Job</Button></td>
        return <td className="d-flex"><Button onClick={() => setAdding(true)} >Add Job</Button></td>
    }
    function searchJob(e) {
        // console.log(e.target.value);
        dispatch(fetchAlldata(url + '/jobs' + `?search=${e.target.value}`, fetchJob))
    }
    function cancelAdding() {
        setAdding(false)
        setSkillInput(1)
        setLevels([''])
        setSkills([''])
        setEditing(false)
    }
    function addFunct(e) {
        e.preventDefault()
        let inputAdd = jobData
        let skillsInput = skills.join(',')
        let levelsInput = levels.join(',')
        inputAdd.skills = skillsInput
        inputAdd.levels = levelsInput
        dispatch(addData(url + '/jobs', inputAdd, fetchJob, jobs))
            .then(resp => {
                cancelAdding()
            })
            .catch((err) => {
                swal(JSON.parse(err.message).message)
            })
    }
    function setJobDataFunct(input, key) {
        let obj = jobData
        obj[key] = input
        setJobData(obj)
        // console.log(jobData);
    }
    function deleteSkillButton() {
        if (skillInput > 1) {
            return <Button onClick={deleteOneSkillInput}> Delete Skill</Button>
        }
    }
    function deleteOneSkillInput() {
        let newSkillInput = skillInput - 1
        let newSkills = skills
        let newLevels = levels
        newSkills.pop()
        newLevels.pop()
        setSkillInput(newSkillInput)
        setLevels(newLevels)
        setSkills(newSkills)
    }
    function formAdd() {
        if (adding) {
            return (
                <div className="position-absolute formAdd p-4 text-start">
                    <Form>
                        <div className="d-flex justify-content-end"><img onClick={cancelAdding} className="imgButton" src={buttonClose}></img></div>
                        <Form.Group className="mb-1" controlId="formBasicEmail">
                            <Form.Label className="fw-bolder">Job Title</Form.Label>
                            <Form.Control onChange={e => setJobDataFunct(e.target.value, 'title')} type="text" placeholder="job title" />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicPassword">
                            <Form.Label className="fw-bolder">Description</Form.Label>
                            <div>
                                <textarea onChange={e => setJobDataFunct(e.target.value, 'description')} className="h-100 descInput" placeholder="description of job"></textarea>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="fw-bolder">Company and Job time</Form.Label>
                            <div className="d-flex ">
                                <div className="me-3">
                                    <select onChange={e => setJobDataFunct(e.target.value, 'companyId')} className="form-select" aria-label="Default select example">
                                        <option className="d-none" selected>Company</option>
                                        {companies.map(e => {
                                            return <option value={e.id}>{e.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <select onChange={e => setJobDataFunct(e.target.value, 'jobType')} className="form-select " aria-label="Default select example">
                                        <option className="d-none" selected>Type</option>
                                        <option value={'full time'}>full time</option>
                                        <option value={'part time'}>part time</option>
                                    </select>
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="fw-bolder">Skills required</Form.Label>
                            {renderSKillInput()}
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button className="me-2" onClick={addFunct} variant="primary" type="submit">
                                Add job
                            </Button>
                            {deleteSkillButton()}
                        </div>
                    </Form>
                </div>
            )
        }
    }
    function formEdit() {
        if (editing) {
            return (
                <div className="position-absolute formAdd p-4 text-start">
                    <Form>
                        <div className="d-flex justify-content-end"><img onClick={cancelAdding} className="imgButton" src={buttonClose}></img></div>
                        <Form.Group className="mb-1" controlId="formBasicEmail">
                            <Form.Label className="fw-bolder">Job Title</Form.Label>
                            <Form.Control onChange={e => setJobDataFunct(e.target.value, 'title')} type="text" placeholder="job title" value={initialData.title} />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicPassword">
                            <Form.Label className="fw-bolder">Description</Form.Label>
                            <div>
                                <textarea onChange={e => setJobDataFunct(e.target.value, 'description')} className="h-100 descInput" value={initialData.description} placeholder="description of job"></textarea>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="fw-bolder">Company and Job time</Form.Label>
                            <div className="d-flex ">
                                <div className="me-3">
                                    <select value={initialData.companyId} onChange={e => setJobDataFunct(e.target.value, 'companyId')} className="form-select" aria-label="Default select example">
                                        <option className="d-none" selected>Company</option>
                                        {companies.map(e => {
                                            return <option value={e.id}>{e.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <select value={initialData.jobType} onChange={e => setJobDataFunct(e.target.value, 'jobType')} className="form-select " aria-label="Default select example">
                                        <option className="d-none" selected>Type</option>
                                        <option value={'full time'}>full time</option>
                                        <option value={'part time'}>part time</option>
                                    </select>
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="fw-bolder">Skills required</Form.Label>
                            {renderSKillInputEdit()}
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button className="me-2" onClick={submitEdit} variant="primary" type="submit">
                                Edit Job
                            </Button>
                            {deleteSkillButtonEdit()}
                        </div>
                    </Form>
                </div>
            )
        }
    }
    function editButton(id) {
        dispatch(fetchOneJob(url + `/jobs/${id}`))
            .then((resp) => {
                setInitialData(resp)
                let editData = resp
                editData.levels = resp.Skills.map(e => e.level).join(',')
                editData.skills = resp.Skills.map(e => e.name).join(',')
                setJobData(editData)
                setSkillInputEdit(resp.Skills.length)
                setSkillsEdit(resp.Skills.map(e => e.name))
                setLevelsEdit(resp.Skills.map(e => e.level))
                setInitialSkillsEdit(resp.Skills.map(e => e.name))
                setInitialLevelsEdit(resp.Skills.map(e => e.level))
                setEditing(true)
                setInitialData(false)
                setInitialSkillsEdit(false)
                setInitialLevelsEdit(false)
            })
            .catch((err) => {
                swal(JSON.parse(err.message).message)
                console.log(err);
            })

    }
    function getClass() {
        if (adding || editing) {
            return "disabled"
        } else {
            return "none"
        }
    }
    function submitEdit(e) {
        e.preventDefault()
        let inputEdit = jobData
        let skillsInput = skillsEdit.join(',')
        let levelsInput = levelsEdit.join(',')
        inputEdit.skills = skillsInput
        inputEdit.levels = levelsInput
        dispatch(editJob(inputEdit, fetchJob, jobs, inputEdit.id))
            .then(resp => {
                swal('Success editing')
                cancelAdding()
            })
            .catch((err) => {
                swal(JSON.parse(err.message).message)
            })
    }
    return (
        <div><NavBar></NavBar>
            <div className="mt-3 p-3 position-relative">
                {
                    formAdd()
                }
                {
                    formEdit()
                }
                <div className={getClass()}>
                    <div className="d-flex justify-content-start mb-2">
                        <div>
                            {ButtonAdding()}
                        </div>
                        <div className="mt-1 ms-2 w-50">
                            <input onChange={searchJob} placeholder="search job" className="w-100"></input>
                        </div>
                    </div>
                    <Table className=" border border-5" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Title</th>
                                <th>Company</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Skills</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobs.map((e, i) => {
                                    return (
                                        <tr key={i + 1}>
                                            <td>{i + 1}</td>
                                            <td>{e.title}</td>
                                            <td>{e.Company.name}</td>
                                            <td>{e.jobType}</td>
                                            <td className="desc">{e.description}</td>
                                            <td>
                                                <ul className="text-start">
                                                    {
                                                        e.Skills.map(e => {
                                                            return <li className="desc">{e.name},{e.level}</li>
                                                        })
                                                    }
                                                </ul>
                                            </td>
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