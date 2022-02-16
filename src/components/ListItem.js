import React from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import { EditText, EditTextarea } from 'react-edit-text';
import { CirclePicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import 'react-edit-text/dist/index.css';
import DeleteItemModal from './DeleteItemModal'


function ListItem(props) {

    const colors = ['#FF7160', '#FFB31D', '#FFEE21', '#26F954', '#25AAFF', '#EBECF0']

    const handleEditItemTitle = (e) => {
        axios.put('https://kanbanboard-back.vercel.app/data/item', {
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

    const handleEditItemDescription = (e) => {
        axios.put('https://kanbanboard-back.vercel.app/data/item', {
            id: e.name,
            description: e.value,
        })
            .then((response) => {
                console.log("Done")
            })
            .catch((error) => {
                console.log("Error")
            });
    }

    const handleEditColor = (e, id) => {
        axios.put('https://kanbanboard-back.vercel.app/data/item', {
            id: id,
            color: e.hex,
        })
            .then((response) => {
                console.log("Done")
            })
            .catch((error) => {
                console.log("Error")
            });
    }

    const handleEditItemList = (e) => {
        axios.put('https://kanbanboard-back.vercel.app/data/item', {
            id: parseInt(e.target.getAttribute('item_id')),
            list_id: parseInt(e.target.getAttribute('list_id'))
        })
            .then((response) => {
                console.log("Done")
            })
            .catch((error) => {
                console.log("Error")
            });

    }

    return (
        <>
            <Card className="list-item" id={props.item.id} style={{ border: `3px solid ${props.item.color}` }}>
                <Card.Body>

                    <Card.Title className="d-flex">
                        <EditText name={`${props.item.id}`} defaultValue={props.item.title} onSave={(e) => { handleEditItemTitle(e) }} />
                        <Dropdown>
                            <Dropdown.Toggle variant="none" bsPrefix='none' id="dropdown-basic">
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Header>Move to list</Dropdown.Header>
                                {props.lists.map((list, key) => {
                                    if (list.id != props.item.list_id)
                                        return (
                                            <Dropdown.Item key={key} onClick={(e) => { handleEditItemList(e) }} item_id={`${props.item.id}`} list_id={`${list.id}`}>
                                                {list.title}
                                            </Dropdown.Item>
                                        )
                                    else
                                        return null
                                })}
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    <DeleteItemModal item_id={props.item.id} item_title={props.item.title} notify={props.notify.deletedItem} />
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    <CirclePicker onChange={(e) => { handleEditColor(e, props.item.id) }} className="change_color" colors={colors} triangle={"hide"} />
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Card.Title>

                    <EditTextarea rows={1} name={`${props.item.id}`} defaultValue={props.item.description} onSave={(e) => { handleEditItemDescription(e) }} />

                </Card.Body>
            </Card>
        </>
    )
}

export default ListItem