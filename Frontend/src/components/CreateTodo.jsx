import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateTodo() {
const navigate = useNavigate()
const [todo, setTodo] = useState({
    title: '',
    description: '',
    date: '',
    time: ''
})

const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:5000/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    })
    navigate('/')
}

return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Create New Todo</h2>
        <input
            type="text"
            placeholder="Title"
            className="w-full mb-3 p-2 border rounded"
            value={todo.title}
            onChange={e => setTodo({...todo, title: e.target.value})}
        />
    <textarea
        placeholder="Description"
        className="w-full mb-3 p-2 border rounded"
        value={todo.description}
        onChange={e => setTodo({...todo, description: e.target.value})}
    />
    <input
        type="date"
        className="w-full mb-3 p-2 border rounded"
        value={todo.date}
        onChange={e => setTodo({...todo, date: e.target.value})}
    />
    <input
        type="time"
        className="w-full mb-3 p-2 border rounded"
        value={todo.time}
        onChange={e => setTodo({...todo, time: e.target.value})}
    />
    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Create Todo
    </button>
    </form>
    )
}

export default CreateTodo
