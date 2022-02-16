import React, { useState } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';

function DeleteItemModal(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = (e) => {
        axios.delete(`https://kanbanboard-back.vercel.app/data/item/${e.target.getAttribute('item_id')}}`)
            .then((response) => {
                props.notify()
            })
            .catch((error) => {
                console.log("Error")
            });
        setShow(false);
    }

    return (
        <>
            <div item_id={props.item_id} onClick={handleShow}>Delete</div>

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Delete task</Modal.Title>
                </Modal.Header>

                <Modal.Body>Are you sure you want to delete the task "{props.item_title}"?</Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" item_id={props.item_id} onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
                
            </Modal>
        </>
    );
}

export default DeleteItemModal