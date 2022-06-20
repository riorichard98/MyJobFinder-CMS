import { Navbar,Container,Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert'

export default function NavBar() {
    const navigate = useNavigate()
    const logout = (e) =>{
        e.preventDefault()
        localStorage.clear()
        swal('you are logged out')
        navigate('/login')
    }
    return (
        <Navbar className="ms-3" bg="light" expand="lg">
                <Navbar.Brand href="#home">Admin Side</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link active" to="/" >Jobs</Link>
                        <Link className="nav-link active" to="/companies">Companies</Link>
                        <Link className="nav-link active" to="/register">Register</Link>
                        <a onClick={logout} className="nav-link active" href="" to="/login">Logout</a>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}