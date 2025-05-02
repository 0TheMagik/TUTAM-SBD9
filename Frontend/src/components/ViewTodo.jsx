import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ViewTodo() {
const { id } = useParams()
const navigate = useNavigate()
const [todo, setTodo] = useState(null)

useEffect(() => {
    const fetchTodo = async () => {
        const response = await fetch(`https://tutam-sbd-9-backend.vercel.app/${id}`)
        const data = await response.json()
        setTodo(data)
    }
    fetchTodo()
}, [id])

if (!todo) return <div>Loading...</div>

return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-3xl font-bold mb-4 text-black">{todo.title}</h2>
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Description:</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{todo.description}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-6">
            <span>Date: {new Date(todo.date).toLocaleDateString()}</span>
            <span>Time: {todo.time}</span>
        </div>
    <div className="flex gap-4">
        <button
            onClick={() => navigate(`/edit/${id}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
        Edit Todo
        </button>
        <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
        Back to List
        </button>
    </div>
    </div>
    )
}

export default ViewTodo
