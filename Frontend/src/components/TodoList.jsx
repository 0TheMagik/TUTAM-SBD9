import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function TodoList() {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        try {
            setLoading(true)
            const response = await fetch('https://tutam-sbd-9-backend.vercel.app/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            setTodos(data)
        } catch (err) {
            console.error('Fetch error:', err)
            setError('Failed to load todos')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://tutam-sbd-9-backend.vercel.app/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            fetchTodos()
        } catch (err) {
            console.error('Delete error:', err)
            setError('Failed to delete todo')
        }
    }

    if (loading) return <div className="text-center">Loading...</div>
    if (error) return <div className="text-center text-red-500">{error}</div>

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todos.map(todo => (
            <div key={todo._id} 
                    className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                    onClick={() => navigate(`/view/${todo._id}`)}>
                <h3 className="text-xl font-bold mb-4 text-black">{todo.title}</h3>
            <div className="flex justify-between text-sm text-gray-500">
                <span>{new Date(todo.date).toLocaleDateString()}</span>
                <span>{todo.time}</span>
            </div>
            <button 
                onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(todo._id)
                }}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Delete
            </button>
            </div>
            ))}
        </div>
    )
}

export default TodoList
