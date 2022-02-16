import React, { useState } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'

function DeleteListModal(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = (e) => {
        axios.delete(`https://kanbanboard-back.vercel.app/data/item/fromlist/${e.target.getAttribute('list_id')}`)
            .then((response) => {
                axios.delete(`https://kanbanboard-back.vercel.app/data/list/${e.target.getAttribute('list_id')}`)
                    .then((response) => {
                        props.notify()
                    })
                    .catch((error) => {
                        console.log("Error")
                    });
            })
            .catch((error) => {
                console.log("Error")
            });
        setShow(false);
    }

    return (
        <>
            <div list_id={props.list_id} onClick={handleShow}>Delete</div>

            <Modal show={show} onHide={handleClose}>
                
                <Modal.Header closeButton>
                    <Modal.Title>Delete task</Modal.Title>
                </Modal.Header>

                <Modal.Body>Are you sure you want to delete the list "{props.list_title}"? All the tasks will be deleted as well!</Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" list_id={props.list_id} onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
}

export default DeleteListModal