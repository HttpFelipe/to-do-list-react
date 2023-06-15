import React, { useState, useEffect } from "react";
import './css/ToDoList.css';

function TodoList() {

    const listStorage = localStorage.getItem('list');

    // Estado para armazenar a lista de itens
    const [list, setlist] = useState(listStorage ? JSON.parse(listStorage) : []);
    // Estado para armazenar o valor do novo item
    const [newItem, setNewItem] = useState("");

    useEffect(() => {
        // Atualizar o localStorage quando a lista é modificada
        localStorage.setItem('list', JSON.stringify(list));
    }, [list])

    function addItem(form) {
        form.preventDefault();
        if (!newItem) {
          //Se o input for vazio, não realizar nenhuma ação
            return;
        }
        // Adicionar um novo item à lista
        setlist([...list, { text: newItem, isMarked: false }]);
        // Limpar o valor do novo item
        setNewItem("");
        document.getElementById('task-input').focus();
    }

    function markItem(index) {
        const listAux = [...list];
        // Inverter a propriedade isMarked do item
        listAux[index].isMarked = !listAux[index].isMarked;
        setlist(listAux);
    }

    function deleteItem(index) {
        const listAux = [...list];
        // Remover o item da lista
        listAux.splice(index, 1);
        setlist(listAux);
    }

    return (
        <div>
            <h1>To-Do List</h1>
            <form onSubmit={addItem}>
                <input
                    id="task-input"
                    type="text"
                    value={newItem}
                    onChange={(e) => { setNewItem(e.target.value) }}
                    placeholder="Digite uma tarefa"
                />
                <button className="add" type="submit">Add</button>
            </form>
            <div className="taskList">
                <div style={{ textAlign: 'center' }}>
                    {
                        list.length >= 1 &&
                        list.map((item, index) => (
                            <div
                                key={index}
                                className={item.isMarked ? "markedItem" : "item"}
                            >
                                <span onClick={() => { markItem(index) }}>{item.text}</span>
                                <button onClick={() => { deleteItem(index) }} className="delete">Remover</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TodoList;
