import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function EditTodo() {
const { id } = useParams()
const navigate = useNavigate()
const [todo, setTodo] = useState({
    title: '',
    description: '',
    date: '',
    time: ''
})

useEffect(() => {
    fetchTodo()
}, [id])

const fetchTodo = async () => {
    const response = await fetch(`https://tutam-sbd-9-backend.vercel.app/${id}`)
    const data = await response.json()
    const dateStr = new Date(data.date).toISOString().split('T')[0]
    setTodo({ ...data, date: dateStr })
}

const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`https://tutam-sbd-9-backend.vercel.app/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    })
    navigate('/')
}

return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>
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
            Update Todo
        </button>
    </form>
    )
}

export default EditTodo
