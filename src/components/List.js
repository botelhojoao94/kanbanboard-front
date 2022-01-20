import React from 'react'
import { Card, Dropdown, Col } from 'react-bootstrap'
import axios from 'axios'
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import ListItem from './ListItem'
import DeleteListModal from './DeleteListModal'


function List(props) {

    const handleCreateItem = (e) => {
        axios.post('https://kanbanboard-back.herokuapp.com/data/item', {
            title: "Title",
            description: "Description",
            list_id: e.target.getAttribute("list-id"),
            color: '#EBECF0'
        })
            .then((response) => {
                console.log("Done")
            })
            .catch((error) => {
                console.log("Error")
            });
    }

    const handleEditListTitle = (e) => {
        axios.put('https://kanbanboard-back.herokuapp.com/data/list', {
            id: e.name,
            title: e.value,
        })
            .then((response) => {
                console.log("Done")
            })
            .catch((error) => {
                console.log("Error")
            });
    }

    return (
        <Col className="col_list">
            <Card className="list" id={props.list.id}>
                <Card.Body className="overflow-auto">

                    <Card.Title className="d-flex">
                        <EditText name={`${props.list.id}`} defaultValue={props.list.title} onSave={(e) => { handleEditListTitle(e) }} />
                        <Dropdown>
                            <Dropdown.Toggle key="end" variant="none" bsPrefix='none' id="dropdown-basic">
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <DeleteListModal list_id={props.list.id} list_title={props.list.title} notify={props.notify.deletedList} />
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Card.Title>

                    {props.items.map((item, key) => {
                        if (props.list.id === item.list_id)
                            return (
                                <ListItem key={key} lists={props.lists} item={item} notify={props.notify} />
                            )
                        return null
                    })}

                    <Card.Footer className="text-center">
                        <div className="btn text-muted" list-id={props.list.id} onClick={(e) => { handleCreateItem(e) }}>
                            + Create new task
                        </div>
                    </Card.Footer>

                </Card.Body>
            </Card>
        </Col>
    )
}

export default List