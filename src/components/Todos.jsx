import React, { useEffect, useState } from 'react'

const Todos = () => {

    const [todos, setTodos] = useState([]);
    const [newtodos, setNewTodos] = useState("");


    const saveInfo = () => {

        fetch("http://localhost:8181/todos", {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                "value": newtodos,
                "isComplete": false
            })
        })
            .then((m) => m.json())
            .then((l) => {
                setTodos([...todos, l]);
                setNewTodos("");
                
            });
    }


    useEffect(() => {
        fetch("http://localhost:8181/todos")
            .then((m) => m.json())
            .then((l) => {
                setTodos(l);
                console.log(l)
            });
    }, []);

    return (
        <div>
            Todos
            <div>
                <div>
                    <input 
                    type="text" value={newtodos} onChange ={({target}) => setNewTodos(target.value)} />
                    
                    <button onClick={saveInfo}>+</button>
                </div>
                {todos.map((todo) => (
                    <div key={(todo.id)}>{todo.value}</div>
                ))}
            </div>
        </div>
    )
}

export default Todos
