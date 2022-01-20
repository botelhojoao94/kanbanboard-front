import React, { useState, useEffect } from 'react'
import List from './List'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Board() {

    const [items, setItems] = useState([])
    const [lists, setLists] = useState([])

    const notify = {
        deletedList: function () {
            toast.success("List successfully deleted!", { autoClose: 3000, hideProgressBar: true })
        },
        deletedItem: function () {
            toast.success("Task successfully deleted", { autoClose: 3000, hideProgressBar: true })
        }
    }

    useEffect(() => {
        axios.get('https://kanbanboard-back.herokuapp.com/data/items')
            .then((response) => {
                setItems(response.data.dados);
            })
            .catch((error) => {
                console.log("Error")
            });
    }, [items]);

    useEffect(() => {
        axios.get('https://kanbanboard-back.herokuapp.com/data/lists')
            .then((response) => {
                setLists(response.data.dados);
            })
            .catch((error) => {
                console.log("Error")
            });
    }, [lists]);

    return (
        <div className="board d-flex flex-row overflow-auto align-items-center">
                {lists.map((list, key) => {
                    return (
                        <List key={key} list={list} lists={lists} items={items} notify={notify} />
                    )
                })}
            <ToastContainer />
        </div>
    )
}

export default Board