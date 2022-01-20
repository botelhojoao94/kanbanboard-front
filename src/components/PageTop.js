import React from 'react'
import { Navbar, Container, Nav, Button, Form, FormControl } from 'react-bootstrap'
import axios from 'axios'
import logo from '../assets/images/logo.png'

function PageTop(props) {

    const handleCreateList = () => {
        axios.post('https://kanbanboard-back.herokuapp.com/data/list', {
            title: "Title",
        })
            .then((response) => {
                console.log("ok")
            })
            .catch((error) => {
                console.log("Error")
            });
    }

    return (
        <Navbar className="page_top">
            <Container fluid>
                <Navbar.Brand>
                    <img
                        alt="kanban"
                        src={logo}
                        width="130px"
                    />
                </Navbar.Brand>
                <Button onClick={() => { handleCreateList() }} variant="outline-success">+ Create list</Button>
            </Container>
        </Navbar>
    )
}

export default PageTop