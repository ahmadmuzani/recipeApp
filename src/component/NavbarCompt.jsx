import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../assets/css/navbar.css'
import { useNavigate } from 'react-router-dom';

function NavbarCompt() {
    const navigate = useNavigate()
    return (
        <>
            <Navbar collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand className='title-navbar' onClick={() => navigate('/')} >Secret Recipe Mr.Crabs</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className=' justify-content-end flex-grow-1'>
                            <Nav.Link className='' href="#">Meal Plan</Nav.Link>
                            <Nav.Link className='' href="#memes">Healthy</Nav.Link>
                            <Nav.Link className='' href="#memes">Dished</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarCompt
